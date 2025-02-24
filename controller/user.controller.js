import bcrypt from "bcrypt";
import User from "../model/user.model.js";

const adminEmails = [
    "ghanashyamaryal13@gmail.com",
    "krishnaparajuli37@gmail.com",
    "prakashghimire54@gmail.com"
];

export const Register = async (req, res) => {
    const { username, email, password } = req.body;

   
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required." });
    }

    const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: "Username must be 3-20 characters and can only contain letters, numbers, and underscores." });
    }

    try {
        
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already in use." });
        }

        
        const isAdmin = adminEmails.includes(email);

        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

       
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: isAdmin ? "admin" : "user"
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully.",
            role: isAdmin ? "admin" : "user",
            username: username
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export default Register;
