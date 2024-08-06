const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: '123',
    port: 5432,
  });

const fundsController = {
    createFunds: async (req, res) => {
        const { Funds } = req.body;
        try {
            pool.query('INSERT INTO funds ("funds") VALUES ($1)', [Funds], (error, results) => {
                if (error) {
                    console.error('Error executing query', error.stack);
                    throw error;
                }
                res.status(201).json({ message: 'Funds added successfully' });
            });
        } catch (err) {
            console.error('Error adding funds:', err);
            res.status(500).json({ error: 'Failed to add funds' });
        }
    },
    getAllFunds: async (req, res) => {
        try {
            pool.query('SELECT * FROM funds', (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
            });
        } catch (err) {
            console.error('Error fetching fund details:', err);
            res.status(500).json({ error: 'Failed to fetch fund details' });
        }
    },
    updateFunds: async (req, res) => {
        const { id } = req.params;
        const { Funds } = req.body;
        try {
            pool.query('UPDATE funds SET funds = $1 WHERE id = $2', [Funds, id], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json({ message: 'Fund updated successfully' });
            });
        } catch (err) {
            console.error('Error updating Funds', err);
            res.status(500).json({ error: 'Failed to update funds' });
        }
    },
    deleteFunds: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query('DELETE FROM funds WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json({ message: 'Funds deleted successfully' });
            });
        } catch (err) {
            console.error('Error deleting Funds', err);
            res.status(500).json({ error: 'Failed to delete Funds' });
        }
    },
    getFundsbyid: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query('SELECT * FROM funds WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(200).json(results.rows);
            });
        } catch (err) {
            console.error('Error fetching Fund Details', err);
            res.status(500).json({ error: 'Failed to get Fund Details' });
        }
    }
};

module.exports = fundsController;
