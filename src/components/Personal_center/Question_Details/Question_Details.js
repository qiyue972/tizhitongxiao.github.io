import React from'react';
import './Question_Details.css';

const Question_Details = ({ onClose }) => {
    // 模拟问卷填写结果数据
    const formData = [
        { label: '您的姓名', value: 'XX' },
        { label: '您的性别', value: 'X' },
        { label: '您的年龄', value: 'XX' },
        { label: '您的职业', value: 'XX' },
        { label: '您手脚发凉吗', value: '偶尔（有一点）' },
        { label: '您胃脘部、背部或腰膝部怕冷吗?', value: '偶尔（有一点）' },
        { label: '您受凉或吃喝(凉)的东西后容易腹泻(拉肚子)吗?', value: '经常（相当）' }
    ];

    // 模拟体质评估结果数据
    const assessmentResult = {
        mainConstitution: '平和体质',
        commonSymptoms: '身体健康，精力充沛，适应能力强',
        regulationSuggestions: '保持良好生活习惯，饮食均衡，适量运动',
        detailedScores: {
            '平和体质': { originalScore: 32, conversionScore: 75 },
            '阳虚体质': { originalScore: 6, conversionScore: 0 },
            '阴虚体质': { originalScore: 8, conversionScore: 0 },
            '气虚体质': { originalScore: 8, conversionScore: 0 },
            '痰湿体质': { originalScore: 8, conversionScore: 0 },
            '湿热体质': { originalScore: 7, conversionScore: 0 },
            '瘀血体质': { originalScore: 7, conversionScore: 0 },
            '气郁体质': { originalScore: 7, conversionScore: 0 }
        }
    };

    return (
        <div className="question-details-container">
            <div className="question-details-overlay" onClick={onClose}></div>
            <div className="question-details-content">
                {/* 关闭按钮 */}
                <button className="question-details-inner-close" onClick={onClose}>关闭</button> 
                <div className="question-details-main">
                    <div className="question-details-left" style={{ overflowY: 'auto', maxHeight: '500px' }}>
                        <h3 style={{ textAlign: 'center' }}>问卷详情</h3>
                        <div className="form-data-container">
                            {formData.map((item, index) => (
                                <div key={index} className="form-data-item">
                                    <div className="form-data-label" style={{
                                        width: '280px', 
                                        textAlign: 'right',
                                        paddingRight: '10px',
                                        fontSize: '16px'
                                    }}>
                                        {item.label}
                                    </div>
                                    <div className="form-data-value" style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '10px',
                                        background: '#fff',
                                        width: 'calc(100% - 290px)', 
                                        fontSize: '16px'
                                    }}>
                                        {item.value}
                                    </div>
                                    {/* 调整标签和值之间的间距 */}
                                    <div style={{ width: '20px' }}></div> 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="question-details-right">
                        <h3 style={{ textAlign: 'center', color: '#009688' }}>体质评估结果</h3>
                        <div className="assessment-result-container">
                            <div className="result-item">
                                <span className="result-label" style={{ fontSize: '16px' }}>主要体质类型</span>
                                <span className="result-value" style={{
                                    border: '1px solid #eee',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    background: '#f9f9f9',
                                    fontSize: '16px',
                                    minWidth: '150px'
                                }}>
                                    {assessmentResult.mainConstitution}
                                </span>
                            </div>
                            <div className="a">
                                <span className="result-label" style={{ fontSize: '16px' }}>常见症状</span>
                                <span className="result-value" style={{
                                    border: '1px solid #eee',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    background: '#f9f9f9',
                                    fontSize: '16px',
                                    minWidth: '150px'
                                }}>
                                    {assessmentResult.commonSymptoms}
                                </span>
                            </div>
                            <div className="result-item">
                                <span className="result-label" style={{ fontSize: '16px' }}>调理建议</span>
                                <span className="result-value" style={{
                                    border: '1px solid #eee',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    background: '#f9f9f9',
                                    fontSize: '16px',
                                    minWidth: '150px'
                                }}>
                                    {assessmentResult.regulationSuggestions}
                                </span>
                            </div>
                            <div className="result-item">
                                <span className="result-label" style={{ fontSize: '16px' }}>详细得分</span>
                                <div className="detailed-scores-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    {Object.entries(assessmentResult.detailedScores).map(([constitution, scores], index) => (
                                        <div key={index} className="score-item" style={{
                                            border: '1px solid #eee',
                                            borderRadius: '4px',
                                            padding: '5px 10px',
                                            background: '#f9f9f9',
                                            fontSize: '16px',
                                            minWidth: '150px'
                                        }}>
                                            <span className="constitution-label">{constitution}</span>
                                            <span className="sc">原始分: {scores.originalScore} 转化分: {scores.conversionScore}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question_Details;