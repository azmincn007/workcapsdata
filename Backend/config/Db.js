const mysql = require('mysql2');

const connection = async () => {
    try {
        const db = mysql.createConnection({
            host: 'localhost', // replace with your host
            user: 'root', // replace with your MySQL username
            password: 'azmin2000', // replace with your MySQL password
            database: 'user_auth_db' // replace with your database name
        });

        db.connect((err) => {
            if (err) {
                console.error('Connection error:', err);
                process.exit();
            }
            console.log("Connection successful");

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            `;
            db.query(createTableQuery, (err, results) => {
                if (err) {
                    console.error('Error creating table:', err);
                } else {
                    console.log('Users table created or already exists');
                }
            });
        });

        return db;
    } catch {
        console.log('Connection error');
        process.exit();
    }
}

module.exports = connection;