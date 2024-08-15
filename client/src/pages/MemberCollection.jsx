import React, { Component } from 'react';
import '../assets/member.css';
import axios from 'axios';
import Header from '../components/header'
import defaultImg from '../assets/images/defaultphoto.jpg'; // 預設會員圖片


class MemberCollection extends Component {
    state = {
        Users: {
            "firstName": "",
            "lastName": "",
            "phone": "",
            "email": "",
            "birth": "",
            "sex": "",
        },
        ProductFavorite: [
            {
                "productName": "名字",
                "productDesc": "描述",
                "productPrice": 250,
                "productImg": "../assets/images/products/product1_1.jpeg"
              },
        ],


        isLoading: true,      // 加载状态
        error: null
    }

    componentDidMount() {
        this.fetchUserData();
        this.fetchFavoritesData();

    }
    // 取得會員資料
    fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/riverflow/user', {
                withCredentials: true // 确保请求带上 Cookie
            });
            console.log("Fetched user data:", response.data); // 打印返回的数据
            this.setState({
                Users: response.data,
                isLoading: false
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            // 清除本地存储中的 Token，并重定向到登录页面
            localStorage.removeItem('token');
            this.setState({
                isLoading: false,
                error: 'Failed to fetch user data. Please log in again.'
            });
            // window.location.href = '/login';
        }
    };

    fetchFavoritesData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/riverflow/user/favorites', {
                withCredentials: true
            });
            console.log("Fetched order data:", response.data); // 打印返回的数据
            this.setState({
                ProductFavorite: response.data
            });
        } catch (error) {
            console.error("Error fetching order data:", error);
            this.setState({
                error: 'Failed to fetch order data.'
            });
        }


    };

     // 登出
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
        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }
        // 如果會員沒有照片就使用預設圖片
        const { userImg } = this.state.Users;
        const imageSrc = userImg ? `/images/users/${userImg}` : defaultImg;
        return (
            <div>
                <Header />
                <div class="Collection">


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
                                <button className='btn' onClick={this.Logout}>會員登出</button>
                            </div>
                        </div>

                    </div>
                    <div class="order-box" flex="2">

                        <h3>我的最愛</h3>
                        <div class="btn-box">
                            <button class="tablink" onClick={(e) => this.openPage('Collection', e.currentTarget, '3px solid var(--main)')} id="defaultOpen">商品</button>

                        </div>

                        <div id="Collection" class="tabcontent">
                        {this.state.ProductFavorite.map((productItem, index) => (
                                <div class="order" key={index}>

                                    <div class="Img-box">
                                        <img src={require(`${productItem.productImg}`)} alt="" />
                                    </div>
                                    <div class="container">
                                        <div class="wrap">
                                            <h3>{productItem.productName}</h3>
                                            <button class="closebtn"><i class="bi bi-x"></i></button>
                                        </div>
                                        <div class="wrap">
                                            <p>{productItem.productDesc}</p>
                                        </div>
                                        <div class="wrap">
                                            <span>金額  NT. $880</span>
                                            <button class="orderbtn">加入購物車</button>
                                        </div>
                                    </div>

                                </div>

                            ))}
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

    componentDidUpdate() {
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
export default MemberCollection;