// const Country = require('../Models/country.model');
var Pool = require ('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PMIDC',
  password: '123',
  port: 5432,
})

  

const userCountController = {
    getAllUser: async (req, res) => {
        try {
            pool.query(`select *from(select count(*)title,1 as no from users union select sum("funds")title,2 as no from funds union 
select (select sum("funds") from funds) - (select sum("limit") from assign_limits) as title,3 as no union  select sum ("limit")title,4 as no from assign_limits)t
order by t.no`, (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json(results.rows);
              })
            
        } catch (err) {
            console.error('Error fetching Total Users', err);
            res.status(500).json({ error: 'Failed to fetch total users' });
        }
    },

    getPieChart: async (req, res) => {
      try {
          pool.query(`select *from(
	 select (select sum("funds") from funds) - (select sum("limit") from assign_limits) as title,
	1 as no union  select sum ("limit")title,
	2 as no from assign_limits)t
order by t.no`, (error, results) => {
              if (error) {
                throw error
              }
              res.status(200).json(results.rows);
            })
          
      } catch (err) {
          console.error('Error fetching Total Users', err);
          res.status(500).json({ error: 'Failed to fetch total users' });
      }
  },
  getBarGraph: async (req, res) => {
    try {
        pool.query(`select sum("limit"),u."agencyName" from assign_limits al inner join users u on  al."userId"=u."id" group by u."agencyName" order by u."agencyName" desc`, (error, results) => {
            if (error) {
              throw error
            }
            res.status(200).json(results.rows);
          })
        
    } catch (err) {
        console.error('Error fetching Total Users', err);
        res.status(500).json({ error: 'Failed to fetch total users' });
    }
},


    
};

module.exports = userCountController;