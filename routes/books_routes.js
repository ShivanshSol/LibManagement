const express = require("express");
const { books } = require('../data/books.json');
const { users } = require('../data/users.json'); //to get book issued data from users.json file

const router = express.Router();


/** //DAY03
*Route: /books  
*Method: GET  // to get all books
*Description: display all books
*Access: Public
*Parameter: None
*/
router.get("/" , (req,res)=>{
    res.status(200).json({
        success : true,
        data : books
    });
});


/** //DAY03
*Route: /books  
*Method: GET  // to get all books by ID
*Description: display a book information
*Access: Public
*Parameter: id
*/


/*  //DAY03
*Route: /issued
*Method: GET
*Description: Get all the issued books
*Access: Public
*Parameter: None
*/

router.get("/issued" , (req,res)=>{
    const userWithIssuedBook = users.filter((each) => {//instead of getting Find(1/0), we are using filter to get the Array of users with issued books
        if (each.issuedBook)
            return each;
    });
    const issuedBooks = [];

    userWithIssuedBook.forEach((each) => { //to get the book details of the user who issued the book
        const book = books.find((book) => book.id === each.issuedBook); //to get the book details wrt book id & book issued by the user

        book.issuedBy = each.name; //to get the user who issued the book
        book.issuedDate = each.issuedDate; //to get the issued date
        book.returnDate = each.returnDate; //to get the returned date

        issuedBooks.push(book); //to push the book details to new array 'issuedBooks'
    });

    if (issuedBooks.length === 0){
        return res.status(404).json({
            success : false,
            message : "No books issued !!"
        });
    }
    return res.status(200).json({
        success : true,
        message : "Users with issued books...",
        data : issuedBooks
    }); 
});

router.get("/:id" , (req,res)=>{
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(404).json({
            success : false,
            message : "Book does not exist !!"
        });
    }
    else{
        return res.status(200).json({
            success : true,
            message : "Book Found !!",
            data : book
        });
    }
 });


/*  //DAY03
*Route: /
*Method: POST
*Description: Adding a new book
*Access: Public
*Parameter: None
*/

router.post("/",(req,res) => {
    const { id, title, author, genre, price, publisher } = req.body;
    const book = books.find((each) => each.id === id);
    if(book){
        return res.status(404).json({
            success : false,
            message : "Book already exists !!"
        });
    }
    else{
        books.push({
            id,
            title,
            author,
            genre,
            price,
            publisher
        });
        return res.status(201).json({
            success : true,
            message : "Book added successfully !!",
            data : books
        });
    }

});



/*  //DAY03
*Route: /:id
*Method: PUT
*Description: Updating a book by id
*Access: Public
*Parameter: id
*/

router.put("/:id" , (req,res)=>{
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success : false,
            message : "Book does not exist !!"
        });
    }

    const updateBookData = books.map((each) => {
        if(each.id === id){
            return {
                ...each,
                ...data
            };
        }
        return each;
    });

    return res.status(200).json({
        success : true,
        message : "Book updated successfully !!",
        data : updateBookData
    });
 });




module.exports = router;