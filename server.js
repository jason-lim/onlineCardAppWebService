// include the required packages
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();
const port = 3000;

//database config info
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
};

// Create ONE pool for the whole app
const pool = mysql.createPool(dbConfig);

//intialize Express app
const app = express();
//helps app to read JSON
app.use(express.json());
app.use(cors());

//start the server
app.listen(port, () => {
    console.log('Server running on port', port);
});

// Get all cards (using the pool)
app.get('/card', async (req, res) => {
    try {
        // pool.query auto-acquires + releases a connection
        const [rows] = await pool.query(`SELECT * FROM cards`);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for /card' });
    }
});

// Create a new card
app.post('/card', async (req, res) => {
    const { card_name, card_pic } = req.body;
    try {        
        await pool.execute(`INSERT INTO cards (card_name, card_pic) VALUES (?, ?)`, [card_name, card_pic]);
        res.status(201).json({ message: 'Card '+card_name+' added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not add card '+ card_name });
    }
});


// Get 1 card by ID
app.get('/card/:id', async (req, res) => {
    const { id } = req.params;
    try {        
        const [rows] = await pool.execute(`SELECT * FROM cards where id = ?`, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error for /card/:id' });
    }
});


// Edit (update) a card
app.put('/card/:id', async (req, res) => {
    const { id } = req.params;
    const { card_name, card_pic } = req.body;

    if (card_name === undefined && card_pic === undefined) {
        return res.status(400).json({ message: 'Nothing to update' });
    }

    try {        
        const [result] = await pool.execute(
            `UPDATE cards 
             SET card_name = COALESCE(?, card_name),
                 card_pic = COALESCE(?, card_pic)
             WHERE id = ?`,
            [card_name ?? null, card_pic ?? null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json({ message: 'Card id ' + id + ' updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not update card id ' + id });
    }
});

// Delete a card
app.delete('/card/:id', async (req, res) => {
    const { id } = req.params;

    try {        
        const [result] = await pool.execute(
            `DELETE FROM cards WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.json({ message: 'Card id ' + id + ' deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error - could not delete card id ' + id });
    }

});




