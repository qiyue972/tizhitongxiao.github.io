import React from'react';
import './Moxibustion_Health.css';

const MoxibustionHealthModal = ({ onClose }) => {
    const acupointNames = ['足三里', '关元穴', '解溪穴', '合谷穴'];
    return (
        <div className="moxibustion-modal-container">
            <div className="moxibustion-modal-overlay" onClick={onClose}></div>
            <div className="moxibustion-modal-content">
                {/* 关闭按钮改为button标签 */}
                <button className="moxibustion-modal-close" onClick={onClose}>关闭</button> 
                <div className="moxibustion-modal-left">
                    <h3>艾灸穴位</h3>
                    <div className="acupoint-grid">
                        {acupointNames.map((name, index) => (
                            <div key={index} className="acupoint-item">
                                <img src={require(`./${index + 1}.png`)} alt={name} className="acupoint-image" /> 
                                <p>{name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="moxibustion-modal-right">
                    <h3>养生知识</h3>
                    <div className="health-knowledge-grid">
                        <div className="knowledge-item">
                            <h4>饮食调节：四神汤</h4>
                            <p>配方：茯苓15g + 莲子15g + 芡实15g + 山药15g + 猪肚或排骨适量</p>
                            <p>做法：药材浸泡后与肉类同炖1小时，加盐调味</p>
                            <p>功效：健脾利湿，适合湿热体质腹胀、口黏、便溏者，每周2 - 3次</p>
                        </div>
                        <div className="knowledge-item">
                            <h4>家居环境：温胆汤泡脚</h4>
                            <p>配方：竹茹10g + 枳实10g + 茯苓15g + 陈皮10g + 生姜3片</p>
                            <p>用法：药材煮沸后兑温水泡脚15 - 20分钟，睡前使用</p>
                            <p>作用：缓解湿热导致的烦躁、多梦，促进下肢循环</p>
                        </div>
                        <div className="knowledge-item">
                            <h4>药物调理：二妙丸</h4>
                            <p>组成：黄柏 + 苍术 (经典基础方)</p>
                            <p>适用：湿热下注引起的关节肿痛、阴部潮湿、脚气等</p>
                            <p>注意：症状缓解即停，长期用需遵医嘱</p>
                        </div>
                        <div className="knowledge-item">
                            <h4>经络调养：阴陵泉穴</h4>
                            <p>定位：小腿内侧，胫骨内侧髁后下方凹陷处</p>
                            <p>方法：每日按压或艾灸10 - 15分钟，两侧交替</p>
                            <p>效果：促进水湿代谢，改善腹胀、水肿</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoxibustionHealthModal;