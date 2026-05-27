import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  Activity, 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings as SettingsIcon, 
  Building
} from 'lucide-react';
import './App.css';

// Pages
import Dashboard from './pages/Dashboard';
import Hospitals from './pages/Hospitals';
import Orders from './pages/Orders';
import Team from './pages/Team';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar animate-fade-in">
        <div className="logo-container">
          <Activity size={28} />
          <span>HealthSales</span>
        </div>
        
        <nav className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"} end>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/hospitals" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Building size={20} /> Hospitals
          </NavLink>
          <NavLink to="/orders" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <ShoppingCart size={20} /> Orders
          </NavLink>
          <NavLink to="/team" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Users size={20} /> Team
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <SettingsIcon size={20} /> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
