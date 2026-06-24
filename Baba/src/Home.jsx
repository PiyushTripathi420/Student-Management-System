import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminImg from './assets/Admin.jpeg'
const data = [
  { name: 'Sept', 2023: 210, 2024: 140 },
  { name: 'Oct', 2023: 330, 2024: 400 },
  { name: 'Nov', 2023: 150, 2024: 240 },
  { name: 'Dec', 2023: 180, 2024: 210 },
  { name: 'Jan', 2023: 220, 2024: 230 },
  { name: 'Feb', 2023: 250, 2024: 260 },
  { name: 'Mar', 2023: 270, 2024: 310 },
  { name: 'Apr', 2023: 290, 2024: 330 },
  { name: 'May', 2023: 310, 2024: 350 },
  { name: 'June', 2023: 410, 2024: 390 },
];

const Dashboard = () => { 
  const location = useLocation();
  
  return (
    <div className="app-container">
      {location.pathname !== "/students" && (
        <aside className="sidebar">
          <div className="logo">
            <span className="logo-icon">🎓</span> ACADEMIA
          </div>
          <nav className="nav-menu">
            <Link to="/" className="nav-item active">📊 Dashboard</Link>
            <Link to="/students" className="nav-item">👥 Students</Link>
            <a href="#faculty" className="nav-item">👨‍🏫 Faculty</a>
            <a href="#courses" className="nav-item">📚 Courses</a>
            <a href="#finance" className="nav-item">💰 Finance</a>
            <a href="#reports" className="nav-item">📄 Reports</a>
            <a href="#settings" className="nav-item">⚙️ Settings</a>
          </nav>
        </aside>
      )}

    
      <main className="main-content">
    
        <header className="top-navbar">
          <div className="title-section">
            <h2>— STUDENT MANAGEMENT SYSTEM</h2>
          </div>
          <div className="search-profile">
            <input type="text" placeholder="🔍 Search..." className="search-bar" />
            <div className="notifications">🔔</div>
            <div className="profile-card">
              <img src={AdminImg} alt="Admin" className="avatar" />
              <div className="profile-info">
                <span className="profile-name">Piyush Tripathi</span>
                <span className="profile-role">Admin</span>
              </div>
            </div>
          </div>
        </header>


        <h1 className="dashboard-title">Dashboard</h1>

        
        <section className="stats-grid">
          <div className="stat-card blue">
            <div className="card-header"><span>Total Students</span> 👥</div>
            <h3>14,852</h3>
            <span className="trend">+3.2%</span>
          </div>
          <div className="stat-card green">
            <div className="card-header"><span>Active Students</span> ⏱️</div>
            <h3>13,910</h3>
            <span className="trend">+2.8%</span>
          </div>
          <div className="stat-card orange">
            <div className="card-header"><span>Departments</span> 🏢</div>
            <h3>48</h3>
            <span className="subtext">12 Faculties</span>
          </div>
          <div className="stat-card purple">
            <div className="card-header"><span>Staff Members</span> 👥</div>
            <h3>785</h3>
          </div>
          <div className="stat-card teal">
            <div className="card-header"><span>Attendance Rate</span> 📈</div>
            <h3>91.4%</h3>
          </div>
        </section>

        
        <div className="content-grid">
          
          <div className="chart-card">
            <h3>STUDENT ENROLLMENT TREND (2023-2024)</h3>
            <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="2023" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2024" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="activity-card">
            <h3>RECENT ACTIVITY LOG</h3>
            <ul className="activity-list">
              <li>
                <span className="dot green-dot"></span>
                <div className="activity-details">
                  <p><strong>Martin</strong> enrolled in CS101</p>
                  <span className="time">10 mins ago</span>
                </div>
              </li>
              <li>
                <span className="dot blue-dot"></span>
                <div className="activity-details">
                  <p><strong>Vikas Dwevidi</strong> updated profile</p>
                  <span className="time">25 mins ago</span>
                </div>
              </li>
              <li>
                <span className="dot purple-dot"></span>
                <div className="activity-details">
                  <p>Grade posted: <strong>MATH201</strong></p>
                  <span className="time">38 mins ago</span>
                </div>
              </li>
              <li>
                <span className="dot orange-dot"></span>
                <div className="activity-details">
                  <p>Attendance marked for Sec-B</p>
                  <span className="time">1 hr ago</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;