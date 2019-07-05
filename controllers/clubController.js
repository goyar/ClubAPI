const router = require('express').Router();
const dataService = require('../services/dataService');
const passport = require('passport');

// checking auth middleware
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};
// Adding the endpoints
router.get('/players', authCheck, (req, res)=>{
    console.log(req.user);
    //res.json(req);
    dataService.queries.getAllDocuments('players')
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.end();
    });
});

router.get('/guardians', (req, res)=>{
    dataService.queries.getAllDocuments('guardians')
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.end();
    });
})

router.get('/coaches', (req, res)=>{
    dataService.queries.getAllDocuments('coaches')
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.end();
    });
})

router.get('/teams', passport.authenticate('google'), (req, res)=>{
    dataService.queries.getAllDocuments('teams')
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.end();
    });
})

router.get('/categories', (req, res)=>{
    dataService.queries.getAllDocuments('categories')
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.end();
    });
})

module.exports = router;