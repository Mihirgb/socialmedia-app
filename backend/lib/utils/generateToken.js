import jwt from "jsonwebtoken";
const generateTokenandSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });
    res.cookie("jwt", token);
};

export default generateTokenandSetCookie;
