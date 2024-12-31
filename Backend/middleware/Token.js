    const jwt = require('jsonwebtoken');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'myverystrongsecretkey123'; // Change this to a secure key

// Check if JWT_SECRET is defined
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

// Function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to attach token generation to the response
const jwtMiddleware = (req, res, next) => {
    res.generateToken = (userId) => {
        const token = generateToken(userId);
        return token;
    };
    next();
};

module.exports = { jwtMiddleware };