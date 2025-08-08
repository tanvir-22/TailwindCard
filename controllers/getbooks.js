import Book from "../models/book.js";

export const getBooks = async (req, res) => {
    try{
  
       const books = await Book.find();
       console.log(req.user);
         res.render('showAllBooks', {books,user:req.user});
}catch (err) {
        console.error(err);
        res.status(500).json({message:'Internal Server Error '});
    }
};
