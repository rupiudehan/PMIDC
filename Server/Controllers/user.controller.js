
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
          // Check for references in the state table first
          const results1 = await pool.query(`SELECT COUNT(*) AS count FROM assign_limits WHERE "userId" = $1`, [id]);
          const count = results1.rows[0].count;
  
          if (count > 0) {
              return res.status(400).json({ error: 'Cannot delete user. It is associated with other tables as a foreign key.' });
          } else {
              // Proceed to delete the country
              await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
              res.status(200).json({ message: 'Country deleted successfully' });
          }
      } catch (err) {
          console.error('Error deleting country:', err);
          res.status(500).json({ error: 'Failed to delete country' });
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