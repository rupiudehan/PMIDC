
const State = require('../Models/state.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PMIDC',
  password: '123',
  port: 5432,
})


  const subComponentController = {
    createSubComponent: async (req, res) => {
        const { subComponent } = req.body;
        const { schemeId } = req.body;
        const { subSchemeId } = req.body;
        const { componentCode } = req.body;
        console.log(subComponent);
        try {
            pool.query(`INSERT INTO sub_component ("subComponent", "schemeId", "subSchemeId", "componentCode") VALUES (\'${subComponent}\', ${schemeId}, ${subSchemeId}, \'${componentCode}\')`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Sub-Component created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating Sub-Component', err);
            res.status(500).json({ error: 'Failed to register Sub-Component' });
        }
    },
    getAllSubComponent: async (req, res) => {
        try {
            pool.query('SELECT sc.id, sc."schemeId", sc."subSchemeId", sc."subComponent", sc."componentCode", s."schemeName", ss."subScheme" FROM sub_component sc INNER JOIN scheme s ON sc."schemeId" = s.id inner join sub_scheme ss on sc."subSchemeId" = ss.id;', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Sub-Components', err);
            res.status(500).json({ error: 'Failed to fetch Sub-Components' });
        }
    },
    updateSubComponent: async (req, res) => {
      debugger
        const { id } = req.params;
        const { SubComponent } = req.body;
        const { schemeId } = req.body;
        const { subSchemeId } = req.body;
        const { componentCode } = req.body;
        try {
            pool.query(`UPDATE sub_component SET "subComponent" = \'${SubComponent}\', "schemeId" = \'${schemeId}\', "subSchemeId" = \'${subSchemeId}\', "componentCode" = \'${componentCode}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Sub-Component updated successfully' });
              })
        } catch (err) {
            console.error('Error updating Sub-Component', err);
            res.status(500).json({ error: 'Failed to update Sub-Component' });
        }
    },
    deleteSubComponent: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from sub_component where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Sub-Component deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting Sub-Component', err);
            res.status(500).json({ error: 'Failed to delete Sub-Component' });
        }
    },

    getSubComponentbyid: async (req, res) => {
      const {id} = req.params;
      try {
        pool.query(`SELECT * from sub_component where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: ' fetched successfully' });
          })
    } catch (err) {
        console.error('Error while fetching Sub-Component', err);
        res.status(500).json({ error: 'Failed to get Sub-Component' });
      }
  }
};

module.exports = subComponentController;