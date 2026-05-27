import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Filter } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders`);
        const data = await res.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = filterStatus === 'All' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <>
      <header className="header animate-fade-in">
        <div className="header-title">
          <h1>Orders Management</h1>
          <p>Track and manage your equipment orders and deliveries.</p>
        </div>
        <div className="header-actions">
          <div className="client-avatar" style={{ borderRadius: '50%' }}>JD</div>
        </div>
      </header>

      <div className="glass-panel section-card animate-fade-in delay-100" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingCart size={20} /> All Orders
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['All', 'Delivered', 'Processing', 'Pending'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${filterStatus === status ? 'var(--primary)' : 'var(--border)'}`,
                  background: filterStatus === status ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: filterStatus === status ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: filterStatus === status ? '600' : '500',
                  transition: 'all 0.2s ease'
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '16px 12px', fontWeight: '500' }}>Order ID</th>
                  <th style={{ padding: '16px 12px', fontWeight: '500' }}>Hospital</th>
                  <th style={{ padding: '16px 12px', fontWeight: '500' }}>Product</th>
                  <th style={{ padding: '16px 12px', fontWeight: '500' }}>Date</th>
                  <th style={{ padding: '16px 12px', fontWeight: '500' }}>Amount</th>
                  <th style={{ padding: '16px 12px', fontWeight: '500' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? filteredOrders.map((order, i) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }} className={`animate-fade-in delay-${(i % 5) * 100}`}>
                    <td style={{ padding: '16px 12px', fontWeight: '500' }}>{order.id}</td>
                    <td style={{ padding: '16px 12px' }}>{order.hospital}</td>
                    <td style={{ padding: '16px 12px' }}>{order.product}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--text-muted)' }}>{order.date}</td>
                    <td style={{ padding: '16px 12px', fontWeight: '600' }}>{order.amount}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <span className={`status-badge ${order.status === 'Delivered' ? 'status-delivered' : order.status === 'Processing' ? 'status-processing' : 'status-pending'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No orders found for the selected status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
