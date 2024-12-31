const connection = require("../../config/Db");

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const db = await connection();

    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY' || err.message.includes('Duplicate entry')) {
                return res.status(409).json({ message: 'Email already in use' });
            }
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
    });
};
// Get registered usersasdad
const getUsers = async (req, res) => {
    const db = await connection();

    const selectQuery = 'SELECT id, name, email FROM users';
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.status(200).json({ users: results });
    });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = await connection();

    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(selectQuery, [email], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', userId: results[0].id });
    });
};

module.exports = { registerUser, getUsers, loginUser };