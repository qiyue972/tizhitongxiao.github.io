import React, { useState } from'react';
import './changeAccount.css';

const ChangeAccount = ({ onClose }) => {
    const [showVerificationCodeLogin, setShowVerificationCodeLogin] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleToggleLoginMethod = () => {
        setShowVerificationCodeLogin(!showVerificationCodeLogin);
    };

    const handleGetVerificationCode = () => {
        // 这里应该添加获取验证码的逻辑，目前只是简单提示
        alert('获取验证码功能暂未实现');
    };

    const handleLogin = () => {
        if (showVerificationCodeLogin) {
            // 验证码登录逻辑，目前只是简单提示
            if (phoneNumber && verificationCode) {
                alert('验证码登录成功');
            } else {
                alert('请输入手机号和验证码');
            }
        } else {
            // 账号密码登录逻辑，目前只是简单提示
            alert('账号密码登录功能暂未实现');
        }
    };

    return (
        <div className="change-account-modal">
            <h2 className="modal-title">切换账号</h2>
            {!showVerificationCodeLogin && (
                <>
                    <input
                        type="text"
                        placeholder="账号名/邮箱/手机号"
                        className="account-input"
                    />
                    <input
                        type="password"
                        placeholder="请输入密码"
                        className="password-input"
                    />
                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        登录
                    </button>
                    <div className="login-method-links">
                        <span
                            className="sms-login-link"
                            onClick={handleToggleLoginMethod}
                        >
                            短信验证码登录
                        </span>
                        <button
                            className="close-btn"
                            onClick={onClose}
                        >
                            关闭
                        </button>
                    </div>
                </>
            )}
            {showVerificationCodeLogin && (
                <>
                    <input
                        type="text"
                        placeholder="请输入手机号"
                        className="account-input"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <div className="verification-code-input">
                        <input
                        type="text"
                        placeholder="输入获取的短信验证码"
                        className="verification-code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button
                        className="get-verification-code-btn"
                        onClick={handleGetVerificationCode}
                    >
                        获取验证码
                    </button>
                    </div>
                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        登录
                    </button>
                    <div className="login-method-links">
                        <span
                            className="account-password-login-link"
                            onClick={handleToggleLoginMethod}
                        >
                            账号密码登录
                        </span>
                        <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        关闭
                    </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChangeAccount;