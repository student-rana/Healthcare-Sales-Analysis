import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Lock, Key } from 'lucide-react';

function Settings() {
  const [activeTab, setActiveTab] = useState('Profile Details');
  const [avatar, setAvatar] = useState('JD');
  const [saveStatus, setSaveStatus] = useState('');
  const [preferencesSaveStatus, setPreferencesSaveStatus] = useState('');
  const [passwordSaveStatus, setPasswordSaveStatus] = useState('');
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);
  const [isDropboxConnected, setIsDropboxConnected] = useState(false);
  const [googleConnecting, setGoogleConnecting] = useState(false);
  const [dropboxConnecting, setDropboxConnecting] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setAvatar(imgUrl);
    }
  };

  const handleRemovePhoto = () => {
    setAvatar('');
  };

  const handleSaveProfile = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleSavePreferences = () => {
    setPreferencesSaveStatus('Saving...');
    setTimeout(() => {
      setPreferencesSaveStatus('Saved successfully!');
      setTimeout(() => setPreferencesSaveStatus(''), 3000);
    }, 1000);
  };

  const handleUpdatePassword = () => {
    setPasswordSaveStatus('Updating...');
    setTimeout(() => {
      setPasswordSaveStatus('Password updated!');
      setTimeout(() => setPasswordSaveStatus(''), 3000);
    }, 1000);
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleToggleGoogle = () => {
    if (isGoogleConnected) {
      setIsGoogleConnected(false);
    } else {
      setGoogleConnecting(true);
      setTimeout(() => {
        setIsGoogleConnected(true);
        setGoogleConnecting(false);
      }, 1500);
    }
  };

  const handleToggleDropbox = () => {
    if (isDropboxConnected) {
      setIsDropboxConnected(false);
    } else {
      setDropboxConnecting(true);
      setTimeout(() => {
        setIsDropboxConnected(true);
        setDropboxConnecting(false);
      }, 1500);
    }
  };

  const tabs = [
    { name: 'Profile Details', icon: User },
    { name: 'Notifications', icon: Bell },
    { name: 'Security', icon: Shield },
    { name: 'Integrations', icon: Database }
  ];

  return (
    <>
      <header className="header animate-fade-in">
        <div className="header-title">
          <h1>Platform Settings</h1>
          <p>Configure your dashboard preferences and account settings.</p>
        </div>
        <div className="header-actions">
          <div className="client-avatar" style={{ borderRadius: '50%' }}>JD</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', marginTop: '20px' }} className="animate-fade-in delay-100">
        {/* Settings Sidebar */}
        <div className="glass-panel" style={{ padding: '20px', height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <div 
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    background: isActive ? 'var(--primary)' : 'transparent', 
                    color: isActive ? 'white' : 'var(--text-main)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    cursor: 'pointer', 
                    fontWeight: isActive ? '500' : 'normal',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <Icon size={18} /> {tab.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          {activeTab === 'Profile Details' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <SettingsIcon size={24} color="var(--primary)" /> Profile Configuration
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div className="client-avatar" style={{ width: '80px', height: '80px', fontSize: '32px', background: 'var(--primary)', backgroundImage: avatar && avatar.length > 2 ? `url(${avatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {(!avatar || avatar.length <= 2) ? (avatar || '?') : ''}
                  </div>
                  <div>
                    <input type="file" id="photo-upload" style={{ display: 'none' }} accept="image/*" onChange={handlePhotoChange} />
                    <button 
                      onClick={() => document.getElementById('photo-upload').click()} 
                      style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', color: 'white', borderRadius: '6px', cursor: 'pointer', marginRight: '12px', transition: 'background 0.2s' }} 
                      onMouseOver={(e) => e.target.style.background='rgba(255,255,255,0.2)'} 
                      onMouseOut={(e) => e.target.style.background='rgba(255,255,255,0.1)'}
                    >
                      Change Photo
                    </button>
                    <button 
                      onClick={handleRemovePhoto} 
                      style={{ padding: '8px 16px', background: 'transparent', border: 'none', color: 'var(--danger, #ef4444)', cursor: 'pointer', transition: 'background 0.2s', borderRadius: '6px' }} 
                      onMouseOver={(e) => e.target.style.background='rgba(239, 68, 68, 0.1)'} 
                      onMouseOut={(e) => e.target.style.background='transparent'}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>First Name</label>
                    <input type="text" defaultValue="Jane" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'white', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>Last Name</label>
                    <input type="text" defaultValue="Doe" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>Email Address</label>
                    <input type="email" defaultValue="jane.doe@healthsales.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'white', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
                  {saveStatus && <span style={{ color: saveStatus.includes('success') ? 'var(--success, #10b981)' : 'var(--text-muted)' }}>{saveStatus}</span>}
                  <button 
                    onClick={handleSaveProfile} 
                    disabled={!!saveStatus && !saveStatus.includes('success')} 
                    style={{ padding: '12px 24px', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', opacity: (!!saveStatus && !saveStatus.includes('success')) ? 0.7 : 1 }}
                  >
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <Bell size={24} color="var(--primary)" /> Notification Preferences
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>New Orders</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Get notified when a new order is placed.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>Order Deliveries</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Alerts when an order status changes to delivered.</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>Weekly Reports</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Receive a weekly summary of sales performance.</p>
                  </div>
                  <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
                {preferencesSaveStatus && <span style={{ color: preferencesSaveStatus.includes('success') ? 'var(--success, #10b981)' : 'var(--text-muted)' }}>{preferencesSaveStatus}</span>}
                <button 
                  onClick={handleSavePreferences} 
                  disabled={!!preferencesSaveStatus && !preferencesSaveStatus.includes('success')} 
                  style={{ padding: '12px 24px', background: 'var(--primary)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', opacity: (!!preferencesSaveStatus && !preferencesSaveStatus.includes('success')) ? 0.7 : 1 }}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <Shield size={24} color="var(--primary)" /> Security Settings
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Key size={18} /> Change Password</h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    <input type="password" placeholder="Current Password" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'white', outline: 'none' }} />
                    <input type="password" placeholder="New Password" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'white', outline: 'none' }} />
                    <input type="password" placeholder="Confirm New Password" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border)', color: 'white', outline: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                      <button 
                        onClick={handleUpdatePassword} 
                        disabled={!!passwordSaveStatus && !passwordSaveStatus.includes('updated')} 
                        style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', opacity: (!!passwordSaveStatus && !passwordSaveStatus.includes('updated')) ? 0.7 : 1 }}
                      >
                        Update Password
                      </button>
                      {passwordSaveStatus && <span style={{ color: passwordSaveStatus.includes('updated') ? 'var(--success, #10b981)' : 'var(--text-muted)' }}>{passwordSaveStatus}</span>}
                    </div>
                  </div>
                </div>
                
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={18} /> Two-Factor Authentication (2FA)</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>Add an extra layer of security to your account by enabling two-factor authentication.</p>
                  <button 
                    onClick={handleToggle2FA}
                    style={{ 
                      padding: '10px 20px', 
                      background: is2FAEnabled ? 'var(--success, #10b981)' : 'transparent', 
                      border: `1px solid ${is2FAEnabled ? 'var(--success, #10b981)' : 'var(--primary)'}`, 
                      color: is2FAEnabled ? 'white' : 'var(--primary)', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontWeight: '500',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Integrations' && (
            <div className="animate-fade-in">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <Database size={24} color="var(--primary)" /> Connected Integrations
              </h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>Google Workspace</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
                        {isGoogleConnected ? 'Connected for single sign-on and email sync.' : 'Not connected.'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleToggleGoogle}
                    disabled={googleConnecting}
                    style={{ 
                      padding: '8px 16px', 
                      background: isGoogleConnected ? 'rgba(255,255,255,0.1)' : 'transparent', 
                      border: isGoogleConnected ? 'none' : '1px solid var(--border)', 
                      color: isGoogleConnected ? 'white' : 'var(--text-main)', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      opacity: googleConnecting ? 0.7 : 1
                    }}
                  >
                    {googleConnecting ? 'Connecting...' : (isGoogleConnected ? 'Disconnect' : 'Connect')}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#0061FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0004 6.6L18.4004 10.2L12.0004 13.8L5.6004 10.2L12.0004 6.6ZM12.0004 0L0 6.6L12.0004 13.2L24 6.6L12.0004 0ZM12.0004 19.8L5.6004 16.2L0 19.3333L12.0004 26L24 19.3333L18.4004 16.2L12.0004 19.8ZM12.0004 13.2L5.6004 9.6L0 12.7333L12.0004 19.4L24 12.7333L18.4004 9.6L12.0004 13.2Z" fill="white"/>
                      </svg>
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>Dropbox</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
                        {isDropboxConnected ? 'Connected for file syncing.' : 'Not connected.'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleToggleDropbox}
                    disabled={dropboxConnecting}
                    style={{ 
                      padding: '8px 16px', 
                      background: isDropboxConnected ? 'rgba(255,255,255,0.1)' : 'transparent', 
                      border: isDropboxConnected ? 'none' : '1px solid var(--border)', 
                      color: isDropboxConnected ? 'white' : 'var(--text-main)', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      opacity: dropboxConnecting ? 0.7 : 1
                    }}
                  >
                    {dropboxConnecting ? 'Connecting...' : (isDropboxConnected ? 'Disconnect' : 'Connect')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;
