const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`
    🚀 LifeLedger Server is running!
    📡 URL: http://localhost:${PORT}
    🛠️  Environment: Development
    `);
});