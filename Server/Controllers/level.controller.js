// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })

  

const levelController = {
    createLevel: async (req, res) => {
        const { LevelName } = req.body;
        console.log(LevelName);
        try {
            pool.query(`INSERT INTO level ("levelName") Values (\'${LevelName}\')`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Level created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating level:', err);
            res.status(500).json({ error: 'Failed to create level' });
        }
    },
    getAllLevels: async (req, res) => {
        try {
            pool.query('SELECT * FROM level', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Levels:', err);
            res.status(500).json({ error: 'Failed to fetch levels' });
        }
    },
    updateLevel: async (req, res) => {
      debugger
        const { id } = req.params;
        const { LevelName } = req.body;
        try {
            pool.query(`UPDATE level SET "levelName" = \'${LevelName}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Level updated successfully' });
              })
        } catch (err) {
            console.error('Error updating level:', err);
            res.status(500).json({ error: 'Failed to update level' });
        }
    },
    deleteLevel: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from level where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Level deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting level:', err);
            res.status(500).json({ error: 'Failed to delete level' });
        }
    },

    getLevelbyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from level where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Country fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating level:', err);
        res.status(500).json({ error: 'Failed to get level' });
      }
  }
};

module.exports = levelController;