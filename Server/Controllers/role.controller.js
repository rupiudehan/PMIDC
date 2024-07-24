// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })

  

const roleController = {
    createRole: async (req, res) => {
        const { RoleName } = req.body;
        console.log(RoleName);
        try {
            pool.query(`INSERT INTO role ("roleName") Values (\'${RoleName}\')`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'Role created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating role:', err);
            res.status(500).json({ error: 'Failed to create role' });
        }
    },
    getAllRoles: async (req, res) => {
        try {
            pool.query('SELECT * FROM role', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching roles:', err);
            res.status(500).json({ error: 'Failed to fetch roles' });
        }
    },
    updateRole: async (req, res) => {
      debugger
        const { id } = req.params;
        const { RoleName } = req.body;
        try {
            pool.query(`UPDATE role SET "roleName" = \'${RoleName}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Role updated successfully' });
              })
        } catch (err) {
            console.error('Error updating role:', err);
            res.status(500).json({ error: 'Failed to update role' });
        }
    },
    deleteRole: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from role where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'Role deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting role:', err);
            res.status(500).json({ error: 'Failed to delete role' });
        }
    },

    getRolebyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from role where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Role fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating role:', err);
        res.status(500).json({ error: 'Failed to get role' });
      }
  }
};

module.exports = roleController;