// MAIN BACKEND FILE

const db = require("./database/index1.js");
// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");
const mongoose = require('mongoose');
// const { json } = require("express");
// const e = require("express");

const app = express();
app.use(express.json());

// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:3000/books
app.get("/books", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});

// http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn", (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook.length===0) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", (req, res) => {
    // // console.log(req.params);
    const {category} = req.params;
    // // console.log(isbn);
    const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    // // console.log(getSpecificBook);
    // // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors", (req, res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", (req, res) => {
    // console.log(req.params);
    let {id} = req.params;
    id = Number(id);
    // console.log(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    // console.log(getSpecificAuthor);
    // console.log(getSpecificAuthor.length);
    if(getSpecificAuthor.length===0) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
});

// http://localhost:3000/author-isbn/12345Two
app.get("/author-isbn/:isbn", (req, res) => {
   
});

// http://localhost:3000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {
   
});

app.post("/book",(req,res)=>{
    const {newbook} = req.body
    // db.books.push(json(newbook))   *************************IMPORTANT DOUBT
    db.books.push(req.body)
    console.log(db.books)
    return res.json(db.books)
})

app.post("/author",(req,res)=>{
    db.authors.push(req.body)
    return res.json(db.authors)
})

app.post("/publication",(req,res)=>{ //CREATE
    db.publication.push(req.body)
    return res.json(db.publication)
})

app.put("/book-update/:isbn",(req,res)=>{ //UPDATE
    const {isbn} = req.params
    const {uisbn} = req.body
    db.books.forEach((e)=>{
        if(e.ISBN === isbn){
            console.log({...e, ...req.body})
            return {...e, ...req.body}
        }
        return e
    })
    console.log("----------------------------------------")
    console.log(db.books)
    return res.json(db.books)
})
app.put("/author-update/:id",(req,res)=>{ //UPDATE
    const {id} = req.params
    db.authors.forEach((e)=>{
        if(e.id === id){
            console.log({...e, ...req.body})
            return {...e, ...req.body}
        }
        return e
    })
    return res.json(db.authors)
})

app.delete("/book-delete/:isbn",(req,res)=>{
    const {isbn} = req.params
    // const afterdelete = db.books.filter((e)=>{
    //     if(e.ISBN!=isbn){
    //         return e
    //     }
    // })
    const afterdelete = db.books.filter((e)=>e.ISBN!=isbn)
    console.log(afterdelete)
    db.books = afterdelete
    res.send(db.books)
    // return res.json(db.books)
})
app.delete("/book-author-delete/:isbn/:id",(req,res)=>{
    let {isbn,id} = req.params
    id = Number(id)
    db.books.forEach((book)=>{
        if(book.ISBN === isbn){
            if(!book.authors.includes(id)){
                return book
            }
            book.authors = book.authors.filter((e)=> e!==id)
            return book
        }
        return book
    })
     return res.json(db.books)   
})

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});