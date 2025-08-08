import express from "express";
import { getBooks } from "../controllers/getbooks.js";
import { searchBook } from "../controllers/searchbook.js";
const router = express.Router()

router.get('/getBooks',getBooks)
router.post('/searchBook',searchBook)
export default router;