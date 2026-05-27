import { useState, useEffect } from 'react';
import { Building, MapPin, Phone, Search, X, Mail, Calendar, FileText, DollarSign, ShoppingCart } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

function Hospitals() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE}/clients/${selectedHospital.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      if (res.ok) {
        const updatedClient = await res.json();
        setSelectedHospital(updatedClient);
        setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to save client", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientsRes = await fetch(`${API_BASE}/clients`);
        const clientsData = await clientsRes.json();
        setClients(clientsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="header animate-fade-in">
        <div className="header-title">
          <h1>Hospitals & Clinics</h1>
          <p>Manage your healthcare clients and partner hospitals.</p>
        </div>
        <div className="header-actions">
          <div className="client-avatar" style={{ borderRadius: '50%' }}>JD</div>
        </div>
      </header>

      <div className="glass-panel section-card animate-fade-in delay-100" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2><Building size={20} /> Client Directory</h2>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search hospitals..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading hospitals...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredClients.length > 0 ? filteredClients.map((client, index) => (
              <div key={client.id} className={`glass-panel stat-card animate-fade-in delay-${(index % 4) * 100}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="client-avatar" style={{ width: '48px', height: '48px', fontSize: '20px' }}>
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', margin: '0 0 4px 0' }}>{client.name}</h3>
                    <span className="status-badge status-delivered" style={{ fontSize: '10px' }}>{client.status || 'Active Partner'}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={16} />
                    <span>{client.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} />
                    <span>Contact: {client.contact}</span>
                  </div>
                </div>
                
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                  <button 
                    onClick={() => {
                      setSelectedHospital(client);
                      setEditFormData(client);
                      setIsEditing(false);
                    }}
                    style={{ 
                      padding: '8px 16px', 
                      background: 'rgba(59, 130, 246, 0.1)', 
                      color: 'var(--primary)', 
                      border: '1px solid var(--primary)', 
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'var(--primary)';
                      e.target.style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                      e.target.style.color = 'var(--primary)';
                    }}
                  >View Details</button>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No hospitals found matching your search.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel animate-fade-in" style={{
            width: '100%',
            maxWidth: '600px',
            background: 'rgba(30, 41, 59, 0.95)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div className="client-avatar" style={{ width: '64px', height: '64px', fontSize: '28px' }}>
                  {selectedHospital.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', margin: '0 0 8px 0' }}>{selectedHospital.name}</h2>
                  <span className="status-badge status-delivered">{selectedHospital.status || 'Active Partner'}</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedHospital(null);
                  setIsEditing(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {isEditing ? (
                <>
                  <div>
                    <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Hospital Name</h4>
                    <input 
                      type="text" 
                      name="name"
                      value={editFormData.name || ''} 
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none', marginBottom: '16px' }}
                    />
                    <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>About / Description</h4>
                    <textarea 
                      name="description"
                      value={editFormData.description || ''} 
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none', minHeight: '80px', resize: 'vertical' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Location</h4>
                      <input 
                        type="text" 
                        name="location"
                        value={editFormData.location || ''} 
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Primary Contact</h4>
                      <input 
                        type="text" 
                        name="contact"
                        value={editFormData.contact || ''} 
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Email</h4>
                      <input 
                        type="email" 
                        name="email"
                        value={editFormData.email || ''} 
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Established</h4>
                      <input 
                        type="text" 
                        name="established"
                        value={editFormData.established || ''} 
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'var(--text-main)', outline: 'none' }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>About</h4>
                    <p style={{ lineHeight: '1.6', fontSize: '15px' }}>{selectedHospital.description || 'No description available for this client.'}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                      <MapPin size={20} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Location</div>
                        <div style={{ fontWeight: '500' }}>{selectedHospital.location}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                      <Phone size={20} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Primary Contact</div>
                        <div style={{ fontWeight: '500' }}>{selectedHospital.contact}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                      <Mail size={20} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Email</div>
                        <div style={{ fontWeight: '500' }}>{selectedHospital.email || 'N/A'}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                      <Calendar size={20} color="var(--primary)" />
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Established</div>
                        <div style={{ fontWeight: '500' }}>{selectedHospital.established || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!isEditing && (
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Performance Metrics</h4>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1, padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '8px' }}>
                        <ShoppingCart size={18} />
                        <span style={{ fontWeight: '600' }}>Total Orders</span>
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: '700' }}>{selectedHospital.totalOrders || 0}</div>
                    </div>
                    
                    <div style={{ flex: 1, padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', marginBottom: '8px' }}>
                        <DollarSign size={18} />
                        <span style={{ fontWeight: '600' }}>Total Revenue</span>
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: '700' }}>{selectedHospital.revenue || '$0'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              {isEditing ? (
                <>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditFormData(selectedHospital);
                    }}
                    style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    style={{ padding: '10px 20px', background: 'var(--success)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setSelectedHospital(null);
                      setIsEditing(false);
                    }}
                    style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => setIsEditing(true)}
                    style={{ padding: '10px 20px', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}
                  >
                    Edit Details
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hospitals;
