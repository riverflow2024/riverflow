import React, { Component } from 'react';
import '../assets/member.css';


class MemberTickets extends Component {
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
            {"odid": "A123456789",
            "createdAt": "2024/08/03",
            "payMethod": "信用卡",
            "price": "$1400",
            "orderStatus": "未出貨",},
            {"odid": "B123456789",
            "createdAt": "2024/08/03",
            "payMethod": "信用卡",
            "price": "$1400",
            "orderStatus": "未出貨",},
            {"odid": "C123456789",
            "createdAt": "2024/08/03",
            "payMethod": "信用卡",
            "price": "$1400",
            "orderStatus": "未出貨",},
    ]
    }
    render() {
        return (


            <div >

                <header>
                    <img src={require('../assets/images/indexImg/nav.jpg')} alt="" />
                </header>

                <section class="Tickets">

                    <div class="nav-box" flex="1">
                        <div class="wrap">
                            <div class="member">
                                <div>
                                    <img class="member-img" src={require('../assets/images/defaultphoto.jpg')}  alt="" />
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
            
                <h3>活動票券</h3>
                <div class="btn-box">
                    <button class="tablink" onClick={(e)=>this.openPage('Ticket', e.currentTarget,'3px solid var(--main)')} id="defaultOpen">活動中</button>
                    <button class="tablink" onClick={(e)=>this.openPage('Unpaid', e.currentTarget,'3px solid var(--main)')}>未付款</button>
                    <button class="tablink" onClick={(e)=>this.openPage('OrderDone', e.currentTarget,'3px solid var(--main)')}>已完成</button> 
                </div>

                <div id="Ticket" class="tabcontent">
                    <div class="order">
                        <div class="wrap">
                            <span>訂單編號：1234567890</span>
                            <button class="orderbtn">訂單明細</button>
                        </div>
                        <table>
                            <thead>
                                <th>日期</th>
                                <th colspan="2">活動名稱</th>
                                <th>數量</th>
                                <th>總金額</th>
                                <th>付款方式</th>
                                <th>狀態</th>
                            </thead>
                            
                            <tbody>
                                <td>2024/07/03</td>
                                <td colspan="2">《大嘻哈哈哈》-烏拉拉</td>
                                <td>2</td>
                                <td>$1450</td>
                                <td>信用卡</td>
                                <td>活動中</td>
                            </tbody>
                        </table>
                    </div>
                   

                </div>
                <div id="Unpaid" class="tabcontent">
                    <div class="order">
                        <div class="wrap">
                            <span>訂單編號：1234567890</span>
                            <button class="orderbtn">訂單明細</button>
                        </div>
                        <table>
                            <thead>
                                <th>日期</th>
                                <th colspan="2">活動名稱</th>
                                <th>數量</th>
                                <th>總金額</th>
                                <th>付款方式</th>
                                <th>狀態</th>
                            </thead>
                            
                            <tbody>
                                <td>2024/07/03</td>
                                <td colspan="2">《大嘻哈哈哈》-烏拉拉</td>
                                <td>2</td>
                                <td>$1450</td>
                                <td>信用卡</td>
                                <td>未付款</td>
                            </tbody>
                        </table>
                    </div>
                   

                </div>
                <div id="OrderDone" class="tabcontent">
                    <div class="order">
                        <div class="wrap">
                            <span>訂單編號：1234567890</span>
                            <button class="orderbtn">訂單明細</button>
                        </div>
                        <table>
                            <thead>
                                <th>日期</th>
                                <th colspan="2">活動名稱</th>
                                <th>數量</th>
                                <th>總金額</th>
                                <th>付款方式</th>
                                <th>狀態</th>
                            </thead>
                            
                            <tbody>
                                <td>2024/07/03</td>
                                <td colspan="2">《大嘻哈哈哈》-烏拉拉</td>
                                <td>2</td>
                                <td>$1450</td>
                                <td>信用卡</td>
                                <td>已完成</td>
                            </tbody>
                        </table>
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
    backOrderList = async () => {
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
export default MemberTickets;