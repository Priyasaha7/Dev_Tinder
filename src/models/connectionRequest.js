const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
        },

        toUserId: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: {
                values: ["interested", "ignored", "accepted", "rejected"],
                message: "Status is not valid"
            },
        },
    },
    {
        timestamps: true,
    }
);

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

