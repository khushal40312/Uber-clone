const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.post('/register',[
    body("email").isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 charater long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 Charater long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Colour must be 3 Charater long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be 3 Charater long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','moto','auto']).withMessage('Invalid Vehicle type'),

],captainController.registerCaptain)

router.post('/login',[
    body("email").isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 Charater long'),
   
],captainController.loginCaptian)


router.get('/profile',authMiddleware.authCaptian,captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptian, captainController.logoutCaptain)


module.exports = router