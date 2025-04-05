import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userRole, phoneNumber }) => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/physical-fitness-assessment" className="nav-link">体质评估</Link>
        <Link to="/knowledge-recommendation" className="nav-link">知识推荐</Link>
        <Link to="/data-management" className="nav-link">数据管理</Link>
        <Link to="/knowledge-graph-management" className="nav-link">知识图谱管理</Link>
        <Link to="/personal-center" className="nav-link">个人中心</Link>
      </div>
      <div className="user-info">
        <span>身份: {userRole}</span>
        <div className="avatar" onClick={() => window.location.href = '/personal-center'}>
          <img src="https://via.placeholder.com/50" alt="Avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;