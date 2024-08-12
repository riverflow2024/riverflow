import React, { Component } from 'react';
import '../assets/member.css';
import Header from '../components/header'

class MemberOrder extends Component {
    state = {
        Users: {
            "firstName": "林",
            "lastName": "小美",
            "phone": "0912-333-555",
            "email": "abc12345@gmail.com",
            "birth": "1995/10/10",
            "sex": "女",
        },
        Order: [
            { "odid": "C123456789", "createdAt": "2024/08/10", "payMethod": "信用卡", "price": 2500, "quantity": 1, "orderStatus": "待出貨" },


            { "odid": "B123456789", "createdAt": "2024/08/08", "payMethod": "信用卡", "price": "$800", "orderStatus": "未付款" },
            { "odid": "A123456789", "createdAt": "2024/08/03", "payMethod": "信用卡", "price": "$1400", "orderStatus": "未付款" },
            { "odid": "E123456789", "createdAt": "2024/08/05", "payMethod": "信用卡", "price": "$1400", "orderStatus": "已完成" },
            { "odid": "D123456789", "createdAt": "2024/08/03", "payMethod": "信用卡", "price": "$1400", "orderStatus": "已完成" },
            { "odid": "I123456789", "createdAt": "2024/07/29", "payMethod": "信用卡", "price": "$400", "orderStatus": "已完成" },
            { "odid": "J123456789", "createdAt": "2024/07/15", "payMethod": "信用卡", "price": "$1400", "orderStatus": "已完成" },
            { "odid": "K123456789", "createdAt": "2024/07/03", "payMethod": "信用卡", "price": "$1400", "orderStatus": "已完成" },
            { "odid": "L123456789", "createdAt": "2024/06/03", "payMethod": "信用卡", "price": "$1400", "orderStatus": "已完成" },
            { "odid": "K123456789", "createdAt": "2024/08/03", "payMethod": "信用卡", "price": "$1000", "orderStatus": "未完成" },
            { "odid": "X123456789", "createdAt": "2024/07/11", "payMethod": "信用卡", "price": "$1800", "orderStatus": "未完成" },
            { "odid": "Z123456789", "createdAt": "2024/07/07", "payMethod": "信用卡", "price": "$200", "orderStatus": "未完成" },
        ],
        OrderItem: [
            { "productName": "商品1", "priceOpt": 980, },
            { "productName": "商品2", "priceOpt": 1080, },
            { "productName": "商品3", "priceOpt": 880, },
            { "productName": "商品4", "priceOpt": 680, },
        ],


        showAdditionalOrders: false,
        activeAccordion: null // 用于跟踪哪个折叠面板是活动的
    }

    render() {
        // 當前日期一個月前的日期
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        // 根據訂單篩選，用filter過濾
        const unpaidOrders = this.state.Order.filter(order => order.orderStatus === '待出貨');
        const paymentOrders = this.state.Order.filter(order => order.orderStatus === '未付款');
        const completedOrders = this.state.Order.filter(order => order.orderStatus === '已完成');
        const notYetCompletedOrders = this.state.Order.filter(order => order.orderStatus === '未完成');

        // 篩選近一個月的訂單 已完成 ＆ 未完成
        const recentCompletedOrders = completedOrders.filter(order => new Date(order.createdAt) >= oneMonthAgo);
        const recentnotYetCompletedOrders = notYetCompletedOrders.filter(order => new Date(order.createdAt) >= oneMonthAgo);

        // 根據 showAdditionalOrders 狀態來顯示訂單
        const displayedCompletedOrders = this.state.showAdditionalOrders ? recentCompletedOrders : completedOrders.slice(0, 2);
        const displayedrecentnotYetCompletedOrders = this.state.showAdditionalOrders ? recentnotYetCompletedOrders : notYetCompletedOrders.slice(0, 2);

        return (

            <div>
                <Header />
                <div className="Order">

                    <div className="nav-box" flex="1">
                        <div className="wrap">
                            <div className="member">
                                <div>
                                    <img className="member-img" src={require('../assets/images/defaultphoto.jpg')} alt="" />
                                </div>
                                <div className="profile">
                                    <h3>Hey！{this.state.Users.lastName} </h3>
                                    <a onClick={this.backMember}>個人資料</a>
                                </div>
                            </div>
                            <div className="nav">
                                <ul>
                                    <li><a onClick={this.backOrderList}><i className="bi bi-clipboard"></i> 訂單查詢</a></li>
                                    <li><a onClick={this.backTickets}><i className="bi bi-ticket-perforated"></i> 活動票券</a></li>
                                    <li><a onClick={this.backCollection}><i className="bi bi-heart"></i> 我的最愛</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="order-box" flex="2">
                        <h3>訂單查詢</h3>
                        <div className="btn-box">
                            <button className="tablink" onClick={this.backOrderList} >待出貨</button>
                            <button className="tablink" style={{ display: 'none' }} onClick={(e) => this.openPage('Unpaid', e.currentTarget, '3px solid var(--main)')} id="defaultOpen"></button>
                            <button className="tablink" onClick={(e) => this.openPage('Payment', e.currentTarget, '3px solid var(--main)')}>未付款</button>
                            <button className="tablink" onClick={(e) => this.openPage('Completed', e.currentTarget, '3px solid var(--main)')}>已完成</button>
                            <button className="tablink" onClick={(e) => this.openPage('NotYetCompleted', e.currentTarget, '3px solid var(--main)')}>未完成</button>
                        </div>

                        <div id="Unpaid" className="tabcontent">
                            {unpaidOrders.map((OrderItem, index) =>
                                <div className="order" key={OrderItem.odid}>
                                    <div className="wrap">
                                        <span>訂單編號：{OrderItem.odid}</span>
                                    </div>

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>日期</th>
                                                <th>總金額</th>
                                                <th>付款方式</th>
                                                <th>狀態</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>{OrderItem.createdAt}</td>
                                                <td>${OrderItem.price + 60}</td>
                                                <td>{OrderItem.payMethod}</td>
                                                <td>{OrderItem.orderStatus}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="accordion">
                                        <div className={`container ${this.state.activeAccordion === index ? 'active' : ''}`}>
                                            <div className="label" onClick={() => this.toggleAccordion(index)}>收件人資訊</div>

                                            <div className="content">
                                                <span>收件人：{this.state.Users.firstName}{this.state.Users.lastName}</span><br />
                                                <span>聯絡電話：{this.state.Users.phone}</span><br />
                                                <span>收件地址：宅配</span><br />
                                            </div>
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colspan="2">商品名稱</th>
                                                    <th>數量</th>
                                                    <th></th>
                                                    <th>小計</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.OrderItem.map(productItem =>
                                                    <tr>
                                                        <td colspan="2">{productItem.productName}</td>
                                                        <td>1</td>
                                                        <td></td>
                                                        <td>{productItem.priceOpt}</td>
                                                    </tr>

                                                )}

                                                <tr style={{ borderBottom: '0.5px solid var(--main)' }}>
                                                    <td colspan="2">運費</td>
                                                    <td>1</td>
                                                    <td></td>
                                                    <td>$60</td>
                                                </tr>

                                                <tr>
                                                    <td colspan="2" style={{ fontWeight: "bold" }}>應付金額</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td style={{ fontWeight: "bold" }}>${OrderItem.price + 60}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div id="Payment" className="tabcontent">
                            {paymentOrders.map(OrderItem =>
                                <div className="order" key={OrderItem.odid}>
                                    <div className="wrap">
                                        <span>訂單編號：{OrderItem.odid}</span>
                                        <a href="memberOrder.html">
                                            <button className="orderbtn">訂單明細</button>
                                        </a>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>日期</th>
                                                <th>總金額</th>
                                                <th>付款方式</th>
                                                <th>狀態</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{OrderItem.createdAt}</td>
                                                <td>{OrderItem.price}</td>
                                                <td>{OrderItem.payMethod}</td>
                                                <td>{OrderItem.orderStatus}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div id="Completed" className="tabcontent">
                            {displayedCompletedOrders.map(OrderItem =>
                                <div className="order" key={OrderItem.odid}>
                                    <div className="wrap">
                                        <span>訂單編號：{OrderItem.odid}</span>
                                        <a href="memberOrder.html">
                                            <button className="orderbtn">訂單明細</button>
                                        </a>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>日期</th>
                                                <th>總金額</th>
                                                <th>付款方式</th>
                                                <th>狀態</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{OrderItem.createdAt}</td>
                                                <td>{OrderItem.price}</td>
                                                <td>{OrderItem.payMethod}</td>
                                                <td>{OrderItem.orderStatus}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <button className="btn" onClick={this.toggleAdditionalOrders}>
                                {this.state.showAdditionalOrders ? '收起近一個月的訂單' : '近一個月的訂單'}
                            </button>
                        </div>

                        <div id="NotYetCompleted" className="tabcontent">
                            {displayedrecentnotYetCompletedOrders.map(OrderItem =>
                                <div className="order" key={OrderItem.odid}>
                                    <div className="wrap">
                                        <span>訂單編號：{OrderItem.odid}</span>
                                        <a href="memberOrder.html">
                                            <button className="orderbtn">訂單明細</button>
                                        </a>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>日期</th>
                                                <th>總金額</th>
                                                <th>付款方式</th>
                                                <th>狀態</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{OrderItem.createdAt}</td>
                                                <td>{OrderItem.price}</td>
                                                <td>{OrderItem.payMethod}</td>
                                                <td>{OrderItem.orderStatus}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <button className="btn" onClick={this.toggleAdditionalOrders}>
                                {this.state.showAdditionalOrders ? '收起近一個月的訂單' : '近一個月的訂單'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        );
    }

    toggleAccordion = (index) => {
        this.setState(prevState => ({
            activeAccordion: prevState.activeAccordion === index ? null : index
        }));
    }

    toggleAdditionalOrders = () => {
        this.setState(prevState => ({ showAdditionalOrders: !prevState.showAdditionalOrders }));
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

export default MemberOrder;
