const axios = require('axios');
const BITQUERY_API_KEY = process.env.BITQUERY_API_KEY;
const WHALE_ADDRESSES = process.env.WHALE_ADDRESSES.split(',').map(addr => addr.trim());

const fetchWhaleTransactions = async () => {
  const query = `
    query WhaleTransactions {
      EVM(network: bsc) {
        DEXTradeByTokens(
          limit: { count: 100 }
          orderBy: { descending: Block_Time }
          where: {
            Trade: { Buyer: { in: [${WHALE_ADDRESSES.map(addr => `"${addr}"`).join(', ')}] } }
          }
        ) {
          Block {
            Number
            Time
          }
          Trade {
            Amount
            AmountInUSD
            Buyer
            Seller
            Currency {
              SmartContract
              Symbol
            }
          }
          Transaction {
            From
            Hash
            To
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://streaming.bitquery.io/graphql',
      { query: query.trim() },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': BITQUERY_API_KEY,
        },
      }
    );

    if (response.data && response.data.data && response.data.data.EVM) {
      return response.data.data.EVM.DEXTradeByTokens || [];
    } else {
      console.error("Unexpected API response structure:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching whale transactions:", error);
    return [];
  }
};

module.exports = fetchWhaleTransactions;
