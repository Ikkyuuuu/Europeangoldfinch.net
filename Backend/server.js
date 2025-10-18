const express = require('express');
const app = express();
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.get('/health', (_, res) => res.send('ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API on :${PORT}`));
