// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: '123',
    port: 5432,
  })

  

const countryController = {
    createCountry: async (req, res) => {
        const { CountryName } = req.body;
        console.log(CountryName);
        try {
            pool.query(`INSERT INTO country ("countryName") Values (\'${CountryName}\')`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Country created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating country:', err);
            res.status(500).json({ error: 'Failed to create country' });
        }
    },
    getAllCountries: async (req, res) => {
        try {
            pool.query('SELECT * FROM country', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching countries:', err);
            res.status(500).json({ error: 'Failed to fetch countries' });
        }
    },
    updateCountry: async (req, res) => {
      debugger
        const { id } = req.params;
        const { CountryName } = req.body;
        try {
            pool.query(`UPDATE country SET "countryName" = \'${CountryName}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Country updated successfully' });
              })
        } catch (err) {
            console.error('Error updating country:', err);
            res.status(500).json({ error: 'Failed to update country' });
        }
    },
    deleteCountry: async (req, res) => {
      const { id } = req.params;
  
      try {
          // Check for references in the state table first
          const results1 = await pool.query(`SELECT COUNT(*) AS count FROM state WHERE "countryId" = $1`, [id]);
          const count = results1.rows[0].count;
  
          if (count > 0) {
              return res.status(400).json({ error: 'Cannot delete country. It is associated with other tables as a foreign key.' });
          } else {
              // Proceed to delete the country
              await pool.query(`DELETE FROM country WHERE id = $1`, [id]);
              res.status(200).json({ message: 'Country deleted successfully' });
          }
      } catch (err) {
          console.error('Error deleting country:', err);
          res.status(500).json({ error: 'Failed to delete country' });
      }
  },
  
  

    getCountrybyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from country where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Country fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating country:', err);
        res.status(500).json({ error: 'Failed to get country' });
      }
  }
};

module.exports = countryController;