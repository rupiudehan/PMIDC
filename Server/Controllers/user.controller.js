
const State = require('../Models/state.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PMIDC',
    password: 'yashAN@@2002',
    port: 5433,
  })


  const userController = {
    createUser: async (req, res) => {
        const { agencyName } = req.body;
        const { roleId } = req.body;
        const { levelId } = req.body;
        const { email } = req.body;
        const { password } = req.body;
        console.log(agencyName);
        try {
            pool.query(`INSERT INTO users ("agencyName", "roleId", "levelId", "email", "password") VALUES (\'${agencyName}\', ${roleId}, ${levelId}, \'${email}\', \'${password}\')`, (error, results) => {
                if (error) {
                  throw error
                }
                console.log(results)
                res.status(201).json({ message: 'User created successfully' });
              })
            
        } catch (err) {
            console.error('Error creating user', err);
            res.status(500).json({ error: 'Failed to register User' });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            pool.query('SELECT u.id, u."roleId", u."levelId", u."agencyName", u."email", u."password", r."roleName",l."levelName"  FROM users u INNER JOIN role r ON u."roleId" = r.id inner join level l on u."levelId" = l.id', (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Users', err);
            res.status(500).json({ error: 'Failed to fetch Users' });
        }
    },
    updateUser: async (req, res) => {
      debugger
        const { id } = req.params;
        const { agencyName } = req.body;
        const { roleId } = req.body;
        const { levelId } = req.body;
        const { email } = req.body;
        const { password } = req.body;
        try {
            pool.query(`UPDATE users SET "agencyName" = \'${agencyName}\', "roleId" = ${roleId}, "levelId" = ${levelId} , "email" = \'${email}\', "password" = \'${password}\' where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'User updated successfully' });
              })
        } catch (err) {
            console.error('Error updating user', err);
            res.status(500).json({ error: 'Failed to update user' });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            pool.query(`DELETE from users where id= ${id}`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({ message: 'User deleted successfully' });
              })
        } catch (err) {
            console.error('Error deleting User', err);
            res.status(500).json({ error: 'Failed to delete User' });
        }
    },

    getUserbyid: async (req, res) => {
      const {id} = req.params;
      debugger
      try {
        pool.query(`SELECT * from users where id=${id}`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
            //res.status(200).json({ message: 'Country fetched successfully' });
          })
    } catch (err) {
        console.error('Error updating User', err);
        res.status(500).json({ error: 'Failed to get User' });
      }
  }
};

module.exports = userController;