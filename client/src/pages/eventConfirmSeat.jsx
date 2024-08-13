import React, { Component } from 'react'
import '../assets/event/eventPage3-2.css'
import { Link } from 'react-router-dom';
import yitaiImg from '../assets/images/events/event-yitai.jpg'
import seatImg from '../assets/images/ticketSeat.png'
import $ from 'jquery'


class EventConfirmSeat extends Component {
  state = {
    tickets: [
      { id: 'first', name: '1F搖滾區', price: 2800, remaining:2, quantity: 0 },
      { id: 'second', name: '2F座席區', price: 2000, remaining: 20, quantity: 0 },
      { id: 'third', name: '2F站席區', price: 1500, remaining: 20, quantity: 0 },
      { id: 'forth', name: '1F身障區', price: 1000, remaining: 20, quantity: 0 }
    ],
    openTicketId: null
  };
  toggleTicket = (ticketId) => {
    this.setState(prevState => ({
      openTicketId: prevState.openTicketId === ticketId ? null : ticketId
    }));
  }


  //  購買票數上限為4張
  handleQuantityChange = (ticketId, change) => {
    this.setState(prevState => {
      // 更新指定票券的數量與剩餘數量
      const updatedTickets = prevState.tickets.map(ticket => {
        if (ticket.id === ticketId) {
          const maxAllowedPurchase = Math.min(4, ticket.remaining);
          const newQuantity = Math.max(0, Math.min(maxAllowedPurchase, ticket.quantity + change));
          const actualChange = newQuantity - ticket.quantity;
          return {
            ...ticket,
            quantity: newQuantity,
            remaining: ticket.remaining - actualChange
          };
        }
        return ticket;
      });
  
      // 如果購買的數量大於 0，將其他票券的數量重置為 0
      const selectedTicket = updatedTickets.find(ticket => ticket.id === ticketId);
      if (selectedTicket.quantity > 0) {
        updatedTickets.forEach(ticket => {
          if (ticket.id !== ticketId) {
            ticket.quantity = 0;
          }
        });
      }
  
      return { tickets: updatedTickets };
    });
  }

  render() {
    return (
      <div className="w-bg scrollCust">
        <div className="framWrap">
          {/* 活動明細 */}
          <div className="eventName">
            <div className="eventImg">
              <img src={yitaiImg} alt="" />
            </div>
            <div className="eventTitle">
              <h1>王以太 《Love Me Later》 台北站</h1>
              <p>日期：2024-09-14</p>
              <p>時間： 19:30</p>
              <p>場次地點：Legacy Max 台北市信義區松壽路11號6樓</p>
            </div>
          </div>

          {/* 中間的線 */}
          <div className="middleLine">
            <p></p>
          </div>

          {/* 購買順序 */}
          <div className="order">
            <div className="ticketOrder">
              <div className="ticketOrder1">
                <span>1</span>
              </div>
              <div>
                <span>選擇票區</span>
              </div>
              <p></p>
            </div>

            <div class="ticketOrder">
              <div>
                <span>2</span>
              </div>
              <div>
                <span>確認明細</span>
              </div>
              <p></p>
            </div>

            <div className="ticketOrder">
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
          <div className="ticketChoose">
            <div className="ticketText">
              <h3>票區一覽</h3>
            </div>
            {/* 選擇票種 */}
            <div className="ticketSeat">
              <div className="seatImage">
                <img src={seatImg} alt="" />
              </div>



              <div className="seat">
        {this.state.tickets.map((ticket) => (
          <div key={ticket.id} className={`${ticket.id}Floor`}>
            <div className="seatName" onClick={() => this.toggleTicket(ticket.id)}>
              <div>
                <span>{ticket.name}</span>
                <div>
                  <span>剩餘</span>
                  <span id={`remaining${ticket.id}`}>{ticket.remaining}</span>
                </div>
              </div>
              <div>
                <span>NT${ticket.price}</span>
              </div>
            </div>
            <div className={`ticketName ${this.state.openTicketId === ticket.id ? 'active' : ''}`}>
              <div className="ticketCotent">
                <div>
                  <span>一般票</span>
                </div>
                <div className="ticketBtn">
                  <button 
                    className="decrement" 
                    onClick={() => this.handleQuantityChange(ticket.id, -1)}
                    data-target={`#quantity${ticket.id}`} 
                    data-remaining={`#remaining${ticket.id}`}
                  >
                    <i className="fa-solid fa-circle-minus"></i>
                  </button>
                  <span id={`quantity${ticket.id}`}>{ticket.quantity}</span>
                  <button 
                    className="increment" 
                    onClick={() => this.handleQuantityChange(ticket.id, 1)}
                    data-target={`#quantity${ticket.id}`} 
                    data-remaining={`#remaining${ticket.id}`}
                  >
                    <i className="fa-solid fa-circle-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>





            </div>
          </div>
          {/* 下一步按鍵 */}
          <div className="nextBtn">
          <Link to={`/Event/ConfirmInfo`}>
              下一步
            </Link>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.setupJQuery()
  }

  setupJQuery = () => {
    $('.seatName')
      .off('click')
      .on('click', function (e) {
        const $clickedTicketName = $(this).next('.ticketName')
        // off移除元素上之前綁定的所有點擊事件處理器
        $clickedTicketName.slideToggle()
        $('.ticketName').not($clickedTicketName).slideUp()
      })
  }



  
}

export default EventConfirmSeat
