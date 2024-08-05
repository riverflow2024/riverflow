import React, { Component } from 'react';
import '../assets/member.css';


class MemberIndex extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "abc12345@gmail.com",
            "birth": "1995/10/10",
            "sex": "女",
        }
    }
    render() {
        return (


            <body class="w-bg scrollCust">
                
                <header>
                    <img src={require('../assets/images/indexImg/nav.jpg')} alt="" />
                </header>

                <section class="Member" >

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
                                    <li><a href="memberOrderList.html"><i class="bi bi-clipboard"></i> 訂單查詢</a></li>
                                    <li><a href="memberTickets.html"><i class="bi bi-ticket-perforated"></i> 活動票券</a></li>
                                    <li><a href="memberCollection.html"><i class="bi bi-heart"></i> 我的最愛</a></li>

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
                                <input type="button" onclick="location.href='memberEdit.html'" value="修改個人資料" onClick={this.editClick} />
                                <input type="button" onclick="location.href='verify.html'" value="修改密碼" onClick={this.verifyClick} />
                               
                            </div>


                        </form>

                    </div>


                </section>





            </body>


        );
    }

    backMember= async () => {
        // var id = this.props.match.params.id;
        // await axios.delete(`http://localhost:8000/todo/delete/${id}`)
        window.location ="/Member/Index";
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