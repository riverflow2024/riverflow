import React, { Component } from 'react';
import '../assets/login.css';



class Login extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "abc12345@gmail.com",
            "birth": "1995/10/10",
            "sex": "女",
        },
        isPasswordVisible: false,
        email: '',
        emailError: '',
    }

    handlePasswordToggle = () => {
        this.setState(prevState => ({
            isPasswordVisible: !prevState.isPasswordVisible
        }));
    }

    handleEmailInput = (event) => {
        const email = event.target.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailError = '';
    
        if (!email.match(emailPattern)) {
          emailError = `<i class="bi bi-asterisk"></i> 不符合email規則，請確認是否包含[@]`;
        }
    
        this.setState({ email, emailError });
      };



    render() {
        const { isPasswordVisible } = this.state;
        return (
            <div class="w-bg scrollCust">
                <header>
                    <img src={require('../assets/images/indexImg/nav.jpg')} alt="" />
                </header>

                <section class="login" >
                    <div class="form" >
                        <h4>會員登入</h4>
                        <div class="input-text">
                            <label>帳號</label>
                            <input type="text" id="email" name="email" placeholder="Enter email"
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required /><br />
                        </div>
                        <span class="tips" id="emailTips"></span> <br />

                        <div class="input-text">
                            <label>密碼</label>
                            <input type={isPasswordVisible ? 'text' : 'password'} style={{ width: '80%' }} name="password" id="password" placeholder="Enter password"
                                pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$" required />
                            <div><i id="showBtn" class={`bi ${isPasswordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`} onClick={this.handlePasswordToggle}></i></div>
                        </div>
                        <a href="password.html">忘記密碼？</a>
                        <input type="submit" value="Login" />
                        <span>
                            沒有River Flow帳號嗎？
                            <a href="register.html">前往註冊</a>

                        </span>
                    </div>

                    {/* 無法登入 彈跳視窗 */}

                    <div class="nolongin" id="nolongin">
                        <div class="nolongin-wrap">
                            <h4>無法登入</h4>
                            <p>請確認輸入的資料及大小寫是否正確。若不是OPENTIX會員請前往註冊。</p>
                            <button class="btn">確認</button>
                        </div>

                    </div>
                </section>



            </div>




        );


    }





}
export default Login;