import { useState, useEffect } from 'react';
import { TrendingUp, Users, Activity, DollarSign, Calendar, Zap, Repeat, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAccounts: 0,
    totalVolume: 0,
    totalTransactions: 0,
    avgTransactionSize: 0,
    avgDailyActiveUsers: 0,
    weeklyActiveUsers: 0,
    monthlyActiveUsers: 0,
    repeatCustomers: 0,
    avgTransactionsPerAccount: 0,
    avgUniqueClientsPerAccount: 0,
    totalRevenue: 0,
    avgRevenuePerAccount: 0
  });
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [dailyStats, setDailyStats] = useState([]);

    // {
  //   "account": "0.0.1012978",
  //   "balance_start": 0,
  //   "balance_end": 113887353713,
  //   "change": 113887353713,
  //   "transaction_count": 15,
  //   "transactions": [
  //     {
  //       "transaction_id": "0.0.1012978-1762272523-472736901",
  //       "consensus_timestamp": "1762272535.403383181",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": 114070314814,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964804",
  //           "amount": -114070314814,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1762272523-472736901",
  //       "consensus_timestamp": "1762272535.403383188",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3946530",
  //           "amount": 285175787,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": -285175787,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1762272523-472736901",
  //       "consensus_timestamp": "1762272535.403383189",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": 113785139027,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": -113785139027,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1762273208-305958667",
  //       "consensus_timestamp": "1762273217.493599001",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": 102470863,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964804",
  //           "amount": -102470863,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1762273208-305958667",
  //       "consensus_timestamp": "1762273217.493599008",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3946530",
  //           "amount": 256177,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": -256177,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1762273208-305958667",
  //       "consensus_timestamp": "1762273217.493599009",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": 102214686,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": -102214686,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763097518-864789747",
  //       "consensus_timestamp": "1763097528.508554003",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": -56943676856,
  //           "is_approval": true
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964804",
  //           "amount": 56943676856,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763100964-006681980",
  //       "consensus_timestamp": "1763100971.263861003",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": -56927162475,
  //           "is_approval": true
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964860",
  //           "amount": 56927162475,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763264209-277824796",
  //       "consensus_timestamp": "1763264218.355223003",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": 97116694,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964860",
  //           "amount": -97116694,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763264336-337427373",
  //       "consensus_timestamp": "1763264346.058744001",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": -113631076,
  //           "is_approval": true
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1088553",
  //           "amount": 113631076,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763306185-608668887",
  //       "consensus_timestamp": "1763306196.594601003",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": 3584349,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964860",
  //           "amount": -3584349,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763306279-778098019",
  //       "consensus_timestamp": "1763306285.964335005",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": 44173726645,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964860",
  //           "amount": -44173726645,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763311191-079039878",
  //       "consensus_timestamp": "1763311199.215935768",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": 62708511589,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3964804",
  //           "amount": -62708511589,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763311191-079039878",
  //       "consensus_timestamp": "1763311199.215935773",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3946530",
  //           "amount": 156771278,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": -156771278,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     },
  //     {
  //       "transaction_id": "0.0.1012978-1763311191-079039878",
  //       "consensus_timestamp": "1763311199.215935774",
  //       "account_id": "0.0.1012978",
  //       "usdc_transfers": [
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.1012978",
  //           "amount": 62551740311,
  //           "is_approval": false
  //         },
  //         {
  //           "token_id": "0.0.456858",
  //           "account": "0.0.3949434",
  //           "amount": -62551740311,
  //           "is_approval": false
  //         }
  //       ],
  //       "memo_base64": "",
  //       "result": "SUCCESS",
  //       "charged_tx_fee": 0
  //     }
  //   ]
  // },

  const fetchTransactionsForAccounts = async (accountData) => {
    console.log(`Starting to fetch transactions for ${accountData.length} accounts...`);
    
    const BASE_URL = "https://mainnet-public.mirrornode.hedera.com/api/v1";
    
    for (const account of accountData) {
      try {
        const accountId = account.account;
        const params = new URLSearchParams({
          "account.id": accountId,
          "transactiontype": "CRYPTOTRANSFER",
          "limit": "100",
          "order": "asc"
        });
        
        const url = `${BASE_URL}/transactions?${params.toString()}`;
        
        const response = await fetch(url);
        if (response.ok) {
          const transactionData = await response.json();
          console.log(`Fetched ${transactionData.transactions?.length || 0} transactions for account ${accountId}`);
          
          // Optional: Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          console.warn(`Failed to fetch transactions for account ${accountId}: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error fetching transactions for account ${account.account}:`, error);
      }
    }
    
    console.log('Finished fetching transactions for all accounts');
  };

  const calculateStats = (accountData, dailyData) => {
    const now = Date.now() / 1000; // Current time in seconds
    const oneWeekAgo = now - (7 * 24 * 60 * 60);
    const oneMonthAgo = now - (30 * 24 * 60 * 60);

    // Collect all transactions with timestamps
    let allTransactions = [];
    accountData.forEach(account => {
      account.transactions.forEach(tx => {
        const timestamp = parseFloat(tx.consensus_timestamp);
        const txVolume = tx.usdc_transfers
          .filter(transfer => transfer.account === account.account)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        allTransactions.push({
          accountId: account.account,
          timestamp,
          volume: txVolume
        });
      });
    });

    // Sort by timestamp
    allTransactions.sort((a, b) => a.timestamp - b.timestamp);

    // Calculate average DAU from daily data (last 30 days)
    const avgDailyActiveUsers = dailyData && dailyData.length > 0
      ? dailyData.reduce((sum, day) => sum + day.activeUsers, 0) / dailyData.length
      : 0;

    const uniqueAccountsInWeek = new Set(
      allTransactions.filter(tx => tx.timestamp >= oneWeekAgo).map(tx => tx.accountId)
    ).size;

    const uniqueAccountsInMonth = new Set(
      allTransactions.filter(tx => tx.timestamp >= oneMonthAgo).map(tx => tx.accountId)
    ).size;

    // Calculate other metrics
    const totalAccounts = accountData.length;
    const totalVolume = accountData.reduce((sum, acc) => sum + Math.abs(acc.change), 0);
    const totalTransactions = accountData.reduce((sum, acc) => sum + acc.transaction_count, 0);
    const avgTransactionSize = totalTransactions > 0 ? totalVolume / totalTransactions : 0;
    
    // Repeat customers (accounts with 2+ transactions)
    const repeatCustomers = accountData.filter(acc => acc.transaction_count >= 2).length;
    
    // Average transactions per account
    const avgTransactionsPerAccount = totalAccounts > 0 ? totalTransactions / totalAccounts : 0;
    
    // Calculate average unique clients per account
    let totalUniqueClients = 0;
    accountData.forEach(account => {
      const uniqueClients = new Set();
      account.transactions.forEach(tx => {
        tx.usdc_transfers.forEach(transfer => {
          // Find the sender (negative amount) who is not the account itself
          if (transfer.account !== account.account && transfer.amount < 0) {
            uniqueClients.add(transfer.account);
          }
        });
      });
      totalUniqueClients += uniqueClients.size;
    });
    const avgUniqueClientsPerAccount = totalAccounts > 0 ? totalUniqueClients / totalAccounts : 0;

    // Revenue metrics (incoming payments)
    const totalRevenue = accountData.reduce((sum, acc) => {
      const incomingAmount = acc.transactions.reduce((txSum, tx) => {
        const incoming = tx.usdc_transfers
          .filter(t => t.account === acc.account && t.amount > 0)
          .reduce((s, t) => s + t.amount, 0);
        return txSum + incoming;
      }, 0);
      return sum + incomingAmount;
    }, 0);

    const avgRevenuePerAccount = totalAccounts > 0 ? totalRevenue / totalAccounts : 0;

    setStats({
      totalAccounts,
      totalVolume,
      totalTransactions,
      avgTransactionSize,
      avgDailyActiveUsers,
      weeklyActiveUsers: uniqueAccountsInWeek,
      monthlyActiveUsers: uniqueAccountsInMonth,
      repeatCustomers,
      avgTransactionsPerAccount,
      avgUniqueClientsPerAccount,
      totalRevenue,
      avgRevenuePerAccount
    });
  };

  const calculateTimeSeriesData = (accountData) => {
    // Collect all transactions
    let allTransactions = [];
    accountData.forEach(account => {
      account.transactions.forEach(tx => {
        const timestamp = parseFloat(tx.consensus_timestamp);
        const txVolume = tx.usdc_transfers
          .filter(transfer => transfer.account === account.account && transfer.amount > 0)
          .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
        allTransactions.push({
          accountId: account.account,
          timestamp,
          volume: txVolume,
          date: new Date(timestamp * 1000)
        });
      });
    });

    // Group by day
    const dailyData = {};
    allTransactions.forEach(tx => {
      const dateKey = tx.date.toISOString().split('T')[0];
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          volume: 0,
          transactions: 0,
          uniqueAccounts: new Set()
        };
      }
      dailyData[dateKey].volume += tx.volume;
      dailyData[dateKey].transactions += 1;
      dailyData[dateKey].uniqueAccounts.add(tx.accountId);
    });

    // Convert to array and sort
    const dailyArray = Object.values(dailyData)
      .map(day => ({
        date: day.date,
        volume: day.volume / 1000000, // Convert to USDC (6 decimals)
        transactions: day.transactions,
        activeUsers: day.uniqueAccounts.size
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Return full daily array for calculating avg DAU (all days in tx interval)
    const returnData = dailyArray;
    
    // Take last 30 days for the chart
    const last30Days = dailyArray.slice(-30);
    setDailyStats(last30Days);

    // Calculate weekly data for trends
    const weeklyData = {};
    allTransactions.forEach(tx => {
      const weekStart = new Date(tx.date);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {
          week: weekKey,
          volume: 0,
          transactions: 0,
          uniqueAccounts: new Set()
        };
      }
      weeklyData[weekKey].volume += tx.volume;
      weeklyData[weekKey].transactions += 1;
      weeklyData[weekKey].uniqueAccounts.add(tx.accountId);
    });

    const weeklyArray = Object.values(weeklyData)
      .map(week => ({
        week: new Date(week.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        volume: week.volume / 1000000, // Convert to USDC (6 decimals)
        transactions: week.transactions,
        activeUsers: week.uniqueAccounts.size
      }))
      .sort((a, b) => new Date(a.week) - new Date(b.week))
      .slice(-12); // Last 12 weeks

    setTimeSeriesData(weeklyArray);
    
    return returnData;
  };

  useEffect(() => {
    fetch('/data/biweekly_sync.json')
      .then(res => res.json())
      .then(accountData => {
        setData(accountData);
        const dailyData = calculateTimeSeriesData(accountData);
        calculateStats(accountData, dailyData);
        setLoading(false);
        
        // Fetch transactions for each account
        fetchTransactionsForAccounts(accountData);
      })
      .catch(err => {
        console.error('Error loading data:', err);
        setLoading(false);
      });
  }, []);

  const formatUSDC = (amount) => {
    // USDC uses 6 decimals on Hedera
    const usdc = amount / 1000000;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(usdc);
  };

  // eslint-disable-next-line no-unused-vars
  const formatUSDCShort = (amount) => {
    // USDC uses 6 decimals on Hedera
    const usdc = amount / 1000000;
    if (usdc >= 1000000) {
      return `$${(usdc / 1000000).toFixed(1)}M`;
    } else if (usdc >= 1000) {
      return `$${(usdc / 1000).toFixed(1)}K`;
    }
    return `$${usdc.toFixed(0)}`;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
  };

  const formatDecimal = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(num);
  };

  const getExplorerLink = (accountId) => {
    return `https://hashscan.io/mainnet/account/${accountId}`;
  };

  // Get top 10 accounts by volume
  const topAccounts = [...data]
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 10);

  // Prepare chart data for top accounts
  const chartData = topAccounts.map(acc => ({
    account: acc.account.slice(-6),
    volume: Math.abs(acc.change) / 1000000, // Convert to USDC (6 decimals)
    transactions: acc.transaction_count
  }));

  // Distribution data by transaction frequency
  const frequencyDistribution = [
    { name: 'Power Users (10+)', value: data.filter(a => a.transaction_count >= 10).length, color: '#8b5cf6' },
    { name: 'Regular (5-9)', value: data.filter(a => a.transaction_count >= 5 && a.transaction_count < 10).length, color: '#3b82f6' },
    { name: 'Occasional (2-4)', value: data.filter(a => a.transaction_count >= 2 && a.transaction_count < 5).length, color: '#10b981' },
    { name: 'One-time (1)', value: data.filter(a => a.transaction_count === 1).length, color: '#f59e0b' }
  ];

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

  if (loading) {
  return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Hashfast Analytics...</p>
      </div>
    );
  }

  const retentionRate = stats.totalAccounts > 0 ? (stats.repeatCustomers / stats.totalAccounts) * 100 : 0;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src={logo} alt="Hashfast" className="logo-image" />
            <p className="tagline">Public Analytics Dashboard</p>
          </div>
          <div className="header-stats">
            <span className="live-indicator">● Live</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h2>Platform Metrics & Analytics</h2>
          <p>Real-time insights into USDC payment link transactions for businesses, creators & freelancers</p>
        </section>

        {/* Primary Metrics */}
        <section className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#f3e8ff' }}>
              <Users size={24} color="#8b5cf6" />
            </div>
            <div className="metric-content">
              <h3>Total Accounts</h3>
              <p className="metric-value">{formatNumber(stats.totalAccounts)}</p>
              <span className="metric-label">Businesses & creators receiving payments</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#dbeafe' }}>
              <DollarSign size={24} color="#3b82f6" />
            </div>
            <div className="metric-content">
              <h3>Total Revenue</h3>
              <p className="metric-value">{formatUSDC(stats.totalRevenue)}</p>
              <span className="metric-label">Cumulative USDC received</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#d1fae5' }}>
              <Activity size={24} color="#10b981" />
            </div>
            <div className="metric-content">
              <h3>Total Transactions</h3>
              <p className="metric-value">{formatNumber(stats.totalTransactions)}</p>
              <span className="metric-label">Payment link transactions</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#fef3c7' }}>
              <TrendingUp size={24} color="#f59e0b" />
            </div>
            <div className="metric-content">
              <h3>Avg Payment</h3>
              <p className="metric-value">{formatUSDC(stats.avgTransactionSize)}</p>
              <span className="metric-label">Average payment size</span>
            </div>
          </div>
        </section>

        {/* User Activity Metrics */}
        <section className="section-header">
          <h2>User Activity & Engagement</h2>
          <p>Track active users and engagement patterns over time</p>
        </section>

        <section className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#fce7f3' }}>
              <Clock size={24} color="#ec4899" />
            </div>
            <div className="metric-content">
              <h3>Avg Daily Active Users</h3>
              <p className="metric-value">{formatDecimal(stats.avgDailyActiveUsers)}</p>
              <span className="metric-label">Average daily active accounts (all time)</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#e0e7ff' }}>
              <Calendar size={24} color="#6366f1" />
            </div>
            <div className="metric-content">
              <h3>Weekly Active Users</h3>
              <p className="metric-value">{formatNumber(stats.weeklyActiveUsers)}</p>
              <span className="metric-label">Accounts active in last 7 days</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#fef3c7' }}>
              <Calendar size={24} color="#f59e0b" />
            </div>
            <div className="metric-content">
              <h3>Monthly Active Users</h3>
              <p className="metric-value">{formatNumber(stats.monthlyActiveUsers)}</p>
              <span className="metric-label">Accounts active in last 30 days</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#d1fae5' }}>
              <Repeat size={24} color="#10b981" />
            </div>
            <div className="metric-content">
              <h3>Repeat Customers</h3>
              <p className="metric-value">{formatNumber(stats.repeatCustomers)}</p>
              <span className="metric-label">{retentionRate.toFixed(1)}% retention rate</span>
            </div>
          </div>
        </section>

        {/* Business Metrics */}
        <section className="section-header">
          <h2>Business Performance</h2>
          <p>Key metrics for creator and freelancer success</p>
        </section>

        <section className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#f3e8ff' }}>
              <DollarSign size={24} color="#8b5cf6" />
            </div>
            <div className="metric-content">
              <h3>Avg Revenue/Account</h3>
              <p className="metric-value">{formatUSDC(stats.avgRevenuePerAccount)}</p>
              <span className="metric-label">Average earnings per creator</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#dbeafe' }}>
              <Activity size={24} color="#3b82f6" />
            </div>
            <div className="metric-content">
              <h3>Avg Payments/Account</h3>
              <p className="metric-value">{formatDecimal(stats.avgTransactionsPerAccount)}</p>
              <span className="metric-label">Payment frequency per account</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#d1fae5' }}>
              <Users size={24} color="#10b981" />
            </div>
            <div className="metric-content">
              <h3>Avg Unique Clients</h3>
              <p className="metric-value">{formatDecimal(stats.avgUniqueClientsPerAccount)}</p>
              <span className="metric-label">Average paying clients per account</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: '#fef3c7' }}>
              <Zap size={24} color="#f59e0b" />
            </div>
            <div className="metric-content">
              <h3>Active Rate</h3>
              <p className="metric-value">{((stats.monthlyActiveUsers / stats.totalAccounts) * 100).toFixed(1)}%</p>
              <span className="metric-label">Monthly active vs total accounts</span>
            </div>
          </div>
        </section>

        {/* Time Series Charts */}
        <section className="charts-section">
          <div className="chart-card large">
            <h3>Weekly Transaction Volume & Activity Trends</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value, name) => {
                      if (name === 'volume') return [`$${value.toLocaleString()}`, 'Volume'];
                      if (name === 'activeUsers') return [value, 'Active Users'];
                      return [value, name];
                    }}
                  />
                  <Area yAxisId="left" type="monotone" dataKey="volume" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorVolume)" />
                  <Area yAxisId="right" type="monotone" dataKey="activeUsers" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3>Top 10 Accounts by Volume</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="account" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Volume']}
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="volume" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3>User Engagement Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={frequencyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {frequencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Top Accounts Table */}
        <section className="table-section">
          <h3>Top Performing Accounts</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Account ID</th>
                  <th>Total Revenue</th>
                  <th>Payments</th>
                  <th>Avg Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {topAccounts.map((account, idx) => {
                  const avgPayment = account.transaction_count > 0 ? Math.abs(account.change) / account.transaction_count : 0;
                  const isRepeat = account.transaction_count >= 2;
                  return (
                    <tr key={account.account}>
                      <td>
                        <span className="rank-badge">#{idx + 1}</span>
                      </td>
                      <td className="account-id">
                        <a 
                          href={getExplorerLink(account.account)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="account-link"
                        >
                          {account.account}
                        </a>
                      </td>
                      <td className="volume">{formatUSDC(Math.abs(account.change))}</td>
                      <td>{formatNumber(account.transaction_count)}</td>
                      <td>{formatUSDC(avgPayment)}</td>
                      <td>
                        <span className={`status-badge ${isRepeat ? 'active' : 'new'}`}>
                          {isRepeat ? '🔥 Repeat' : '⭐ New'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Hashfast Analytics Dashboard • Powered by Hedera Network • Real-time USDC payment tracking</p>
      </footer>
      </div>
  );
}

export default App;
