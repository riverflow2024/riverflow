import React, { Component } from 'react';
import '../assets/member.css';


class memberOrderList extends Component {
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


            <div className="w-bg scrollCust">

                <header>
                    <img src={require('../assets/images/indexImg/nav.jpg')} alt="" />
                </header>

                <section class="OrderList">

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
                                    <li><a onClick={this.backOderList}><i class="bi bi-clipboard"></i> 訂單查詢</a></li>
                                    <li><a onClick={this.backTickets}><i class="bi bi-ticket-perforated"></i> 活動票券</a></li>
                                    <li><a onClick={this.backCollection}><i class="bi bi-heart"></i> 我的最愛</a></li>

                                </ul>

                            </div>
                        </div>

                    </div>
                    <div class="order-box" flex="2">

                        <h3>訂單查詢</h3>
                        <div class="btn-box">
                            <button class="tablink" onClick={(e)=>this.openPage('Unpaid', e.currentTarget,'3px solid var(--main)')}  id="defaultOpen">待出貨</button>
                            <button class="tablink" onClick={(e)=>this.openPage('Payment', e.currentTarget,'3px solid var(--main)')}>未付款</button>
                            <button class="tablink" onClick={(e)=>this.openPage('OrderDone', e.currentTarget,'3px solid var(--main)')}>已完成</button>
                            <button class="tablink" onClick={(e)=>this.openPage('OrderNotyet', e.currentTarget,'3px solid var(--main)')}>未完成</button>
                        </div>

                        <div id="Unpaid" class="tabcontent">
                        {this.state.OrderDetail.map(OrderItem =>
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：{OrderItem.odid}</span>
                                    <a href="memberOrder.html">
                                        <button class="orderbtn">訂單明細</button>
                                    </a>

                                </div>
                                <table>
                                    <thead>
                                        <th>日期</th>
                                        <th>總金額</th>
                                        <th>付款方式</th>
                                        <th>狀態</th>
                                    </thead>

                                    <tbody>
                                        <td>{OrderItem.createdAt}</td>
                                        <td>{OrderItem.price}</td>
                                        <td>{OrderItem.payMethod}</td>
                                        <td>{OrderItem.orderStatus}</td>
                                    </tbody>
                                </table>
                            </div>
                        )
                        }
                        </div>

                        <div id="Payment" class="tabcontent">
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：1234567890</span>
                                    <a href="memberOrder.html">
                                        <button class="orderbtn">訂單明細</button>
                                    </a>
                                </div>
                                <table>
                                    <thead>
                                        <th>日期</th>
                                        <th>總金額</th>
                                        <th>付款方式</th>
                                        <th>狀態</th>
                                    </thead>

                                    <tbody>
                                        <td>2024/07/03</td>
                                        <td>$1450</td>
                                        <td>信用卡</td>
                                        <td>待付款</td>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div id="OrderDone" class="tabcontent">
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：1234567890</span>
                                    <a href="memberOrder.html">
                                        <button class="orderbtn">訂單明細</button>
                                    </a>
                                </div>
                                <table>
                                    <thead>
                                        <th>日期</th>
                                        <th>總金額</th>
                                        <th>付款方式</th>
                                        <th>狀態</th>
                                    </thead>

                                    <tbody>
                                        <td>2024/07/03</td>
                                        <td>$1450</td>
                                        <td>信用卡</td>
                                        <td>已完成</td>
                                    </tbody>
                                </table>
                            </div>

                            <button class="btn">近一個月的訂單</button>
                        </div>

                        <div id="OrderNotyet" class="tabcontent">
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：1234567890</span>
                                    <a href="memberOrder.html">
                                        <button class="orderbtn">訂單明細</button>
                                    </a>
                                </div>
                                <table>
                                    <thead>
                                        <th>日期</th>
                                        <th>總金額</th>
                                        <th>付款方式</th>
                                        <th>狀態</th>
                                    </thead>

                                    <tbody>
                                        <td>2024/07/03</td>
                                        <td>$1450</td>
                                        <td>信用卡</td>
                                        <td>未完成</td>
                                    </tbody>
                                </table>
                            </div>

                            <button class="btn">近一個月的訂單</button>
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
        window.location = "/Member/OderList";
    }
    backTickets = async () => {
        window.location = "/Member/Tickets";
    }
    backCollection = async () => {
        window.location = "/Member/Collection ";
    }



}
export default memberOrderList;