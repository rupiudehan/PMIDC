// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })

  
const fundsController = {
    createFunds: async (req, res) => {
        const { Funds } = req.body;
        console.log(Funds);
        try {
            pool.query(`INSERT INTO funds ("funds", "createdDate") Values (${Funds})`, (error, results) => {
                if (error) {
                    console.error('Error executing query', error.stack);
                    throw error;
                }
                console.log(results)
                res.status(201).json({ message: ' Funds added successfully' });
              })
            
        } catch (err) {
            console.error('Error adding funds:', err);
            res.status(500).json({ error: 'Failed to add funds' });
        }
    },
    getAllFunds: async (req, res) => {
        try {
            pool.query('SELECT * FROM funds', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching fund details:', err);
            res.status(500).json({ error: 'Failed to fetch fund details' });
        }
    },
    updateFunds: async (req, res) => {
      debugger
        const { id } = req.params;
        const { Funds } = req.body;
        try {
            pool.query(`UPDATE funds SET "funds" = ${Funds} where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Fund updated successfully' });
              })
        } catch (err) {
            console.error('Error updating Funds', err);
            res.status(500).json({ error: 'Failed to update funds' });
        }
    },
    deleteFunds: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from funds where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Funds deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting Funds', err);
            res.status(500).json({ error: 'Failed to delete Funds' });
        }
    },

    getFundsbyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from funds where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Country fetched successfully' });
          })
    } catch (err) {
        console.error('Error fteching Fund Details', err);
        res.status(500).json({ error: 'Failed to get Fund Details' });
      }
  }
};

module.exports = fundsController;