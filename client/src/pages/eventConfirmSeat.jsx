import React, { Component } from 'react'
import styles from '../assets/event/eventPage3-1.module.css'
// import '../utils/eventConfirmSeat.js'

class EventConfirmSeat extends Component {
  state = {
    quantities: { quantity1: 0, quantity2: 0 },
    isNextButtonDisabled: true
  }

  handleIncrement = (target) => {
    this.setState((prevState) => {
      const newQuantities = { ...prevState.quantities }
      newQuantities[target] = newQuantities[target] < 4 ? newQuantities[target] + 1 : newQuantities[target]
      return { quantities: newQuantities }
    }, this.updateButtonState)
  }

  handleDecrement = (target) => {
    this.setState((prevState) => {
      const newQuantities = { ...prevState.quantities }
      newQuantities[target] = newQuantities[target] > 0 ? newQuantities[target] - 1 : newQuantities[target]
      return { quantities: newQuantities }
    }, this.updateButtonState)
  }

  updateButtonState = () => {
    const totalQuantity = Object.values(this.state.quantities).reduce((a, b) => a + b, 0)
    this.setState({ isNextButtonDisabled: totalQuantity === 0 })
  }

  componentDidMount() {
    this.updateButtonState()
  }
  render() {
    return (
      <div className={styles.wrap}>
        <div className="header">
          <img src="../../src/assets/images/indexImg/nav.jpg" alt="" />
        </div>

        {/* 活動明細 */}
        <div className={styles.eventName}>
          <div className={styles.eventImg}>
            <img
              src="https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_854/v1686313186/production/artworks/DJ_CONTEST_FINALE_1920x1080_zhvrs4"
              alt=""
            />
          </div>
          <div className={styles.eventTitle}>
            <h1>星空下的電音狂歡 (DJ戶外派對)</h1>
            <p>日期：8/3</p>
            <p>時間： 20:00</p>
            <p>場次地點：大佳河濱公園 台北市中山區濱江街5號</p>
          </div>
        </div>

        {/* 中間的線 */}
        <div className={styles.middleLine}>
          <p></p>
        </div>

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
            <h3>選擇票種</h3>
          </div>
          <div className={styles.ticketMan}>
            <div>
              <p>全票</p>
            </div>
            <div>
              <p>NT.300</p>
            </div>
            <div className={styles.ticketNumber}>
              <button className={styles.decrement} onClick={() => this.handleDecrement('quantity1')}>
                <i className="fa-solid fa-circle-minus"></i>
              </button>
              <p>{this.state.quantities.quantity1}</p>
              <button className={styles.increment} onClick={() => this.handleIncrement('quantity1')}>
                <i className="fa-solid fa-circle-plus"></i>
              </button>
            </div>
          </div>
          <div className={styles.ticketMiddle}>
            <p></p>
          </div>
          <div className={styles.ticketSpec}>
            <div>
              <p>身心障礙票</p>
            </div>
            <div>
              <p>NT.200</p>
            </div>
            <div className={styles.ticketNumber}>
              <button className={styles.decrement} onClick={() => this.handleDecrement('quantity2')}>
                <i className="fa-solid fa-circle-minus"></i>
              </button>
              <p>{this.state.quantities.quantity2}</p>
              <button className={styles.increment} onClick={() => this.handleIncrement('quantity2')}>
                <i className="fa-solid fa-circle-plus"></i>
              </button>
            </div>
          </div>
        </div>
        {/* 下一步按鍵 */}
        <div className={styles.ticketBtn}>
          <a href="#" id="nextBtn" className={this.state.isNextButtonDisabled ? styles['link-disabled'] : ''}>
            下一步
          </a>
        </div>
      </div>
    )
  }
}

export default EventConfirmSeat
