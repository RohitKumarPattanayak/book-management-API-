// MAIN BACKEND FILE

const db = require("./database/index1.js");

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
const BookModel = require("./database/books");
const authorsModel = require("./database/authors");
const publicationModel = require("./database/publications");
var mongoDB = "mongodb+srv://rohit_1:KESuc9tHmaRzDfNV@cluster0.zjgeo.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlparser: true, useUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"))


//******************************************************************************//
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://rohit_1:KESuc9tHmaRzDfNV@cluster0.zjgeo.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//  client.connect(err => {
//  const result = client.db("book-company").collection("books").findOne({ISBN : "12345Three"})
//  result.then((e)=>console.log(e))
//  // perform actions on the collection object
// });
// async function listDatabases(client){
//     databaselist = await client.db().admin().listDatabases()
//     console.log("THE COLLECTION IN A DATABASE ARE :")
//     databaselist.databases.forEach((db)=>{
//         console.log(db.name)
//     })
// }
//***************************************************************************//


//*********************USING OFFICIAL MONGO DB WAY************************* */
// async function main(){
//     const uri = "mongodb+srv://rohit_1:KESuc9tHmaRzDfNV@cluster0.zjgeo.mongodb.net/book-company?retryWrites=true&w=majority";
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     try{
//         await client.connect()
//         const result = await client.db("book-company").collection("books").findOne({ISBN : "12345Three"});
//         console.log(result)
//       console.log("______________________________________")  
//     await listDatabases(client)
//       console.log("______________________________________")
//     }
//     catch(e){
//         console.log(e)
//     }
//     finally{
//         await client.close()
//     }
// }
// main()
//********************************************** ********************************/



// http://localhost:3000/
app.get("/", (req, res) => {
    return res.json({"WELCOME": `to my Backend Software for the Book Company`});
});

// http://localhost:3000/books
app.get("/books", async (req, res) => {
    // const getAllBooks = db.books;
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// http://localhost:3000/book-isbn/12345Two
app.get("/book-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN : isbn})
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});

// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async(req, res) => {
    // // console.log(req.params);
    const {category} = req.params;
    // // console.log(isbn);
    const getSpecificBooks = await BookModel.find({category : category})
    // const getSpecificBooks = db.books.filter((book) => book.category.includes(category));
    // // console.log(getSpecificBook);
    // // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});

// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
    // const getAllAuthors = db.authors;
    const getAllAuthors = await authorsModel.find()
    return res.json(getAllAuthors);
});

// http://localhost:3000/author/12345ONE
app.get("/author/:isbn", async (req, res) => {
    const {isbn} = req.params
    const SpecificAuthor = await AuthorModel.find({books : isbn})
    return res.json(SpecificAuthor)
});


// http://localhost:3000/publications
app.get("/publications",  (req, res) => {
    const getAllPublications =  db.publication;
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-id/1
app.get("/publication-id/:id", async (req, res) => {
   const {id} = req.params
    const getPublication = await PublicationModel.findOne({id : id})
    if (getPublication == null){
     return res.json({error : `No Publication found for the id of ${id}`})   
    }else{
    return res.json(getPublication)
    }
});

app.post("/book",async(req,res)=>{
    // const {newbook} = req.body
    // // db.books.push(json(newbook))   *************************IMPORTANT DOUBT
    // db.books.push(req.body)
    // console.log(db.books)
    // return res.json(db.books)
    const addnewbook = await BookModel.create(req.body);
    return res.json({
        books: addnewbook,
        message: "Books was added !!!"
    })
})

app.post("/author",async(req,res)=>{
    const addAuthor = await authorsModel.create(req.body) 
    return res.json({AddedAuthor : addAuthor,message : "Added author sucessfully !!"})
})

app.post("/publication",async (req,res)=>{ //CREATE
    const addPublication  = await publicationModel.create(req.body) 
    return res.json({AddedPublication : addPublication ,message : "Added Publication sucessfully !!"})
})

app.put("/book-update/:isbn",async (req,res)=>{ //UPDATE
    const {isbn} = req.params
    // const updateBook = await BookModel.updateOne(req.body)
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN : isbn
        },
            req.body,
        {   new : true }
    ) 
    return res.json({bookUpdated: updateBook, message: "Book was updated !!"})
})
app.put("/author-update/:id", async (req,res)=>{ //UPDATE
    const {id} = req.params
    // db.authors.forEach((e)=>{
    //     if(e.id === id){
    //         console.log({...e, ...req.body})
    //         return {...e, ...req.body}
    //     }
    //     return e
    // })
   const updateAuthor = await authorsModel.findOneAndUpdate(
       {
           id: id
       },
       req.body,
       {new : true}

       ) 
       return res.json({AuthorUpdated: updateAuthor, message: "Author was updated !!"})
})

app.delete("/book-delete/:isbn",async (req,res)=>{
    const {isbn} = req.params

    const deleteBook = await BookModel.deleteOne({ISBN : isbn})
    return res.json({bookDeleted: deleteBook, message: "Book was deleted !!"})
    // return res.json(db.books)
})

app.delete("/author-delete/:id",async (req,res)=>{
    const {id} = req.params
    const deleteAuthor = await AuthorModel.deleteOne({id : id})
    return res.json({AuthorDeleted: deleteAuthor, message: "Author was deleted !!"})
    // return res.json(db.books)
})

app.delete("/book-author-delete/:isbn/:id",async (req,res)=>{
    const {isbn,id} = req.params
    // id = Number(id)
    let getSpecificBook = await BookModel.findOne({ISBN : isbn})
    if (getSpecificBook === null){
        return res.json({"error":`No book of ISBN : ${isbn} found`})
    }else{
        getSpecificBook.authors.remove(id)
        const updateAuthor = await BookModel.findOneAndUpdate(
            {
                ISBN : isbn
            },
            getSpecificBook,
            {new : true}
            )
            return res.json({AuthordeletedUpdated: updateAuthor, message: `Author id:${id} was Deleted from Book of ISBN:${isbn}!!`})          
    }
})

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING.....")
});