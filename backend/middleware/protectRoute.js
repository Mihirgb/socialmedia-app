import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
    try {
        // 1️⃣ Get token from cookies
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json("Token not provided");
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json("User not found");
        }
        req.user = user;

        // 6️⃣ Proceed to the next middleware
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error("Token has expired", error);
            return res.status(401).json("Token has expired");
        }

        console.error("Middleware error:", error);
        return res.status(500).json("Internal server error");
    }
};
