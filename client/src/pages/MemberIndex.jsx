import React, { Component } from 'react';
import '../assets/member.css';


class MemberIndex extends Component {
    state = {
        profileList: [
            //模擬的資料
            { "todoTableid": 1, "title": "Job A", "isComplete": 0 },
            { "todoTableid": 2, "title": "Job B", "isComplete": 1 },
            { "todoTableid": 3, "title": "Job C", "isComplete": 1 }
        ]
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
                                    <h3>Hey！小明</h3>
                                    <a href="member.html">個人資料</a>
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
                                <span>王小明</span>
                            </div>
                            <div class="input-card">
                                <label>聯絡電話</label><br />
                                <span>0912-345-678</span>
                            </div>
                            <div class="input-card">
                                <label>您的帳號</label><br />
                                <span>abc12345@gmail.com</span>
                            </div>
                            <div class="input-card">
                                <label>您的生日</label><br />
                                <span>1995/10/10</span>
                            </div>
                            <div class="input-card">
                                <label>您的性別</label><br />
                                <span>男</span>
                            </div>
                            <div class="btn-box">
                                <input type="button" onclick="location.href='memberEdit.html'" value="修改個人資料" />
                                <input type="button" onclick="location.href='verify.html'" value="修改密碼" />
                                <input type="button" value="儲存" />
                            </div>


                        </form>

                    </div>


                </section>





            </body>


        );
    }

}
export default MemberIndex;