import React, { useState } from 'react';
import './Physical_fitness_assessment.css';
import { Link } from 'react-router-dom';
import Questionnaire from './Questionnaire';
import HistoryRecords from './HistoryRecords';

const PhysicalFitnessAssessment = () => {
    // 模拟用户身份判断
    const phoneNumber = '18010582144';
    const userRole = phoneNumber === '18010582144' ? '超级管理员' : '普通用户';
    
    // 新增状态管理
    const [activeTab, setActiveTab] = useState('questionnaire');
    const [records, setRecords] = useState([]);

    // 保存问卷记录
    const handleSaveRecord = (record) => {
        setRecords([...records, record]);
        setActiveTab('history');
    };

    // 删除历史记录
    const handleDeleteRecord = (index) => {
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
    };

    return (
        <div className="page-container">
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/physical-fitness-assessment" className="nav-link active">体质评估</Link>
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
            
            <div className="content">
                <div className="assessment-container">
                    {/* 新增的体质评估功能导航 */}
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'questionnaire' ? 'active' : ''}`}
                            onClick={() => setActiveTab('questionnaire')}
                        >
                            体质问卷
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            历史记录
                        </button>
                    </div>
                    
                    {/* 内容区域 */}
                    <div className="tab-content">
                        {activeTab === 'questionnaire' ? (
                            <Questionnaire onSaveRecord={handleSaveRecord} />
                        ) : (
                            <HistoryRecords 
                                records={records} 
                                onDelete={handleDeleteRecord} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhysicalFitnessAssessment;