import React, { Component } from 'react';
import '../assets/member.css';
import Header from '../components/header'


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
        ProductFavorite: [
          {
            "productName":"王以太 演說家 幸存者 專輯",
            "productDesc":"演說家不用多說封神專輯 裡面的歌幾本都很頂，每天都還是會聽阿斯匹林，內涵CD+超長拉頁拼圖"

          },
        ]
    }
    render() {
        return (
            <div>
                 <Header />
                 <div class="Collection">
               

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
                   {this.state.ProductFavorite.map (productItem =>
                       <div class="order">

                           <div class="Img-box">
                               <img src={require("../assets/images/memberCollection.png")} alt="" />
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
export default MemberCollection;