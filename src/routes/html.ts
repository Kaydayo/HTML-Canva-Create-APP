import express, { Request, Response, NextFunction } from 'express';
import { createHtml, getHtml } from '../controllers/htmlController';
const router = express.Router();


/* GET home page. */
router.get('/', (req:Request,res:Response,next:NextFunction)=>{
    res.send(200).json({message:'you are here'})
})
router.post('/create/:html', createHtml);
router.get('/get/webview/:id', getHtml);

export default router;
