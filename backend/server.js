const express = require('express');
const cors = require('cors'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;


app.use(cors({
  origin: 'https://quadbassignment.vercel.app'
}));

app.get("/", (req, res) => {
    res.send("Server is live");
});
  
// Route to get all tickers
app.get('/tickers', async (req, res) => {
  try {
    const tickers = await prisma.ticker.findMany();
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching tickers', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
