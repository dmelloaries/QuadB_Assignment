import React, { useState, useEffect } from 'react';
import { ChevronDown, Send, Moon, Sun } from 'lucide-react';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const [cryptoDropdownOpen, setCryptoDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/tickers');
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-teal-500' : 'text-teal-600'}`}>HODLINFO</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded flex items-center`}
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              >
                {selectedCurrency} <ChevronDown className="ml-2" />
              </button>
              {currencyDropdownOpen && (
                <div className={`absolute top-full left-0 mt-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow-lg`}>
                  {['INR', 'USD'].map((currency) => (
                    <button
                      key={currency}
                      className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                      onClick={() => {
                        setSelectedCurrency(currency);
                        setCurrencyDropdownOpen(false);
                      }}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded flex items-center`}
                onClick={() => setCryptoDropdownOpen(!cryptoDropdownOpen)}
              >
                {selectedCrypto} <ChevronDown className="ml-2" />
              </button>
              {cryptoDropdownOpen && (
                <div className={`absolute top-full left-0 mt-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded shadow-lg`}>
                  {['BTC', 'ETH', 'USDT'].map((crypto) => (
                    <button
                      key={crypto}
                      className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'}`}
                      onClick={() => {
                        setSelectedCrypto(crypto);
                        setCryptoDropdownOpen(false);
                      }}
                    >
                      {crypto}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="bg-teal-500 text-white px-4 py-2 rounded">BUY {selectedCrypto}</button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-teal-500 text-white px-4 py-2 rounded flex items-center">
              <Send className="mr-2" size={18} />
              Connect Telegram
            </button>
            <button 
              className={`w-12 h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full p-1 cursor-pointer flex items-center`}
              onClick={toggleTheme}
            >
              <div 
                className={`w-4 h-4 bg-teal-500 rounded-full transform duration-300 ease-in-out ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
              ></div>
              {isDarkMode ? <Moon size={14} className="ml-1" /> : <Sun size={14} className="ml-auto mr-1" />}
            </button>
          </div>
        </header>
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-lg p-6`}>
          <h2 className={`text-2xl font-semibold mb-4 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Best Price to Trade</h2>
          <p className={`text-5xl font-bold text-center ${isDarkMode ? 'text-teal-500' : 'text-teal-600'} mb-6`}>
            {cryptoData.length > 0 ? formatPrice(cryptoData[0].last) : 'Loading...'}
          </p>
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'text-teal-500' : 'text-teal-600'}>
                <th className="p-2 text-left">Platform</th>
                <th className="p-2 text-left">Last Traded Price</th>
                <th className="p-2 text-left">Buy / Sell Price</th>
                <th className="p-2 text-left">Difference</th>
                <th className="p-2 text-left">Savings</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto) => (
                <tr key={crypto.id} className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                  <td className="p-2">{crypto.name.split('/')[0]}</td>
                  <td className="p-2">{formatPrice(crypto.last)}</td>
                  <td className="p-2">
                    {formatPrice(crypto.buy)} / {formatPrice(crypto.sell)}
                  </td>
                  <td className="p-2">
                    {((crypto.last - cryptoData[0].last) / cryptoData[0].last * 100).toFixed(2)}%
                  </td>
                  <td className="p-2">
                    {formatPrice(Math.abs(crypto.last - cryptoData[0].last))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;