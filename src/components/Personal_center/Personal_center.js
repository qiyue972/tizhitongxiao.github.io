import React, { useState } from'react';
import './Personal_center.css';
import { Link } from'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import ChangeAccount from './changeAccount/changeAccount'; 
import MoxibustionHealthModal from './Moxibustion_Health/Moxibustion_Health'; 
import QuestionDetails from './Question_Details/Question_Details'; 
import { useLocation } from'react-router-dom';
import UsernameModification from './Username_modification/Username_modification';
import ContactModification from './Contact_Modification/Contact_Modification';
import MailboxModification from './Mailbox_Modification/Mailbox_Modification';
import PasswordChange from './Password_Change/Password_Change'; // 引入修改密码组件

const PersonalCenter = () => {
    const phoneNumber = '18010582144';
    const userRole = phoneNumber === '18010582144'? '超级管理员' : '普通用户';
    const [userData, setUserData] = useState({
        basicInfo: {
            username: 'user',
            phone: '188****8888',
            email: 'a****@126.com',
            registerDate: '20xx-xx-xx' 
        },
        records: [
            { id: '001', type: '湿热体质', time: 'xx月xx日' },
            { id: '002', type: 'XX体质', time: 'xx月xx日' },
            { id: '003', type: 'XX体质', time: 'xx月xx日' },
            { id: '004', type: 'XX体质', time: 'xx月xx日' }
        ],
        knowledge: [
            { 
                id: 'k001',
                points: ['关元穴', '足三里'],
                advice: '适量食用祛湿健脾的食物',
                questionnaireId: '001'
            },
            { id: 'k002', questionnaireId: '002', content: '穴位\n养生知识' },
            { id: 'k003', questionnaireId: '003', content: '穴位\n养生知识' },
            { id: 'k004', questionnaireId: '004', content: '穴位\n养生知识' }
        ]
    });
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [isChangeAccountModalVisible, setIsChangeAccountModalVisible] = useState(false); 
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false); // 添加修改密码弹出框的显示状态

    const showMoxibustionModal = () => {
        setIsModalVisible(true);
    };
    const showChangeAccountModal = () => {
        setIsChangeAccountModalVisible(true);
    };
    const showQuestionDetailsModal = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };
    const handleMoxibustionModalClose = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };
    const handleChangeAccountModalClose = () => {
        setIsChangeAccountModalVisible(false);
    };
    const handleUsernameSave = (newUsername) => {
        setUserData(prevData => ({
           ...prevData,
            basicInfo: {
               ...prevData.basicInfo,
                username: newUsername
            }
        }));
    };
    const handlePhoneSave = (newPhone) => {
        setUserData(prevData => ({
           ...prevData,
            basicInfo: {
               ...prevData.basicInfo,
                phone: newPhone
            }
        }));
    };
    const handleEmailSave = (newEmail) => {
        setUserData(prevData => ({
           ...prevData,
            basicInfo: {
               ...prevData.basicInfo,
                email: newEmail
            }
        }));
    };
    const handlePasswordModalOpen = () => {
        setIsPasswordModalVisible(true);
    };
    const handlePasswordModalClose = () => {
        setIsPasswordModalVisible(false);
    };

    const location = useLocation();
    const isActive = location.pathname === '/personal-center';

    return (
        <div className={`page-container ${isModalVisible || isChangeAccountModalVisible || isPasswordModalVisible? 'show-modal' : ''}`}>
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/physical-fitness-assessment" className="nav-link">体质评估</Link>
                    <Link to="/knowledge-recommendation" className="nav-link">知识推荐</Link>
                    <Link to="/data-management" className="nav-link">数据管理</Link>
                    <Link to="/knowledge-graph-management" className="nav-link">知识图谱管理</Link>
                    <Link to="/personal-center" className={`nav-link ${isActive? 'active' : ''}`}>个人中心</Link>
                </div>
                <div className="user-info">
                    <span>身份: {userRole}</span>
                    <div className="avatar">
                        <img src="https://via.placeholder.com/50" alt="用户头像" />
                    </div>
                </div>
            </nav>
            <div className="main-layout">
                <div className="basic-info-panel">
                    <h2 className="panel-title">基本信息</h2>
                    <div className="avatar-section">
                        <div className="user-avatar">
                            <img src="https://via.placeholder.com/100" alt="用户头像" />
                        </div>
                    </div>
                    <div className="info-list">
                        <UsernameModification 
                            username={userData.basicInfo.username} 
                            onSave={handleUsernameSave}
                        />
                        <ContactModification 
                            phone={userData.basicInfo.phone} 
                            onSave={handlePhoneSave}
                        />
                        <MailboxModification 
                            email={userData.basicInfo.email} 
                            onSave={handleEmailSave}
                        />
                        <div className="info-item">
                            <label>角色</label>
                            <div>{userRole}</div>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="text-button" onClick={handlePasswordModalOpen}>修改密码</button> {/* 绑定点击事件 */}
                        <button className="text-button" onClick={showChangeAccountModal}>切换账号</button>
                        <div className="register-date">
                            注册于 {userData.basicInfo.registerDate}
                        </div>
                    </div>
                </div>
                <div className="record-panel">
                    <h2 className="panel-title">问卷记录</h2>
                    <div className="record-list">
                        {userData.records.map(record => (
                            <div key={record.id} className="record-item">
                                <div className="record-header">
                                    <h3>{record.type}</h3>
                                    <span className="status-tag">无</span>
                                </div>
                                <div className="record-meta">
                                    <span>问卷编号：{record.id}</span>
                                    <span>填写时间：{record.time}</span>
                                </div>
                                <button 
                                    className="primary-button"
                                    onClick={() => showQuestionDetailsModal(record)}
                                >
                                    查看详情
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="knowledge-panel">
                    <h2 className="panel-title">艾灸穴位与养生知识</h2>
                    <div className="knowledge-grid">
                        {userData.knowledge.map(item => (
                            <div key={item.id} className="knowledge-item">
                                <div className="questionnaire-id">
                                    对应问卷：{item.questionnaireId}
                                </div>
                                {item.points? (
                                    <>
                                        <div className="acupoints">
                                            {item.points.map(point => (
                                                <div key={point} className="acupoint-tag">
                                                    {point.split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="advice">
                                            {item.advice}
                                        </div>
                                    </>
                                ) : (
                                    <div className="content">
                                        <p>{item.content.split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}</p>
                                    </div>
                                )}
                                <button 
                                    className="primary-button"
                                    onClick={showMoxibustionModal}
                                >
                                    查看详情
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalVisible && selectedRecord && <QuestionDetails onClose={handleMoxibustionModalClose} />}
            {isModalVisible &&!selectedRecord && <MoxibustionHealthModal onClose={handleMoxibustionModalClose} />}
            {isChangeAccountModalVisible && <ChangeAccount onClose={handleChangeAccountModalClose} />}
            {isPasswordModalVisible && <PasswordChange onClose={handlePasswordModalClose} />} {/* 渲染修改密码组件 */}
        </div>
    );
};
export default PersonalCenter;