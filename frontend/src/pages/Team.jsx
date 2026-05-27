import { useState } from 'react';
import { Users, Mail, Phone } from 'lucide-react';

function Team() {
  const [filterRole, setFilterRole] = useState('All');
  const teamMembers = [
    { id: 1, name: "Ananya Sharma", role: "Sales Director", email: "ananya.sharma@healthsales.com", phone: "+91 98765 12340", avatar: "AS" },
    { id: 2, name: "Rahul Mehta", role: "Account Executive", email: "rahul.mehta@healthsales.com", phone: "+91 98765 23451", avatar: "RM" },
    { id: 3, name: "Priya Nair", role: "Product Specialist", email: "priya.nair@healthsales.com", phone: "+91 98765 34562", avatar: "PN" },
    { id: 4, name: "Arjun Reddy", role: "Customer Success", email: "arjun.reddy@healthsales.com", phone: "+91 98765 45673", avatar: "AR" }
  ];

  const filteredMembers = filterRole === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.role === filterRole);

  return (
    <>
      <header className="header animate-fade-in">
        <div className="header-title">
          <h1>Team Members</h1>
          <p>Manage your sales team and assign territories.</p>
        </div>
        <div className="header-actions">
          <div className="client-avatar" style={{ borderRadius: '50%' }}>JD</div>
        </div>
      </header>

      <div className="glass-panel section-card animate-fade-in delay-100" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Users size={20} /> Sales Team
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['All', 'Sales Director', 'Account Executive', 'Product Specialist', 'Customer Success'].map(role => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${filterRole === role ? 'var(--primary)' : 'var(--border)'}`,
                  background: filterRole === role ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  color: filterRole === role ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: filterRole === role ? '600' : '500',
                  transition: 'all 0.2s ease'
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {filteredMembers.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredMembers.map((member, index) => (
              <div key={member.id} className={`glass-panel stat-card animate-fade-in delay-${(index % 4) * 100}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="client-avatar" style={{ width: '56px', height: '56px', fontSize: '20px', background: 'var(--primary)', color: 'white' }}>
                    {member.avatar}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', margin: '0 0 4px 0' }}>{member.name}</h3>
                    <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '500' }}>{member.role}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '14px', marginTop: '20px' }}>
                  <a 
                    href={`mailto:${member.email}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s ease', cursor: 'pointer' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'inherit'; }}
                  >
                    <Mail size={16} color="var(--primary)" />
                    <span>{member.email}</span>
                  </a>
                  <a 
                    href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s ease', cursor: 'pointer' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'inherit'; }}
                  >
                    <Phone size={16} color="var(--primary)" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No team members found for the selected role.
          </div>
        )}
      </div>
    </>
  );
}

export default Team;
