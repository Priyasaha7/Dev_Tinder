const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to User model
            required: true,
        },

        toUserId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User", 
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: "Status is not valid",
            },
        },
    },
    {
        timestamps: true,
    }
);

// Compound index to quickly find connection requests between two users
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1} );


//4.Prevent users from sending connection requests to themselves
connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error(" You cannot send connection request to yourself");
    };

    // next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;