import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import connectDb from './config/database.js';
import optionalAuth from './middlewares/optionalAuth.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import searchbooksRoute from './routes/SearchbooksRoute.js'

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cookieParser());
app.use(optionalAuth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use( userRoute);
app.use(express.static('public'));
app.get('/', (req, res) => {
    console.log(req.user);
    res.render('index', { user: req.user });
});
app.use(searchbooksRoute)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})