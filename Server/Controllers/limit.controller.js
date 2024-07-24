
const State = require('../Models/state.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })


  const limitController = {
    createLimit: async (req, res) => {
        const { levelId } = req.body;
        const { userId } = req.body;
        const { schemeId } = req.body;
        const { limit } = req.body;
        console.log(limit);
        try {
          // console.log(`INSERT INTO assign_limits ("levelId", "userId", "schemeId", "limit") VALUES (${levelId}, ${userId}, ${schemeId}, ${limit})`)
            pool.query(`INSERT INTO assign_limits ("levelId", "userId", "schemeId", "limit") VALUES (${levelId}, ${userId}, ${schemeId}, ${limit})`, (error, results) => {
              
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Limit created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating Limit', err);
            res.status(500).json({ error: 'Hello' });
        }
    },
    getAllLimits: async (req, res) => {
        try {
            pool.query('SELECT ls."id", l."levelName", u."agencyName", s."schemeName", ls."limit" FROM assign_limits ls INNER JOIN level l ON ls."levelId" = l.id inner join users u on ls."userId" = u.id inner join scheme s on ls."schemeId"= s.id ', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Limit Details', err);
            res.status(500).json({ error: 'Failed to fetch Limit Details' });
        }
    },
    updateLimit: async (req, res) => {
      debugger
        const { id } = req.params;
        const { levelId } = req.body;
        const { userId } = req.body;
        const { schemeId } = req.body;
        const { limit } = req.body;
        try {
            pool.query(`UPDATE assign_limits SET "levelId" = ${levelId}, "userId" = ${userId}, "schemeId" = ${schemeId}, "limit" = ${limit} where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Limit updated successfully' });
              })
        } catch (err) {
            console.error('Error updating Limit', err);
            res.status(500).json({ error: 'Failed to update Limit' });
        }
    },
    deleteLimit: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from assign_limits where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Limit deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting Limit', err);
            res.status(500).json({ error: 'Failed to delete Limit' });
        }
    },

    getLimitbyid: async (req, res) => {
      const {id} = req.params;
      try {
        pool.query(`SELECT * from assign_limits where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: fetched successfully' });
          })
    } catch (err) {
        console.error('Error while fetching Limit', err);
        res.status(500).json({ error: 'Failed to get Limit' });
      }
  }
};

module.exports = limitController;