// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })

  

const schemeController = {
    createScheme: async (req, res) => {
        const { SchemeName } = req.body;
        console.log(SchemeName);
        try {
            pool.query(`INSERT INTO scheme ("schemeName") Values (\'${SchemeName}\')`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Scheme created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating Scheme:', err);
            res.status(500).json({ error: 'Failed to create Scheme' });
        }
    },
    getAllSchemes: async (req, res) => {
        try {
            pool.query('SELECT * FROM scheme', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching schemes:', err);
            res.status(500).json({ error: 'Failed to fetch schemes' });
        }
    },
    updateScheme: async (req, res) => {
      debugger
        const { id } = req.params;
        const { SchemeName } = req.body;
        try {
            pool.query(`UPDATE scheme SET "schemeName" = \'${SchemeName}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Scheme updated successfully' });
              })
        } catch (err) {
            console.error('Error updating scheme:', err);
            res.status(500).json({ error: 'Failed to update scheme' });
        }
    },
    deleteScheme: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from scheme where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Scheme deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting scheme:', err);
            res.status(500).json({ error: 'Failed to delete scheme' });
        }
    },

    getSchemebyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from scheme where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Scheme fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating scheme:', err);
        res.status(500).json({ error: 'Failed to get scheme' });
      }
  }
};

module.exports = schemeController;