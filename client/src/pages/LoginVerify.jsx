import React, { Component } from 'react';
import '../assets/login.css';
import Header from '../components/header';

class LoginVerify extends Component {
    state = {
        newPassword: '',
        confirmPassword: '',
        passwordError: '',
        checkPasswordError: '',
        isNewPasswordVisible: false,
        isConfirmPasswordVisible: false,
        token: new URLSearchParams(window.location.search).get('authToken'),
    };

    componentDidMount() {
        // 从 URL 中提取重置令牌
        const params = new URLSearchParams(window.location.search);
        const token = params.get('authToken');
        
        console.log('Full URL:', window.location.href); // 打印完整的 URL
        console.log('Extracted Token:', token); // 打印提取到的令牌
    
        if (token) {
            this.setState({ token });
        } else {
            console.error('Token is missing from the URL');
        }
    }
    
    resetPassword = async () => {
        const { newPassword, confirmPassword, token } = this.state;
    
        if (newPassword !== confirmPassword) {
            this.setState({ checkPasswordError: '<i className="bi bi-asterisk"></i> 密碼不吻合' });
            return;
        }
    
        // 打印请求数据以进行调试
        console.log('Sending request with:', { newSecret: newPassword, token });
    
        // 检查 token 是否有效
        if (!token) {
            console.error('Token is missing');
            this.setState({ passwordError: '无效或过期的重置令牌' });
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/riverflow/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newSecret: newPassword }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData.message);
                this.setState({ passwordError: errorData.message || '重置密碼時出錯，請稍後再試。' });
                return;
            }
    
            alert('密碼重置成功');
            window.location.href = '/login';
        } catch (error) {
            console.error('重置密碼時出錯:', error);
            this.setState({ passwordError: '重置密碼時出錯，請稍後再試。' });
        }
    };
    

    handlePasswordToggle = (type) => {
        this.setState((prevState) => ({
            [type]: !prevState[type],
        }));
    };

    NewPassword = (event) => {
        const newPassword = event.target.value;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
        let passwordError = '';

        if (!newPassword.match(passwordPattern)) {
            passwordError = '<i className="bi bi-asterisk"></i> 請輸入正確的密碼格式: 含英數至少六個字元';
        } else if (!newPassword) {
            passwordError = '<i className="bi bi-asterisk"></i> 請輸入密碼';
        } else {
            passwordError = '';
        }

        this.setState({
            newPassword,
            passwordError
        }, this.CheckPassword);
    };

    CheckPassword = () => {
        const { newPassword, confirmPassword } = this.state;
        let checkPasswordError = '';

        if (confirmPassword && newPassword !== confirmPassword) {
            checkPasswordError = '<i className="bi bi-asterisk"></i> 密碼不吻合';
        } else if (confirmPassword && newPassword === confirmPassword) {
            checkPasswordError = '密碼吻合';
        } else {
            checkPasswordError = '';
        }

        this.setState({ checkPasswordError });
    };

    handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword }, this.CheckPassword);
    };

    render() {
        const { isNewPasswordVisible, isConfirmPasswordVisible, passwordError, checkPasswordError, newPassword, confirmPassword } = this.state;

        return (
            <div>
                <Header />
                <section className="verify">
                    <div className="form">
                        <h4>修改密碼</h4>
                        <div className="input-text input-password">
                            <label>新密碼</label>
                            <input
                                type={isNewPasswordVisible ? 'text' : 'password'}
                                name="newPassword"
                                id="newPassword"
                                value={newPassword}
                                placeholder="Enter new password"
                                autoComplete="new-password"
                                required
                                onChange={this.NewPassword}
                            />
                            <div>
                                <i
                                    className={`bi ${isNewPasswordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}
                                    onClick={() => this.handlePasswordToggle('isNewPasswordVisible')}
                                ></i>
                            </div>
                        </div>
                        <span className="tips" dangerouslySetInnerHTML={{ __html: passwordError || '含英數至少六個字元' }}></span>
                        <br />

                        <div className="input-text input-password">
                            <label>確認密碼</label>
                            <input
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                name="confirmPassword"
                                id="checkPassword"
                                value={confirmPassword}
                                placeholder="Enter password"
                                autoComplete="new-password"
                                onChange={this.handleConfirmPasswordChange}
                            />
                            <div>
                                <i
                                    className={`bi ${isConfirmPasswordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}
                                    onClick={() => this.handlePasswordToggle('isConfirmPasswordVisible')}
                                ></i>
                            </div>
                        </div>
                        <span className="tips" dangerouslySetInnerHTML={{ __html: checkPasswordError }}></span>
                        <br />

                        <input
                            type="button"
                            className="btn"
                            onClick={this.resetPassword}
                            value="確認"
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default LoginVerify;
