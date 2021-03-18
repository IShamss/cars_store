const express = require('express');
const router = express.Router({mergeParams:true});

/* GET reviews /posts/:id/reviews */
router.get('/', function(req, res, next) {
    res.send('/reviews');
});

//POST a new revies
router.post('/', function(req, res, next) {
    res.send('POSt new review');
});

//edit a review
router.get('/:review_id/edit', function(req, res, next) {
    res.send('Edit a review');
});
router.put('/:review_id', function(req, res, next) {
    res.send('Updated the review');
});
//delete a review
router.delete('/:review_id', function(req, res, next) {
    res.send('delete review with id');
});

module.exports = router;
