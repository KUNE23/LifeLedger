const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const financeRoutes = require('./routes/financeRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const tradingRoutes = require('./routes/tradingRoutes');
const goalsRoutes = require('./routes/goalRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "LifeLedger API is Active" });
});

app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/trading', tradingRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/projects', projectRoutes);

module.exports = app;