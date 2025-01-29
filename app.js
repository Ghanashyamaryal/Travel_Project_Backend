import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true,
    })
);

app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


import auth from "./routes/Authentication.js";
import destination from "./routes/Destination.js";
import festival from "./routes/festival.js"
import hotel from "./routes/Hotel.js";
import packages from "./routes/package.js"
import user from "./routes/User.js";
import trek from "./routes/trek.js"
import plantrip from "./routes/Plantrip.js"
import Hotel from "./model/Hotel.model.js";
import Package from "./model/Packages.model.js";
import Destination from "./model/Destination.model.js";



app.get("/api/search", async (req, res) => {
    const query = req.query.query;
    
    try {
        
        const packages = await Package.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { destination: { $regex: query, $options: 'i' } },
                { inclusions: { $regex: query, $options: 'i' } },
                { exclusions: { $regex: query, $options: 'i' } }
            ]
        });
        
        const hotels = await Hotel.find({ name: { $regex: query, $options: 'i' } });
        const destinations = await Destination.find({ name: { $regex: query, $options: 'i' } });
        
        res.json({ packages, hotels, destinations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching search results" });
    }
});



app.use("/api/auth", auth);
app.use("/api/destination", destination);
app.use("/api/festival", festival);
app.use("/api/hotel", hotel);
app.use("/api/package", packages);
app.use("/api/trek", trek);
app.use("/api/user", user);
app.use("/api/plantrip", plantrip);


app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});





export { app };
