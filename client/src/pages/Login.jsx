import React, { Component } from 'react';
import axios from 'axios';
import '../assets/login.css';
import Header from '../components/header'



class Login extends Component {
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

    Login = async() =>{
        let dataToserver = {
            email: this.state.Users.email,
            secret:this.state.Users.secret
        }; 
        var reasult = await axios.post('http://localhost:3000/riverflow/user/login',
            JSON.stringify(dataToserver),
            {
                headers:{
                    "Content-Type":"application/json",
                    //   "Authorization": `Bearer ${token}`
                }
            }
        )
        
         window.location = "/Index";
    }



    // Login = async () => {
    //     try {
    //         let dataToserver = {
    //             email: this.state.Users.email,
    //             secret: this.state.Users.secret
    //         };

    //         var result = await axios.post('http://localhost:3000/riverflow/user/login', dataToserver, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });

    //         // 登录成功后重定向
    //         window.location = "/Index";
    //     } catch (error) {
    //         // 捕获错误并更新 error 状态
    //         this.setState({ error: error.response ? error.response.data.message : 'Unknown error' });

    //     }
    // }




    render() {
        const { isPasswordVisible } = this.state;


        return (
            <div className="">
                <Header />

                <section className="login" >
                    <div className="form" >
                        <h4>會員登入</h4>
                        <div className="input-text">
                            <label>帳號</label>
                            <input type="text" id="email" name="email"
                                value={this.state.Users.email}
                                placeholder="Enter email"
                                // autoComplete='off' // 關閉自動填入
                                onChange={this.EmailChange}
                            /><br />
                        </div>

                        <span className="tips" id="" dangerouslySetInnerHTML={{ __html: this.state.emailError }}></span>

                        <div className="input-text">
                            <label>密碼</label>
                            <input type={isPasswordVisible ? 'text' : 'password'}
                                style={{ width: '80%' }} name="password" id="password"
                                value={this.state.Users.secret}
                                placeholder="Enter password"
                                pattern="^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$" required
                                onChange={this.PasswordChange} />
                            <div><i id="showBtn" className={`bi ${isPasswordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`} onClick={this.handlePasswordToggle}></i></div>
                        </div>
                        <a onClick={this.goPassword}>忘記密碼？</a>
                        <input type="button" className="btn" value="Login" onClick={this.Login} />
                        <span>
                            沒有River Flow帳號嗎？
                            <a onClick={this.goRegister}>前往註冊</a>

                        </span>
                    </div>

                    {/* 無法登入 彈跳視窗 */}

                    {this.state.error && (
                        <div className="nolongin" id="nolongin">
                            <div className="nolongin-wrap">
                                <h4>無法登入</h4>
                                <p>請確認輸入的資料及大小寫是否正確。若不是 RiverFlow 會員請前往註冊。</p>
                                <button className="btn" onClick={() => this.setState({ error: false })}>確認</button>
                            </div>
                        </div>
                    )}
                </section>



            </div>




        );


    }

    goRegister = () => {
        window.location = "/Login/Register";
    }
    goPassword = () => {
        window.location = "/Login/Password";
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
            emailError = `<i className="bi bi-asterisk"></i> 不符合email規則，請確認是否包含[@]`;
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