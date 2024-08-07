import React, { Component } from 'react';
import '../assets/login.css';



class Login extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "ko",
            "birth": "1995/10/10",
            "sex": "女",
        },
        isPasswordVisible: false,
        
    }

   

    render() {
        const { isPasswordVisible } = this.state;
       
        
        return (
            <div class="loginPage">

                <section class="login" >
                    <div class="form" >
                        <h4>會員登入</h4>
                        <div class="input-text">
                            <label>帳號</label>
                            <input type="text" id="email" name="email"
                                value={this.state.Users.email} 
                                placeholder="Enter email"
                                onChange={this.handleEmailInput} /><br />
                        </div>

                        <span className="tips" id="" dangerouslySetInnerHTML={{ __html: this.state.emailError }}></span>

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

    handlePasswordToggle = () => {
        this.setState(prevState => ({
            isPasswordVisible: !prevState.isPasswordVisible
        }));
    }
    
    handleEmailInput = (event) => {
        const email = event.target.value;
        const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i; 
        let emailError = '';
      
        if (!email.match(emailPattern)) {
          emailError = `<i class="bi bi-asterisk"></i> 不符合email規則，請確認是否包含[@]`;
        }
      
        this.setState((prevState) => ({
            Users: {
              ...prevState.Users,
              email,
            },
            emailError,
          }));
      };
      




}
export default Login;