const mongoose = require("mongoose");

//create book schema
const BookShema = mongoose.Schema(
    {
        ISBN : String,
        title : String,
        authors : [Number],
        language : String,
        putDate : String,
        numOfPage : Number,
        category : [String],
        publication : Number
    }
);

const BookModel = mongoose.model("books",BookShema);

module.exports = BookModel;