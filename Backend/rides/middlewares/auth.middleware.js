
const {getMiddleware} = require('../services/rpc/getMiddleware');
const {getCaptainMiddleware} = require('../services/rpc/getMiddleware');



module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || authHeader?.split(' ')[1]
    console.log(token)
    try {
        if (!token) {
            return res.status(401).json({ message: 'unauthorized' });
        }
        const user = await getMiddleware(token)
        // console.log("tok",user)
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Unauthorized' });

    }
    

}
module.exports.authCaptian = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || authHeader?.split(' ')[1]
    try {

        if (!token) {
            return res.status(401).json({ message: 'unauthorized' });
        }
        const captain = await getCaptainMiddleware(token)

        req.captain = captain;
        next()
    }
    catch (error) {
        return res.status(401).json({ message: 'unauthorized' });

    }

}