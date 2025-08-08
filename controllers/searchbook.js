import Book from '../models/book.js'

export const searchBook = async(req,res)=>{

    try{
        const query = req.body.query
        const books = await Book.find({
            title:{$regex:query,$options:'i'}
        });
     
        res.render('showAllBooks',{books,user:req.user})

    }catch(error){
        console.log(error.message);
        res.status(500).send('internal server error!')
    }
}