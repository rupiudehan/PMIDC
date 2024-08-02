const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./Routes/country.routes');
const stateRoutes = require ('./Routes/state.routes');
const levelRoutes = require ('./Routes/level.routes');
const roleRoutes = require ('./Routes/role.routes');
const schemeRoutes = require ('./Routes/scheme.routes');
const SubSchemeRoutes = require ('./Routes/sub-scheme.routes');
const UserRoutes = require ('./Routes/user.routes');
const FundsRoutes = require ('./Routes/funds.routes');
const subComponentRoutes = require ('./Routes/sub-component.routes');
const LimitRoutes = require ('./Routes/limit.routes');
const DashboardRoutes = require ('./Routes/dashboard.routes')
const cors = require('cors');


// var conString = "postgres://postgres:yashAN@@2002@localhost:5433/Test";

// var client = new pg.Client(conString);
// client.connect();

// var query = client.query("SELECT * FROM Country");
//fired after last row is emitted

// query.on('row', function(row) {
//     console.log(row);
// });

// query.on('end', function() {
//     client.end();
// });

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);
app.use('/api', stateRoutes);
app.use('/api', levelRoutes);
app.use('/api', roleRoutes);
app.use('/api', schemeRoutes);
app.use('/api', SubSchemeRoutes);
app.use('/api', UserRoutes);
app.use('/api', FundsRoutes);
app.use('/api', subComponentRoutes);
app.use('/api', LimitRoutes);
app.use('/api', DashboardRoutes);

app.post('/api/countries', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Country.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating country:', error);
        res.status(500).json({ error: 'Failed to create country' });
    }
});

app.post('/api/states', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await State.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating state:', error);
        res.status(500).json({ error: 'Failed to create state' });
    }
});

app.post('/api/levels', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Level.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating level:', error);
        res.status(500).json({ error: 'Failed to create level' });
    }
});

app.post('/api/roles', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Role.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating role', error);
        res.status(500).json({ error: 'Failed to create role' });
    }
});

app.post('/api/scheme', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Scheme.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating scheme', error);
        res.status(500).json({ error: 'Failed to create scheme' });
    }
});

app.post('/api/subScheme', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await SubScheme.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating SubScheme:', error);
        res.status(500).json({ error: 'Failed to create SubScheme' });
    }
});

app.post('/api/user', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await User.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).json({ error: 'Failed to create User' });
    }
});
app.post('/api/funds', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Funds.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating Funds', error);
        res.status(500).json({ error: 'Failed to create Funds' });
    }
});

app.post('/api/sub-component', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await SubComponent.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating Sub-Component', error);
        res.status(500).json({ error: 'Failed to create Sub-Component' });
    }
});

app.post('/api/limit', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Limit.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating Sub-Component', error);
        res.status(500).json({ error: 'Failed to create Sub-Component' });
    }
});

app.get('/api/dashboard', async (req, res) => {
    const { id, name } = req.body;
    try {
        const insertId = await Limit.create(id, name);
        res.status(201).json({ insertId });
    } catch (error) {
        console.error('Error creating Sub-Component', error);
        res.status(500).json({ error: 'Failed to create Sub-Component' });
    }
});

app.get('/api/search/:user', async (req, res) => {
    console.log(req.param.User)
    let data = await User.find(
        {
            "$or": [
                {
                    "name":{$regex:req.param.User}
                }
            ]
        }
    )
    res.send(data)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

