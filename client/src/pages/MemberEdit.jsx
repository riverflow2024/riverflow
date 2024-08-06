import React, { Component } from 'react';
import '../assets/member.css';



class MemberEdit extends Component {
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
            <div>
                <header>
                    <img src={require('../assets/images/indexImg/nav.jpg')} alt="" />
                </header>

                <section class="Member" >

                    <div class="nav-box" flex="1">
                        <div class="wrap">
                            <div class="member">
                                <div class="member-img">
                                    <img class="img" src={require('../assets/images/defaultphoto.jpg')} />
                                    <label class="prettier-input">
                                        <input type="file" />
                                        <div>
                                            上傳<br />大頭貼
                                        </div>
                                    </label>
                                </div>
                                <div class="profile">
                                    <h3>Hey！小明</h3>
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
                                <label>您的姓氏</label><br />
                                <input type="text" name="" id="" placeholder="王" />
                            </div>
                            <div class="input-card">
                                <label>您的名字</label><br />
                                <input type="text" name="" id="" placeholder="小明" />
                            </div>
                            <div class="input-card">
                                <label>聯絡電話</label><br />
                                <input type="tel" id="phone" name="phone" pattern="^09[0-9]{2}-[0-9]{3}-[0-9]{3}" placeholder="0912-345-678" required/>
                            </div>
                                <span class="tips" id="phoneTips" ></span> <br></br>
                            <div class="input-card">
                                <label>您的帳號</label><br />
                                <input type="email" name="" id="" placeholder="abc12345@gmail.com" disabled="disabled" />
                            </div>
                            <div class="input-date">
                                <label>您的生日</label><br />
                                <input type="date" name="" id="" placeholder="" />
                            </div>
                            <div class="input-card">
                                <label>您的性別</label><br />
                                <select name="" id="">
                                    <option value="">男</option>
                                    <option value="">女</option>
                                </select>
                            </div>
                            <div class="btn-box">
                                <input type="button" value="查看個人資料" onClick={this.backMember} />
                                <input type="button" value="修改密碼" onClick={this.verifyClick} />
                                <input type="button" value="儲存" onClick={this.updateClick}  />
                            </div>
                        </form>


                    </div>


                </section>

               





            </div>




        );
    }
    backMember = async () => {
        // var id = this.props.match.params.id;
        // await axios.delete(`http://localhost:8000/todo/delete/${id}`)
        window.location = "/Member/Index";
    }
    verifyClick = async () => {
        // var id = this.props.match.params.id;
        // await axios.delete(`http://localhost:8000/todo/delete/${id}`)
        window.location = "/Login/Verify";
    }
    updateClick = async () => {
        // var id = this.props.match.params.id;
        // await axios.delete(`http://localhost:8000/todo/delete/${id}`)
        // window.location = "/Member/Index";

        if(phone.validity.patternMismatch){
            phoneTips.innerHTML = `<i class="bi bi-asterisk"></i> 不符合手機資料規則`;
            // phone.reportValidity();
        }else if (phone.validity.valueMissing){
            phoneTips.innerHTML = `<i class="bi bi-asterisk"></i> 請輸入手機號碼`;
        }else{
            phoneTips.innerHTML =``
        }

        
    }

}
export default MemberEdit;