// src/components/Physical_fitness_assessment/ResultModal.jsx
import React from 'react';
import './ResultModal.css';

const ResultModal = ({ result, onClose, onSave }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>体质评估结果</h2>
        
        <div className="result-section">
          <h3>主要体质类型</h3>
          <div className="result-box">{result.primaryType}</div>
        </div>

        {result.secondaryType !== '无' && (
          <div className="result-section">
            <h3>次要体质倾向</h3>
            <div className="result-box">{result.secondaryType}</div>
          </div>
        )}

        <div className="result-section">
          <h3>常见症状</h3>
          <div className="result-box">{result.symptoms}</div>
        </div>

        <div className="result-section">
          <h3>调理建议</h3>
          <div className="result-box">{result.advice}</div>
        </div>

        <div className="result-section">
          <h3>详细得分</h3>
          <div className="detailed-scores">
            {Object.entries(result.detailedScores).map(([type, score]) => (
              <div key={type} className="score-row">
                <span className="score-type">{type}</span>
                <span className="score-value">原始分: {score.rawScore}</span>
                <span className="score-value">转化分: {score.transformedScore}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onSave} className="save-btn">保存记录</button>
          <button onClick={onClose} className="close-btn">关闭</button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;