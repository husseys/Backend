let express = require('express');
let router = express.Router(); 
let BookSchema = require('../models/books');

function HandleError (response, reason, error, code){
    console.log('ERROR: ' + reason); 
    response.status(code || 400).json({"error:": error}); 
}

//GET /api/books - Gets all the books
router.get('/', (request, response, next)=>{
    BookSchema.find({}, function(error, books) {
        if (error){
            HandleError(response, 'Something went wrong', error, 500);
        }else if (books){
            response.send(books);
        }else{
            HandleError(response, 'Something else went wrong', 'Books not found', 404)
        }
    })
});

//GET /api/books/:id - Gets the book with the given id (catch error of id not found!)
router.get('/:id', (request, response, next) =>{
    BookSchema
        .findById(request.params.id, function(error, book) {
            if (error){
                HandleError(response, 'Something went wrong', error, 500);
            }else if (book){
                response.send(book);
            }else{
                HandleError(response, 'Something else went wrong', 'Book not found', 404)
            }
        });
});

//POST /api/books - Inserts a book (start here nextime)
router.post('/', (request, response, next) => {
    let newBook = request.body; 
    console.log(request.body.toJSON);
    if (!newBook.title || !newBook.author){
        HandleError(response, 'Missing info', 'Form data missing', 400);
    }
    else{
        let book = new BookSchema({
            title: newBook.title, 
            description: newBook.description,
            year: newBook.year,
            author: newBook.author,
            hardCover: newBook.hardCover,
            price: newBook.price 
        });
        book.save((error) => {
            if (error){
                response.send({"error": error});
            }else{
                response.send({"id": book.id});
            }
        });
    }
});

//PATCH /api/books/:id - Modifies a book with the given id
router.patch('/:id', (request, response, next) => {
    BookSchema
        .findByIdAndUpdate(request.params.id, request.body, function (error, result){
            if (error){
                HandleError(response, 'Something went wrong', error, 500);
            }
            //come back to fix console log
            else if (result){
                response.send(result)
            }
        })
});

//DELETE /api/books/:id - Deletes a book with the given id
router.delete('/:id', (request, response, next) => {
    BookSchema
        .findByIdAndDelete(request.params.id, function(error, result){
            if (error) {
                HandleError(response, 'Something went wrong', error, 500);
            //come back to fix console log   
            }else if (result){
                response.send(result)
            }
        });
});

module.exports = router;