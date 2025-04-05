import React, { useState } from'react';
import { useNavigate } from'react-router-dom';
import './Login.css';

const Login = ({ setIsLoginOrRegister }) => {
    React.useEffect(() => {
        setIsLoginOrRegister(true);
        return () => {
            setIsLoginOrRegister(false);
        };
    }, [setIsLoginOrRegister]);

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAutoLogin, setIsAutoLogin] = useState(false); // 新增状态，用于记录是否勾选自动登录

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleAutoLoginChange = (e) => {
        setIsAutoLogin(e.target.checked); // 更新自动登录状态
    };

    const handleLogin = () => {
        // 简单的表单验证
        if (!username ||!password) {
            setError('用户名和密码不能为空');
            return;
        }

        // 模拟登录验证，只要用户名和密码不为空就视为成功
        setError('');
        // 这里可以添加实际的自动登录逻辑，比如保存登录信息到本地存储等
        if (isAutoLogin) {
            // 模拟保存登录信息，实际应用中需要更安全的处理
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }
        // 登录成功后跳转
        navigate('/physical-fitness-assessment');
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src="/images/logo.png" alt="Logo" className="logo-large" />
            </div>
            <div className="login-content" style={{ opacity: 0.9 }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <label htmlFor="username">用户名：</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">密码：</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="input-group auto-login-group">
                        <div className="auto-login-checkbox">
                            <input
                                type="checkbox"
                                id="auto-login"
                                checked={isAutoLogin}
                                onChange={handleAutoLoginChange}
                            />
                            <label htmlFor="auto-login" style={{ whiteSpace: 'nowrap' }}>自动登录</label> {/* 添加 whiteSpace: 'nowrap' 确保文字在同一行 */}
                        </div>
                        <button
                            type="button"
                            className="register-button"
                            onClick={() => navigate('/register')}
                        >
                            去注册
                        </button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="button" className="login-button" onClick={handleLogin}>登录</button>
                </form>
            </div>
        </div>
    );
};

export default Login;    