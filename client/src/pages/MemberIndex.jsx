import React, { Component } from 'react';
import axios from 'axios';
import '../assets/member.css';
import Header from '../components/header'
import defaultImg from '../assets/images/defaultphoto.jpg'; // 預設會員圖片


class MemberIndex extends Component {
    state = {
        Users: {
            // 去看資料庫怎麼寫!
            "firstName": "",
            "lastName": "",
            "phone": "",
            "email": "",
            "birth": "",
            "sex": "",
            "userImg": "",

        },

        isLoading: true,      // 加载状态
        error: null           // 错误信息
    };
    componentDidMount() {
        this.fetchUserData();
    }

    // 將 UTC 日期轉換為本地日期
    formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    fetchUserData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/riverflow/user', {
            withCredentials: true // 确保请求带上 Cookie
        });

        // 格式化日期
        const birth = response.data.birth ? this.formatDate(response.data.birth) : '';

        // 更新状态以显示用户数据
        this.setState({
            Users: {
                ...response.data,
                birth // 确保日期格式正确
            },
            isLoading: false
        });
    } catch (error) {
        localStorage.removeItem('token');
        this.setState({
            Users: { ...this.state.Users, birth: '' },
            isLoading: false,
        });
        window.location.href = '/login/Index';
    }
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
        const { Users, isLoading, error } = this.state;

        // 變更訂單狀態名稱
        const sexMap = {
            "Female": "女",
            "Male": "男",


        };


        // 如果會員沒有照片就使用預設圖片
        const { userImg } = this.state.Users;
        const imageSrc = userImg ? `/images/users/${userImg}` : defaultImg;
        return (

            <div>
                <Header />
                <div class="Member" >


                    <div class="nav-box" flex="1">
                        <div class="wrap">
                            <div class="member">
                                <div>
                                    <img className="member-img" src={imageSrc} alt="" />
                                </div>
                                <div class="profile">
                                    <h3>Hey！{this.state.Users.lastName} </h3>
                                    <a onClick={this.backMember}>個人資料</a>
                                </div>
                            </div>
                            <div class="nav">
                                <ul>
                                    <li><a onClick={this.backOrderList}><i class="bi bi-clipboard"></i> 訂單查詢</a></li>
                                    <li><a onClick={this.backTickets}><i class="bi bi-ticket-perforated"></i> 活動票券</a></li>
                                    <li><a onClick={this.backCollection}><i class="bi bi-heart"></i> 我的最愛</a></li>

                                </ul>
                            </div>
                            <button className='btn' onClick={this.Logout}>會員登出</button>
                        </div>

                    </div>
                    <div class="profile-box" flex="2" id="profile" >
                        <form class="wrap">
                            <div class="item">
                                <h3>個人資料</h3>
                            </div>
                            <div class="input-card">
                                <label>您的姓名</label><br />
                                <span>{this.state.Users.firstName}{this.state.Users.lastName}</span>
                            </div>
                            <div class="input-card">
                                <label>聯絡電話</label><br />
                                <span>{this.state.Users.phone}</span>
                            </div>
                            <div class="input-card">
                                <label>您的帳號</label><br />
                                <span>{this.state.Users.email}</span>
                            </div>
                            <div class="input-card">
                                <label>您的生日</label><br />
                                <span>{this.state.Users.birth}</span>
                            </div>
                            <div class="input-card">
                                <label>您的性別</label><br />

                                <span>{sexMap[this.state.Users.sex] || this.state.Users.sex}</span>
                            </div>
                            <div class="btn-box">
                                <input type="button" value="修改個人資料" onClick={this.editClick} />
                                <input type="button" value="修改密碼" onClick={this.verifyClick} />

                            </div>


                        </form>

                    </div>


                </div>
            </div>






        );
    }

    // 選單按鈕
    backMember = async () => {
        window.location = "/Member/Index";
    }
    backOrderList = async () => {
        window.location = "/Member/OrderList";
    }
    backTickets = async () => {
        window.location = "/Member/Tickets";
    }
    backCollection = async () => {
        window.location = "/Member/Collection";
    }




    editClick = async () => {
        // var id = this.props.match.params.id;
        // await axios.delete(`http://localhost:8000/todo/delete/${id}`)
        window.location = "/Member/Edit";
    }
    verifyClick = async () => {
        // var id = this.props.match.params.id;
        // await axios.delete(`http://localhost:8000/todo/delete/${id}`)
        window.location = "/Login/Verify";
    }


}
export default MemberIndex;