import express from "express";
import Authentication from "../controller/Authentication.controller.js";

const router = express.Router();

router.post("/login",Authentication)
export default router;
