const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyuijz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request")
    }else{
        next()
    };
};


const userAuth = (req, res, next) => {
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized Request")
    }else{
        next()
    };
};

module.exports = { adminAuth, userAuth};