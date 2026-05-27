import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  Building,
  DollarSign
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const API_BASE = 'http://localhost:5000/api';

const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes, clientsRes] = await Promise.all([
          fetch(`${API_BASE}/dashboard/stats`),
          fetch(`${API_BASE}/orders`),
          fetch(`${API_BASE}/clients`)
        ]);
        
        const statsData = await statsRes.json();
        const ordersData = await ordersRes.json();
        const clientsData = await clientsRes.json();

        setStats(statsData);
        setOrders(ordersData);
        setClients(clientsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'processing': return 'status-processing';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <>
      <header className="header animate-fade-in">
        <div className="header-title">
          <h1>Overview</h1>
          <p>Welcome back! Here's your sales performance today.</p>
        </div>
        <div className="header-actions">
          <div 
            className="client-avatar" 
            style={{ borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.2s' }} 
            onClick={() => navigate('/settings')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            title="Go to Settings"
          >
            JD
          </div>
        </div>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading dashboard data...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className={`glass-panel stat-card animate-fade-in delay-${(index % 4) * 100}`}>
                <div className="stat-header">
                  <span>{stat.title}</span>
                  {stat.title.includes('Revenue') ? <DollarSign size={16} /> : <Activity size={16} />}
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className={`stat-trend ${stat.isPositive ? 'trend-up' : 'trend-down'}`}>
                  {stat.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.trend} from last month
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="dashboard-grid">
            <div className="glass-panel section-card animate-fade-in delay-200">
              <h2><Activity size={20} /> Revenue Overview</h2>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel section-card animate-fade-in delay-300">
              <h2><Building size={20} /> Top Clients</h2>
              <div className="client-list">
                {clients.map(client => (
                  <div 
                    key={client.id} 
                    className="client-item"
                    onClick={() => navigate('/hospitals')}
                    style={{ cursor: 'pointer', transition: 'background 0.2s', borderRadius: '8px', padding: '8px' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    title="View in Hospitals"
                  >
                    <div className="client-avatar">
                      {client.name.charAt(0)}
                    </div>
                    <div className="client-info">
                      <h3>{client.name}</h3>
                      <p>{client.contact} • {client.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel section-card animate-fade-in delay-200" style={{ gridColumn: '1 / -1' }}>
              <h2><ShoppingCart size={20} /> Recent Orders</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Hospital</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr 
                        key={order.id}
                        onClick={() => navigate('/orders')}
                        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        title="View in Orders"
                      >
                        <td><strong>{order.id}</strong></td>
                        <td>{order.hospital}</td>
                        <td>{order.product}</td>
                        <td>{order.date}</td>
                        <td>{order.amount}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
