import React, { Component } from 'react';
import '../assets/member.css';
import Header from '../components/header'


class MemberTickets extends Component {
    state = {
        Users: {
            "firstName": "",
            "lastName": "",
            "phone": "",
            "email": "",
            "birth": "",
            "sex": "",
        },
        TicketsDetails: [
            { "tdid": "A234567890", "createdAt": "2024/09/1", "eventName": "王以太_Love Me Later_台北站", "quantity": 2, "ticketType": "一般票", "tdStatus": "活動中", "tdPrice": "5600", "randNum": "b1kig0d80a" },
            { "tdid": "A234567890", "createdAt": "2024/09/1", "eventName": "《大嘻哈哈哈》-烏拉拉", "quantity": 2, "ticketType": "一般票", "tdStatus": "未付款", "tdPrice": "5600", "randNum": "k1kif0d12c" },

            { "tdid": "B1234567890", "createdAt": "2024/07/03", "eventName": "《大嘻哈哈哈》-烏拉拉", "quantity": 1, "ticketType": "一般票", "tdStatus": "已結束", "tdPrice": "600", "randNum": "x1kig0d12c" },
            { "tdid": "F1234567890", "createdAt": "2024/02/01", "eventName": "音樂戰艦Leo王｜演唱會｜台北國際會議中心", "quantity": 2, "ticketType": "一般票", "tdStatus": "已結束", "tdPrice": "2900", "randNum": "g2kig0d12c" },

        ],
        Users: null,       // 用户数据
        isLoading: true,      // 加载状态
        error: null           // 错误信息

    }
    componentDidMount() {
        this.fetchUserData();
    }
    
    fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/riverflow/user', {
                withCredentials: true // 确保请求带上 Cookie
            });
    
            // 更新状态以显示用户数据
            this.setState({
                Users: response.data, // 使用 Users 状态
                isLoading: false
            });
        } catch (error) {
            // 清除本地存储中的 Token（如果你仍然在使用本地存储）
            localStorage.removeItem('token');
            this.setState({
                isLoading: false,
                error: 'Failed to fetch user data. Please log in again.'
            });
        }
    };


    render() {

        // 根據訂單篩選，用filter過濾
        const Ticket = this.state.TicketsDetails.filter(ticket => ticket.tdStatus === '活動中');
        const Unpaid = this.state.TicketsDetails.filter(ticket => ticket.tdStatus === '未付款');
        const OrderDone = this.state.TicketsDetails.filter(ticket => ticket.tdStatus === '已結束');

        return (

            <div>
                <Header />
                <div class="Tickets">
                

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

                    <h3>活動票券</h3>
                    <div class="btn-box">
                        <button class="tablink" onClick={(e) => this.openPage('Ticket', e.currentTarget, '3px solid var(--main)')} id="defaultOpen">活動中</button>
                        <button class="tablink" onClick={(e) => this.openPage('Unpaid', e.currentTarget, '3px solid var(--main)')}>未付款</button>
                        <button class="tablink" onClick={(e) => this.openPage('OrderDone', e.currentTarget, '3px solid var(--main)')}>已結束</button>
                    </div>

                    <div id="Ticket" class="tabcontent">
                        {Ticket.map(OrderItem =>
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：{OrderItem.tdid}</span>
                                    <span>取票號：{OrderItem.randNum}</span>
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
                                        <td>{OrderItem.createdAt}</td>
                                        <td colspan="2">{OrderItem.eventName}</td>
                                        <td>{OrderItem.quantity}</td>
                                        <td>NT${OrderItem.tdPrice}</td>
                                        <td>{OrderItem.ticketType}</td>
                                        <td>{OrderItem.tdStatus}</td>
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                    <div id="Unpaid" class="tabcontent">
                        {Unpaid.map(OrderItem =>
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：{OrderItem.tdid}</span>
                                    <span>取票號：{OrderItem.randNum}</span>

                                </div>
                                <table>
                                    <thead>
                                        <th>日期</th>
                                        <th colspan="2">活動名稱</th>
                                        <th>數量</th>
                                        <th>總金額</th>
                                        <th>票種</th>
                                        <th>狀態</th>
                                    </thead>

                                    <tbody>
                                        <td>{OrderItem.createdAt}</td>
                                        <td colspan="2">{OrderItem.eventName}</td>
                                        <td>{OrderItem.quantity}</td>
                                        <td>NT${OrderItem.tdPrice}</td>
                                        <td>{OrderItem.ticketType}</td>
                                        <td>{OrderItem.tdStatus}</td>
                                    </tbody>
                                </table>
                            </div>
                        )}


                    </div>
                    <div id="OrderDone" class="tabcontent">
                        {OrderDone.map(OrderItem =>
                            <div class="order">
                                <div class="wrap">
                                    <span>訂單編號：{OrderItem.tdid}</span>
                                    <span>取票號：{OrderItem.randNum}</span>
                                </div>
                                <table>
                                    <thead>
                                        <th>日期</th>
                                        <th colspan="2">活動名稱</th>
                                        <th>數量</th>
                                        <th>總金額</th>
                                        <th>票種</th>
                                        <th>狀態</th>
                                    </thead>

                                    <tbody>
                                        <td>{OrderItem.createdAt}</td>
                                        <td colspan="2">{OrderItem.eventName}</td>
                                        <td>{OrderItem.quantity}</td>
                                        <td>NT${OrderItem.tdPrice}</td>
                                        <td>{OrderItem.ticketType}</td>
                                        <td>{OrderItem.tdStatus}</td>
                                    </tbody>
                                </table>
                            </div>

                        )}
                    </div>



                </div>


            </div>
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