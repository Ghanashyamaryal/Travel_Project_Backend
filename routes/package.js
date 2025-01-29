import express from "express";
import {
    createPackage,
    getPackages,
    getPackageById,
    updatePackageById,
    deletePackage,
} from "../controller/Packages.controller.js"
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/",upload.single('profileImage'), createPackage);

router.get("/", getPackages);

router.get("/:id", getPackageById);

router.put("/:id",upload.single('profileImage'), updatePackageById);

router.delete("/:id", deletePackage);

export default router;
