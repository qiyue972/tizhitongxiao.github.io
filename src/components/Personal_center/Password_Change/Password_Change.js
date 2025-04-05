import React, { useState } from'react';
import './Password_Change.css';

const PasswordChange = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        // 简单的密码验证
        if (!oldPassword ||!newPassword ||!confirmNewPassword) {
            setError('所有字段均为必填项');
            return;
        }
        if (newPassword!== confirmNewPassword) {
            setError('新密码和确认密码不一致');
            return;
        }
        // 这里可以添加实际的修改密码逻辑，比如调用API
        console.log('旧密码:', oldPassword, '新密码:', newPassword);
        onClose();
    };

    return (
        <div className="password-change-modal">
            <h2 className="modal-title">修改密码</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="oldPassword">旧密码：</label>
                    <input 
                        type="password" 
                        id="oldPassword" 
                        value={oldPassword} 
                        onChange={handleOldPasswordChange} 
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="newPassword">新密码：</label>
                    <input 
                        type="password" 
                        id="newPassword" 
                        value={newPassword} 
                        onChange={handleNewPasswordChange} 
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmNewPassword">确认新密码：</label>
                    <input 
                        type="password" 
                        id="confirmNewPassword" 
                        value={confirmNewPassword} 
                        onChange={handleConfirmNewPasswordChange} 
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="modal-buttons">
                    <button type="button" onClick={onClose}>取消</button>
                    <button type="submit">保存</button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChange;