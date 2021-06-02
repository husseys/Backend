var express = require('express');
var router = express.Router();

router.get('/', (request, response, next) => {
    response.render('index', {title: 'Books API'})
})

module.exports = router;
