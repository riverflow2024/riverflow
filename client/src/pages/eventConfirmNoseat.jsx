import React, { Component } from 'react'
import styles from '../assets/event/eventPage3-2.module.css'

class EventConfirmNoseat extends Component {
  state = {}
  render() {
    return (
      <div className={`${styles.wrap} ${styles.container}`}>
        {/* 活動明細 */}
        <div className={styles.eventName}>
          <div className={styles.eventImg}>
            <img src="../assets/images/events/event-yitai.jpg" alt="" />
          </div>
          <div className={styles.eventTitle}>
            <h1>王以太 《Love Me Later》 台北站</h1>
            <p>日期：2024-09-14</p>
            <p>時間： 19:30</p>
            <p>場次地點：Legacy Max 台北市信義區松壽路11號6樓</p>
          </div>
        </div>

        {/* 中間的線 */}
        <div className={styles.middleLine}>
          <p></p>
        </div>
        {/* 購買順序 */}
        <div className={styles.order}>
          <div className={styles.ticketOrder}>
            <div>
              <span>1</span>
            </div>
            <div>
              <span>選擇票區</span>
            </div>
            <p></p>
          </div>

          <div className={styles.ticketOrder}>
            <div>
              <span>2</span>
            </div>
            <div>
              <span>確認明細</span>
            </div>
            <p></p>
          </div>

          <div className={styles.ticketOrder}>
            <div>
              <span>3</span>
            </div>
            <div>
              <span>確認資料</span>
            </div>
            <p></p>
          </div>
        </div>

        {/* 選擇票種數量 */}
        <div className={styles.ticketChoose}>
          <div className={styles.ticketText}>
            <h3>票區一覽</h3>
          </div>
          {/* 選擇票種 */}
          <div className={styles.ticketSeat}>
            <div className={styles.seatImage}>
              <img src="../../src/assets/images/ticketSeat.png" alt="" />
            </div>
            <div className={styles.seat}>
              {/* 一樓搖滾區 */}
              <div className={styles.firstFloor}>
                <div className={styles.seatName}>
                  <div>
                    <span>1F搖滾區</span>
                    <div>
                      <span>剩餘</span>
                      <span id="remaining">20</span>
                    </div>
                  </div>
                  <div>
                    <span>NT$2800</span>
                  </div>
                </div>
                {/* 加減數量 */}
                <div className={styles.ticketName}>
                  <div className={styles.ticketCotent}>
                    <div>
                      <span>一般票</span>
                    </div>
                    <div className={styles.ticketBtn}>
                      <button className={styles.decrement} data-target="#quantity" data-remaining="#remaining">
                        <i className="fa-solid fa-circle-minus"></i>
                      </button>
                      <span id="quantity">0</span>
                      <button className={styles.increment} data-target="#quantity" data-remaining="#remaining">
                        <i className="fa-solid fa-circle-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 二樓座席區 */}
              <div className={styles.secondFloor}>
                <div className={styles.seatName}>
                  <div>
                    <span>2F座席區</span>
                    <div>
                      <span>剩餘</span>
                      <span id="remaining1">20</span>
                    </div>
                  </div>
                  <div>
                    <span>NT$2000</span>
                  </div>
                </div>
                {/* 加減數量 */}
                <div className={styles.ticketName}>
                  <div className={styles.ticketCotent}>
                    <div>
                      <span>一般票</span>
                    </div>
                    <div className={styles.ticketBtn}>
                      <button className={styles.decrement} data-target="#quantity1" data-remaining="#remaining1">
                        <i className="fa-solid fa-circle-minus"></i>
                      </button>
                      <span id="quantity1">0</span>
                      <button className={styles.increment} data-target="#quantity1" data-remaining="#remaining1">
                        <i className="fa-solid fa-circle-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 二樓站席區 */}
              <div className={styles.thirdFloor}>
                <div className={styles.seatName}>
                  <div>
                    <span>2F站席區</span>
                    <div>
                      <span>剩餘</span>
                      <span id="remaining2">20</span>
                    </div>
                  </div>
                  <div>
                    <span>NT$1500</span>
                  </div>
                </div>
                {/* 加減數量 */}
                <div className={styles.ticketName}>
                  <div className={styles.ticketCotent}>
                    <div>
                      <span>一般票</span>
                    </div>
                    <div className={styles.ticketBtn}>
                      <button className={styles.decrement} data-target="#quantity2" data-remaining="#remaining2">
                        <i className="fa-solid fa-circle-minus"></i>
                      </button>
                      <span id="quantity2">0</span>
                      <button className={styles.increment} data-target="#quantity2" data-remaining="#remaining2">
                        <i className="fa-solid fa-circle-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 一樓身障區 */}
              <div className={styles.forthFloor}>
                <div className={styles.seatName}>
                  <div>
                    <span>1F身障區</span>
                    <div>
                      <span>剩餘</span>
                      <span id="remaining3">20</span>
                    </div>
                  </div>
                  <div>
                    <span>NT$1000</span>
                  </div>
                </div>
                {/* 加減數量 */}
                <div className={styles.ticketName}>
                  <div className={styles.ticketCotent}>
                    <div>
                      <span>一般票</span>
                    </div>
                    <div className={styles.ticketBtn}>
                      <button className={styles.decrement} data-target="#quantity3" data-remaining="#remaining3">
                        <i className="fa-solid fa-circle-minus"></i>
                      </button>
                      <span id="quantity3">0</span>
                      <button className={styles.increment} data-target="#quantity3" data-remaining="#remaining3">
                        <i className="fa-solid fa-circle-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 下一步按鍵 */}
        <div className={styles.nextBtn}>
          <a href="./eventPage4.html" id="nextBtn">
            下一步
          </a>
        </div>
      </div>
    )
  }
}

export default EventConfirmNoseat
