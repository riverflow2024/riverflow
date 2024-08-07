import React, { Component } from 'react';
import '../assets/login.css';



class Login extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "ko",
            "secret":"123",
            "birth": "1995/10/10",
            "sex": "女",
            
        },
        isPasswordVisible: false,

    }



    render() {
        const { isPasswordVisible } = this.state;


        return (
            <section class="verify loginPage">
                <form>
                    <h4>修改密碼</h4>
                    <div class="input-text input-password">
                        <label>新密碼</label>
                        <input type="password" name="newPassword" id="newPassword" placeholder="Enter password"
                            pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$" required />
                        <div><i id="newBtn" class="bi bi-eye-slash-fill"></i></div>
                    </div>
                    <span class="tips" id="passwordTips">含英數至少六個字元</span> <br />

                    <div class="input-text input-password">
                        <label>確認密碼</label>
                        <input type="password" name="" id="checkPassword" placeholder="Enter password" />
                        <div><i id="checkBtn" class="bi bi-eye-slash-fill"></i></div>
                    </div>
                    <span class="tips" id="checkpassTips"></span> <br/>

                        <input type="button" class="btn" onclick="location.href='login.html'" value="確認" />

                        </form>
                    </section>




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