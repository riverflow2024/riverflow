import React, { Component } from 'react';
import '../assets/member.css';


class MemberCollection extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "abc12345@gmail.com",
            "birth": "1995/10/10",
            "sex": "女",
        },
        OrderDetail: [
            {
                "odid": "A123456789",
                "createdAt": "2024/08/03",
                "payMethod": "信用卡",
                "price": "$1400",
                "orderStatus": "未出貨",
            },
            {
                "odid": "B123456789",
                "createdAt": "2024/08/03",
                "payMethod": "信用卡",
                "price": "$1400",
                "orderStatus": "未出貨",
            },
            {
                "odid": "C123456789",
                "createdAt": "2024/08/03",
                "payMethod": "信用卡",
                "price": "$1400",
                "orderStatus": "未出貨",
            },
        ]
    }
    render() {
        return (


            <div >

                <header>
                    <img src={require('../assets/images/indexImg/nav.jpg')} alt="" />
                </header>

                <section class="Collection">

                    <div class="nav-box" flex="1">
                        <div class="wrap">
                            <div class="member">
                                <div>
                                    <img class="member-img" src={require('../assets/images/defaultphoto.jpg')} alt="" />
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
                    <div class="order-box" flex="2">

                        <h3>我的最愛</h3>
                        <div class="btn-box">
                            <button class="tablink" onClick={(e) => this.openPage('Collection', e.currentTarget, '3px solid var(--main)')} id="defaultOpen">商品</button>

                        </div>

                        <div id="Collection" class="tabcontent">
                            <div class="order">

                                <div class="Img-box">
                                    <img src={require("../assets/images/Bootstrap_logo.svg.png")} alt="" />
                                </div>
                                <div class="container">
                                    <div class="wrap">
                                        <span> 商品名稱：商品名稱商品名稱商品名稱商品名稱商品名稱</span>
                                        <button class="closebtn"><i class="bi bi-x"></i></button>
                                    </div>
                                    <div class="wrap">
                                        <span>尺寸：Ｍ&nbsp;&nbsp;&nbsp;數量：1</span>
                                    </div>
                                    <div class="wrap">
                                        <span>金額  NT. $880</span>
                                        <button class="orderbtn">加入購物車</button>
                                    </div>
                                </div>

                            </div>


                        </div>




                    </div>

                </section>




            </div>


        );
    }





    openPage(pageName, elmnt, border) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].style.borderBottom = "3px solid var(--bk2)";
        }
        document.getElementById(pageName).style.display = "block";
        elmnt.style.borderBottom = border;
    }

    componentDidMount() {
        document.getElementById("defaultOpen").click();
    }

    // 選單按鈕
    backMember = async () => {
        window.location = "/Member/Index";
    }
    backOderList = async () => {
        window.location = "/Member/OrderList";
    }
    backTickets = async () => {
        window.location = "/Member/Tickets";
    }
    backCollection = async () => {
        window.location = "/Member/Collection";
    }
    goOrder = async () => {
        window.location = "/Member/Order";
    }






}
export default MemberCollection;