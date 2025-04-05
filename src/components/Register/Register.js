import React, { useState } from'react';
import { useNavigate } from'react-router-dom';
import './Register.css';

const defaultAvatar = '/images/default_avatar.png'; // 假设默认头像路径

const Register = ({ setIsLoginOrRegister }) => {
    React.useEffect(() => {
        setIsLoginOrRegister(true);
        return () => {
            setIsLoginOrRegister(false);
        };
    }, [setIsLoginOrRegister]);

    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // 处理头像文件上传
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split('/')[1];
            if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
                setAvatar(URL.createObjectURL(file));
            } else {
                setError('请上传.jpg或.png格式的图片');
                e.target.value = '';
            }
        }
    };

    // 处理昵称输入变化
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    // 处理密码输入变化
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // 处理确认密码输入变化
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // 处理电话号码输入变化
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    // 处理邮箱输入变化
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 非空验证
        if (!nickname ||!password ||!confirmPassword ||!phone ||!email) {
            setError('所有字段均为必填项');
            return;
        }

        // 昵称长度验证
        if (nickname.length < 3 || nickname.length > 15) {
            setError('用户名长度应为3 - 15个字符');
            return;
        }

        // 密码匹配验证
        if (password!== confirmPassword) {
            setError('两次输入的密码不一致');
            return;
        }

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('请输入有效的邮箱地址');
            return;
        }

        // 手机号格式验证
        const phoneRegex = /^\d{11}$/;
        if (!phoneRegex.test(phone)) {
            setError('请输入有效的11位手机号码');
            return;
        }

        try {
            // 模拟注册成功
            const finalAvatar = avatar || defaultAvatar;
            // 这里可以将 finalAvatar 发送到后端存储
            alert('注册成功！');
            // 清空表单
            setAvatar(null);
            setNickname('');
            setPassword('');
            setConfirmPassword('');
            setPhone('');
            setEmail('');
            // 跳转到登录界面
            navigate('/login');
        } catch (err) {
            setError('注册过程中出现错误，请稍后重试');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <div className="avatar-upload">
                    <label htmlFor="avatar" className="avatar-label">
                        <div className="avatar-frame">
                            <img
                                src={avatar || defaultAvatar}
                                alt="Avatar"
                                className="avatar-preview"
                            />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={handleAvatarChange}
                        className="avatar-input"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="nickname">昵称：</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
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
                <div className="input-group">
                    <label htmlFor="confirm-password">确认密码：</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">电话：</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">邮箱：</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-button">注册</button>
            </form>
        </div>
    );
};

export default Register;    