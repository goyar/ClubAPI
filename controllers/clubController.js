const router = require('express').Router();
const dataService = require('../services/dataService');


// Adding the endpoints
router.get('/players', (req, res)=>{
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

router.get('/teams', (req, res)=>{
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