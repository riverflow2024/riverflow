import React, { Component } from 'react';
import styles from '../assets/event/eventPage1.module.css';

class EventConfirmSeat extends Component {
    state = {  } 
    render() { 
        return (
            <div className="wrap container">
            <div className="header"><img src="../../src/assets/images/indexImg/nav.jpg" alt="" /></div>
      
            {/* 活動明細 */}
            <div className="eventName">
              <div className="eventImg">
                <img src="https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_854/v1686313186/production/artworks/DJ_CONTEST_FINALE_1920x1080_zhvrs4"
                    alt="" />
              </div>
              <div className="eventTitle">
                <h1>星空下的電音狂歡 (DJ戶外派對)</h1>
                <p>日期：8/3</p>
                <p>時間： 20:00</p>
                <p>場次地點：大佳河濱公園 台北市中山區濱江街5號</p>
              </div>
            </div>
      
            {/* 中間的線 */}
            <div className="middleLine">
              <p></p>
            </div>
      
            <div className="order">
              <div className="ticketOrder">
                <div><span>1</span></div>
                <div><span>選擇票區</span></div>
                <p></p>
              </div>
      
              <div className="ticketOrder">
                <div><span>2</span></div>
                <div><span>確認明細</span></div>
                <p></p>
              </div>
      
              <div className="ticketOrder">
                <div><span>3</span></div>
                <div><span>確認資料</span></div>
                <p></p>
              </div>
            </div>
      
            {/* 選擇票種數量 */}
            <div className="ticketChoose">
              <div className="ticketText">
                <h3>選擇票種</h3>
              </div>
              <div className="ticketMan">
                <div>
                  <p>全票</p>
                </div>
                <div>
                  <p>NT.300</p>
                </div>
                <div className="ticketNumber">
                  <button className="decrement" data-target="#quantity1"><i className="fa-solid fa-circle-minus"></i></button>
                  <p id="quantity1">0</p>
                  <button className="increment" data-target="#quantity1"><i className="fa-solid fa-circle-plus"></i></button>
                </div>
              </div>
              <div className="ticketMiddle">
                <p></p>
              </div>
              <div className="ticketSpec">
                <div>
                  <p>身心障礙票</p>
                </div>
                <div>
                  <p>NT.200</p>
                </div>
                <div className="ticketNumber">
                  <button className="decrement" data-target="#quantity2"><i className="fa-solid fa-circle-minus"></i></button>
                  <p id="quantity2">0</p>
                  <button className="increment" data-target="#quantity2"><i className="fa-solid fa-circle-plus"></i></button>
                </div>
              </div>
            </div>
            {/* 下一步按鍵 */}
            <div className="ticketBtn">
              <a href="#" id="nextBtn">下一步</a>
            </div>
          </div>
        );
    }
}
 
export default EventConfirmSeat;