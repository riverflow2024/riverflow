import React, { Component } from 'react';
import '../assets/member.css';
import Header from '../components/header'

class MemberEdit extends Component {
    state = {
        Users: {
            firstName: "林",
            lastName: "小美",
            phone: "0912-333-555",
            email: "abc12345@gmail.com",
            birth: "1995/10/10",
            sex: "女",
        },
        phoneError: '',
    };

  

    Logout = async () => {
        try {
            await axios.get('http://localhost:3000/riverflow/user/logout', {
                withCredentials: true // 确保请求带上 Cookie
            });
            // 清除本地存储中的 Token
            localStorage.removeItem('token');
            // 重定向到登录页面
            window.location.href = '/login/Index';
        } catch (error) {
            console.error("Error logging out:", error);
            // 可以显示错误消息或者其他处理
        }
    };

   

    render() {
        const { Users, phoneError } = this.state;

        return (
            <div>
                <Header />
                

                <section className="Member">
                    <div className="nav-box" flex="1">
                        <div className="wrap">
                            <div className="member">
                                <div className="member-img">
                                    <img className="img" src={require('../assets/images/defaultphoto.jpg')} alt="Profile" />
                                    <label className="prettier-input">
                                        <input type="file" />
                                        <div>
                                            上傳<br />大頭貼
                                        </div>
                                    </label>
                                </div>
                                <div className="profile">
                                    <h3>Hey！小明</h3>
                                    <a onClick={this.backMember}>個人資料</a>
                                </div>
                            </div>
                            <div className="nav">
                                <ul>
                                    <li><a onClick={this.backOrderList}><i className="bi bi-clipboard"></i> 訂單查詢</a></li>
                                    <li><a onClick={this.backTickets}><i className="bi bi-ticket-perforated"></i> 活動票券</a></li>
                                    <li><a onClick={this.backCollection}><i className="bi bi-heart"></i> 我的最愛</a></li>
                                </ul>
                                <button className='btn' onClick={this.Logout}>會員登出</button>
                            </div>
                        </div>
                    </div>
                    <div className="profile-box" flex="2" id="profile">
                        <form className="wrap">
                            <div className="item">
                                <h3>個人資料</h3>
                            </div>
                            <div className="input-card">
                                <label>您的姓氏</label><br />
                                <input type="text" name="" id="" placeholder={Users.firstName} />
                            </div>
                            <div className="input-card">
                                <label>您的名字</label><br />
                                <input type="text" name="" id="" placeholder={Users.lastName} />
                            </div>
                            <div className="input-card">
                                <label>聯絡電話</label><br />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    onChange={this.handlePhoneChange}
                                    placeholder={Users.phone}
                                    required
                                />
                            </div>
                            <span className="tips" id="" dangerouslySetInnerHTML={{ __html: this.state.phoneError }}></span>
                            <div className="input-card">
                                <label>您的帳號</label><br />
                                <input type="email" name="" id="" placeholder={Users.email} disabled />
                            </div>
                            <div className="input-date">
                                <label>您的生日</label><br />
                                <input type="date" name="" id="" placeholder="" />
                            </div>
                            <div className="input-card">
                                <label>您的性別</label><br />
                                <select name="" id="">
                                    <option value="">男</option>
                                    <option value="">女</option>
                                </select>
                            </div>
                            <div className="btn-box">
                                <input type="button" value="查看個人資料" onClick={this.backMember} />
                                <input type="button" value="修改密碼" onClick={this.verifyClick} />
                                <input type="button" value="儲存"  />
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        );
    }

    // 判斷手機號碼規則

    handlePhoneChange = (e) => {
        const phone = e.target.value;
        const phonePattern = /^09[0-9]{2}-[0-9]{3}-[0-9]{3}$/;

        let phoneError = '';
        if (!phone) {
            phoneError = '<i class="bi bi-asterisk"></i> 請輸入手機號碼';
        } else if (!phonePattern.test(phone)) {
            phoneError = '<i class="bi bi-asterisk"></i> 請輸入符合手機的格式：0912-345-678';
        }

        
        this.setState({ Users: { ...this.state.Users, phone }, phoneError });
    };

    backMember = () => {
        window.location = "/Member/Index";
    }

    verifyClick = () => {
        window.location = "/Login/Verify";
    }

    backOrderList = () => {
        window.location = "/Member/OrderList";
    }

    backTickets = () => {
        window.location = "/Member/Tickets";
    }

    backCollection = () => {
        window.location = "/Member/Collection";
    }
}

export default MemberEdit;
