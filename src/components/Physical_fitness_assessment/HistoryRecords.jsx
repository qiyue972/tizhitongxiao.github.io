// src/components/Physical_fitness_assessment/HistoryRecords.jsx
import React from 'react';
import { format } from 'date-fns';
import './HistoryRecords.css';

const HistoryRecords = ({ records, onDelete }) => {
  return (
    <div className="history-container">
      <div className="history-header">
        <h1 className="history-title">历史评估记录</h1>
        <div className="history-summary">
          <span>总记录数: {records.length}</span>
        </div>
      </div>
      
      {records.length === 0 ? (
        <div className="empty-state">
          <img src="/images/empty-records.svg" alt="无记录" className="empty-image" />
          <p className="empty-message">暂无历史评估记录</p>
          <p className="empty-hint">完成体质评估后将在此显示历史记录</p>
        </div>
      ) : (
        <div className="records-grid">
          {records.map((record, index) => (
            <div key={index} className="record-card">
              <div className="card-header">
                <div className="user-info">
                  <span className="user-name">{record.formData.name}</span>
                  <span className="record-date">
                    {format(new Date(record.date), 'yyyy-MM-dd HH:mm')}
                  </span>
                </div>
                <div className="card-actions">
                  <button 
                    onClick={() => onDelete(index)}
                    className="delete-btn"
                    aria-label="删除记录"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="card-body">
                <div className="constitution-info">
                  <div className="constitution-item primary">
                    <span className="label">主要体质:</span>
                    <span className="value">{record.primaryType}</span>
                  </div>
                  {record.secondaryType !== '无' && (
                    <div className="constitution-item secondary">
                      <span className="label">次要体质:</span>
                      <span className="value">{record.secondaryType}</span>
                    </div>
                  )}
                </div>
                
                <div className="symptoms-section">
                  <h4 className="section-title">症状表现</h4>
                  <p className="symptoms-text">{record.symptoms}</p>
                </div>
                
                <div className="advice-section">
                  <h4 className="section-title">调理建议</h4>
                  <p className="advice-text">{record.advice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryRecords;