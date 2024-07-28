
const State = require('../Models/state.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })


  const stateController = {
    createState: async (req, res) => {
        const { stateName } = req.body;
        const { countryId } = req.body;
        console.log(stateName);
        try {
            pool.query(`INSERT INTO state ("stateName", "countryId") VALUES (\'${stateName}\', ${countryId})`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'State created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating State:', err);
            res.status(500).json({ error: 'Failed to register State' });
        }
    },
    getAllStates: async (req, res) => {
        try {
            pool.query('SELECT st.id, st."stateName", st."countryId", ct."countryName" FROM state st INNER JOIN country ct ON st."countryId" = ct.id;', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching States:', err);
            res.status(500).json({ error: 'Failed to fetch States' });
        }
    },
    updateState: async (req, res) => {
      debugger
        const { id } = req.params;
        const { stateName } = req.body;
        const { countryId } = req.body;
        try {
            pool.query(`UPDATE state SET "stateName" = \'${stateName}\', "countryId" = \'${countryId}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'State updated successfully' });
              })
        } catch (err) {
            console.error('Error updating State:', err);
            res.status(500).json({ error: 'Failed to update state' });
        }
    },
    deleteState: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from state where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'State deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting state:', err);
            res.status(500).json({ error: 'Failed to delete state' });
        }
    },

    getStatebyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from state where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Country fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating state:', err);
        res.status(500).json({ error: 'Failed to get state' });
      }
  }
};

module.exports = stateController;