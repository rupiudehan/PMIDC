// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })

  

const userCountController = {
    getAllUser: async (req, res) => {
        try {
            pool.query('select count(*) as title from users union select sum("funds") as title from funds', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Total Users', err);
            res.status(500).json({ error: 'Failed to fetch total users' });
        }
    },

    
};

module.exports = userCountController;