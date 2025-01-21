import express from "express"

const router = express.Router()

router.use("/",(req,res)=>{
    res.send("hello trip")
})
export default router