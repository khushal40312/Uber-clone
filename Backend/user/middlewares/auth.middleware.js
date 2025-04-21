const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require("../models/blacklistToken.model");



module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || authHeader?.split(' ')[1]
console.log(token)
    
    if (!token) {
        return res.status(401).json({ message: 'unauthorized' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token })
console.log("annnnn",isBlacklisted)
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' })

    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decode",decoded)
        const user = await userModel.findById(decoded._id)
        console.log("userssss",user)

        req.user = user;
        next()
    } catch (error) {
        console.log("this",error)
        return res.status(401).json({ message: 'Unauthorized' });

    }

}
