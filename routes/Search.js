import express from "express";
import { searchController } from "../controller/Search.controller.js";


const router = express.Router();

router.get('/', searchController);

export default router;
