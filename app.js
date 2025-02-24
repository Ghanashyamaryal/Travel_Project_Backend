import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
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
import search from "./routes/Search.js"


app.use("/api/auth", auth);
app.use("/api/destination", destination);
app.use("/api/festival", festival);
app.use("/api/hotel", hotel);
app.use("/api/package", packages);
app.use("/api/trek", trek);
app.use("/api/user", user);
app.use("/api/plantrip", plantrip);
app.use("/api/search", search);


app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});





export { app };
