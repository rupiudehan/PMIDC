
const State = require('../Models/state.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PMIDC',
  password: '123',
  port: 5432,
})

  const subSchemeController = {
    createSubScheme: async (req, res) => {
        const { subScheme } = req.body;
        const { schemeId } = req.body;
        console.log(subScheme);
        try {
            pool.query(`INSERT INTO sub_scheme ("subScheme", "schemeId") VALUES (\'${subScheme}\', ${schemeId})`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Sub-Scheme created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating Sub-Scheme:', err);
            res.status(500).json({ error: 'Failed to register Sub-Scheme' });
        }
    },
    getAllSubScheme: async (req, res) => {
        try {
            pool.query('SELECT ss.id, ss."subScheme", ss."schemeId", s."schemeName" FROM sub_scheme ss INNER JOIN scheme s ON ss."schemeId" = s.id', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Sub-Scheme', err);
            res.status(500).json({ error: 'Failed to fetch Sub-Scheme' });
        }
    },
    updateSubScheme: async (req, res) => {
      debugger
        const { id } = req.params;
        const { subScheme } = req.body;
        const { schemeId } = req.body;
        try {
            pool.query(`UPDATE sub_scheme SET "subScheme" = \'${subScheme}\', "schemeId" = \'${schemeId}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Sub-Scheme updated successfully' });
              })
        } catch (err) {
            console.error('Error updating Sub-Scheme:', err);
            res.status(500).json({ error: 'Failed to update Sub-Scheme' });
        }
    },
    deleteSubScheme: async (req, res) => {
        const { id } = req.params;
        try {
          // Check for references in the state table first
          const results1 = await pool.query(`SELECT COUNT(*) AS count FROM sub_component WHERE "subSchemeId" = $1`, [id]);
          const count = results1.rows[0].count;
  
          if (count > 0) {
              return res.status(400).json({ error: 'Cannot delete sub-scheme. It is associated with other tables as a foreign key.' });
          } else {
              // Proceed to delete the country
              await pool.query(`DELETE FROM sub_scheme WHERE id = $1`, [id]);
              res.status(200).json({ message: 'Sub-Scheme deleted successfully' });
          }
      } catch (err) {
          console.error('Error deleting sub-scheme', err);
          res.status(500).json({ error: 'Failed to delete sub-scheme' });
      }
    },

    getSubSchemebyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from sub_scheme where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Country fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating Sub-Scheme', err);
        res.status(500).json({ error: 'Failed to get Sub-Scheme' });
      }
  }
};

module.exports = subSchemeController;