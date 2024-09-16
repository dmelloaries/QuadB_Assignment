const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchAndStoreData() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;

    // Extract top 10 tickers
    const top10 = Object.values(tickers).slice(0, 10);

    // Map data to fit your Prisma schema
    const dataToInsert = top10.map(ticker => ({
      name: ticker.name,
      last: parseFloat(ticker.last),
      buy: parseFloat(ticker.buy),
      sell: parseFloat(ticker.sell),
      volume: parseFloat(ticker.volume),
      base_unit: ticker.base_unit,
    }));

    // Clear existing data (optional)
    await prisma.ticker.deleteMany();

    // Insert top 10 tickers
    await prisma.ticker.createMany({ data: dataToInsert });

    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error fetching data', error);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAndStoreData();
