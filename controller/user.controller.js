import bcrypt from "bcrypt";
import User from "../model/user.model.js"

const adminEmails = [
    "ghanashyamaryal13@gmail.com",
    "krishnaparajuli37@gmail.com",
    "prakashghimire54@gmail.com"
];


export const Register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
     
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        
        const isAdmin = adminEmails.includes(email);

       
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

       
        const newUser = new User({
            email,
            password: hashedPassword,
            role: isAdmin ? "admin" : "user"
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully.",
            role: isAdmin ? "admin" : "user"
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
export default Register
