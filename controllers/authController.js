const router = require('express').Router();
const passport = require('passport');
const path = require('path');

// Login landing page
router.get('/login',
    (req, res)=>{
        res.sendFile(path.join(process.DIRNAME,`login.html`));
    }
);

// Logout route
router.get('/logout',
    (req, res)=>{
        res.send(`logging out!`);
    }
);

// Google Auth Strategy
router.get('/google', 
    passport.authenticate('google',{
        scope: ['profile']
    })
);

// callback google route
router.get('/google/redirect', passport.authenticate('google'),
    (req, res)=>{
        console.log(req.user);
        res.redirect('/');
    }
);

module.exports = router;