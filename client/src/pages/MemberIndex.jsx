import React, { Component } from 'react';
import axios from 'axios';
import '../assets/member.css';
import Header from '../components/header'


class MemberIndex extends Component {
    state = {
        Users: {
            "firstName": "",
            "lastName": "",
            "phone": "",
            "email": "",
            "birth": "",
            "sex": "",
        },
        isLoading: true, // 添加一个加载状态
        error: false,    // 添加一个错误状态
    };
        async componentDidMount() {
        const token = localStorage.getItem('token');

        if (!token) {
            // 如果没有 token，重定向到登录页面
            window.location = "/Login/Index";
            return;
        }

        try {
            const response = await axios.get('http://localhost:3000/riverflow/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            this.setState({
                Users: response.data,
                isLoading: false
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            this.setState({ 
                isLoading: false,
                error: true
            });
            window.location = "/Login/Index";
        }
    }

   
    render() {
        // const { Users } = this.state;

        // if (!Users) {
        //     return <p>載入中...</p>; // 顯示載入狀態
        // }
        return (

            <div>
                <Header />
                <div class="Member" >


                    <div class="nav-box" flex="1">
                        <div class="wrap">
                            <div class="member">
                                <div class="member-img">
                                    <img src={require('../assets/images/defaultphoto.jpg')} alt="" />
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
                                <span>{this.state.Users.sex}</span>
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