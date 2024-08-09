import React, { Component } from 'react';
import '../assets/login.css';



class LoginPassword extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "",
            "secret": "",
            "birth": "1995/10/10",
            "sex": "女",
        },
        isPasswordVisible: false,

    }



    render() {
        const { emailError } = this.state;


        return (
            <div class="loginPage">

                <section class="password">
                    <form >
                        <h4>重設密碼</h4>
                        <p>
                            如忘記密碼，請輸入註冊時的Email，我們將以Email傳送驗證碼，並請依畫面指示輸入以進行密碼重設。
                        </p>
                        <div class="input-text">
                            <label>帳號</label>
                            <input type="text" id="email" name="email"
                                value={this.state.Users.email}
                                placeholder="Enter email"
                                onChange={this.EmailChange} /><br />
                        </div>
                        <span className="tips" id="" dangerouslySetInnerHTML={{ __html: emailError }}></span>


                        <input type="button" id="btnSent" class="btn" value="發送驗證信" />

                    </form>
                </section>



            </div >




        );


    }

    goRegister = () => {
        window.location = "/Login/Register";
    }
    goVerify = () => {
        window.location = "/Login/Verify";
    }

    handlePasswordToggle = () => {
        this.setState(prevState => (
            { isPasswordVisible: !prevState.isPasswordVisible }));
    }
    PasswordChange = (e) => {
        var newState = { ...this.state };
        newState.Users.secret = e.target.value;
        this.setState(newState);
    }

    EmailChange = (event) => {
        const email = event.target.value;
        const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
        let emailError = '';

        if (!email.match(emailPattern)) {
            emailError = `<i class="bi bi-asterisk"></i> 請輸入email，並確認是否包含[@]，符合email規則`;
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
export default LoginPassword;