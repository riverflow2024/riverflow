import React, { Component } from 'react';
import '../assets/login.css';

class LoginVerify extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "ko",
            "secret": "",
            "birth": "1995/10/10",
            "sex": "女",
        },
        isNewPasswordVisible: false,
        isConfirmPasswordVisible: false,
        newPassword: '',
        confirmPassword: '',
        passwordError: '',
        checkPasswordError: '',
    };

    componentDidMount() {
        // newPassword 和 confirmPassword 轉換為secret
        this.setState({
            newPassword: this.state.Users.secret,
            confirmPassword: this.state.Users.secret,
        });
    }

    render() {
        const { isNewPasswordVisible, isConfirmPasswordVisible, passwordError, checkPasswordError, newPassword, confirmPassword } = this.state;

        return (
            <div className="loginPage">
                <section className="verify">
                    <form>
                        <h4>修改密碼</h4>
                        <div className="input-text input-password">
                            <label>新密碼</label>
                            <input
                                type={isNewPasswordVisible ? 'text' : 'password'}
                                name="newPassword"
                                id="newPassword"
                                value={newPassword}
                                placeholder="Enter new password"
                                autocomplete="new-password"
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
                                autocomplete="new-password"
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
                            onClick={() => window.location.href = 'login.html'}
                            value="確認"
                        />
                    </form>
                </section>
            </div>
        );
    }

    // 顯示密碼的功能
    handlePasswordToggle = (type) => {
        this.setState((prevState) => ({
            [type]: !prevState[type],
        }));
    };

    // 新密碼驗證，同時啟動確認密碼功能
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

    // 確認密碼功能，並在下方顯示提示
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

    // 確認密碼更動時，同時啟動確認密碼功能
    handleConfirmPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        // 每當確認密碼更改時驗證密碼匹配
        this.setState({ confirmPassword }, this.CheckPassword);
    };
}

export default LoginVerify;
