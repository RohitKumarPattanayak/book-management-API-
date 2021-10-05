const mongoose = require("mongoose");

const AuthorShema = mongoose.Schema(
    {
        id: Number,
        name : String,
        books :[String]
    }
);

const AuthorModel = mongoose.model("authors",AuthorShema)
module.exports = AuthorModel