import React, { Component } from 'react'
import '../assets/event/eventPage3-2.css'
import { Link, withRouter } from 'react-router-dom'  // 添加 withRouter
import yitaiImg from '../assets/images/events/event-yitai.jpg'
import seatImg from '../assets/images/ticketSeat.png'
import $ from 'jquery'
import axios from 'axios'
import Header from '../components/header'

class EventConfirmSeat extends Component {
  state = {
    event: {
      eventId: 1,
      eventType: 'DJ',
      eventName: '星空下的電音狂歡 <頂尖DJ戶外派對>',
      eventDesc:
        '準備好迎接一個難忘的夜晚吧！熱血派對夜將帶給你一場無與倫比的DJ戶外音樂盛宴。這次活動將在台北市市民廣場盛大舉行，這裡擁有開闊的空間和絕佳的音響效果，讓你在星空下盡情舞動，感受音樂的無限魅力。\n現場將設有一個巨型舞台，配備最先進的音響設備和炫酷的燈光效果，確保每一位參加者都能享受到頂級的音樂體驗。我們精心挑選了多位頂尖DJ，他們將帶來一系列高能量的電子音樂，從節奏強烈的電音到充滿律動感的混音，讓你在音樂的海洋中徹底釋放自我。\n除了音樂之外，活動現場還設有多個主題區域，包括美食區、飲品區和互動遊戲區。你可以在這裡品嚐到來自各地的美食，享受各種精選飲品，並參加趣味橫生的互動遊戲，贏取豐富獎品。\n現場還將設有專業的攝影團隊，捕捉每一個精彩瞬間，讓你留下最美好的回憶。我們還準備了多種派對小道具，如螢光棒、面具和飾品，讓你可以自由搭配，打造屬於自己的獨特造型。\n這次活動不僅是一場音樂派對，更是一個交友的平台。你將有機會結識來自不同地方、擁有共同興趣的朋友，一起分享對音樂的熱愛，共同創造美好的回憶。',
      eventDate: '2024-08-14T11:30:00.000Z',
      location: '台北市中山區濱江街5號',
      seat: 0,
      ticketType: [
        { "type": "1F搖滾區", "price": 2900, "stock": 30 }, 
        { "type": "2F座席區", "price": 2300, "stock": 100 },
        { "type": "2F站席區", "price": 2300, "stock": 100 },
        { "type": "1F身障區", "price": 1190, "stock": 100 }
      ],
      launchDate: '2024-07-25T12:00:00.000Z',
      launchStatus: 1,
      saleDate: '2024-08-07T07:00:00.000Z',
      eventImg: '/images/events/event-yitai.jpg',
      eventAnoc:
        '若信用卡刷卡付款失敗，會將刷卡失敗的訂單，陸續轉為【ATM虛擬帳號付款】，屆時請依的訂單顯示之「銀行帳號」、「銀行代碼」於「匯款期限」內完成付款，系統將以款項實際入帳時間為準，請於繳費後一小時至我的訂單確認，若訂單付款狀態顯示為「待繳費」，須等待銀行回傳付款狀態；若逾期未付款，系統收到銀行回傳付款狀態後將自動取消該筆訂單並顯示「付款失敗」，各家銀行轉帳入帳時間不同，請盡早繳款以保障您的權益。'
    },
    openTicketId: null,
    loading: true,
    error: null
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

  componentDidMount() {
    this.setupJQuery()
    const { id } = this.props.match.params
    console.log('Component mounted. Event ID:', id)
    if (id) {
      this.fetchEventDetails(id)
    } else {
      console.error('No ID provided in URL')
      this.setState({ error: '未提供活動ID', loading: false })
    }
  }



  fetchEventDetails = async (id) => {
    try {
      console.log('Fetching event details for ID:', id)
      const response = await axios.get(`http://localhost:3000/riverflow/events/${id}`)
      console.log('API Response:', response.data)
      if (response.data && response.data.length > 0) {
        const eventData = response.data[0]
        // 確保 ticketType 是一個數組
        // 檢查 ticketType 是否是字串並解析
      if (typeof eventData.ticketType === 'string') {
        try {
          eventData.ticketType = JSON.parse(eventData.ticketType);
        } catch (parseError) {
          console.error('解析 ticketType 時發生錯誤：', parseError);
          eventData.ticketType = [];
        }
      }
      
      eventData.ticketType = Array.isArray(eventData.ticketType) ? eventData.ticketType : [];
      this.setState({ event: eventData, loading: false });
      } else {
        throw new Error('No event data received')
      }
    } catch (error) {
      console.error('獲取活動詳情時出錯：', error)
      this.setState({
        loading: false,
        error: '無法獲取活動詳情',
        event: { ...this.state.event, ticketType: [] } // 確保有一個空數組
      })
    }
  }

  toggleTicket = (ticketType) => {
    this.setState((prevState) => ({
      openTicketType: prevState.openTicketType === ticketType ? null : ticketType
    }))
  }

  //  購買票數上限為4張
  handleQuantityChange = (ticketType, change) => {
    this.setState((prevState) => {
      const updatedTicketType = prevState.event.ticketType.map((ticket) => {
        if (ticket.type === ticketType) {
          const maxAllowedPurchase = Math.min(4, ticket.stock)
          const newQuantity = Math.max(0, Math.min(maxAllowedPurchase, (ticket.quantity || 0) + change))
          const actualChange = newQuantity - (ticket.quantity || 0)
          return {
            ...ticket,
            quantity: newQuantity,
            stock: ticket.stock - actualChange
          }
        }
        return ticket
      })

      // 如果購買的數量大於 0，將其他票券的數量重置為 0
      const selectedTicket = updatedTicketType.find((ticket) => ticket.type === ticketType)
    if (selectedTicket.quantity > 0) {
      updatedTicketType.forEach((ticket) => {
        if (ticket.type !== ticketType) {
          ticket.quantity = 0
        }
      })
    }

      return { event: {
        ...prevState.event,
        ticketType: updatedTicketType
      } }
    })
  }
  // 存取資料到下一頁
  handleNextStep = () => {
    const { event } = this.state;
    const selectedTickets = event.ticketType.filter(ticket => ticket.quantity > 0);
    
    this.props.history.push('/Event/ConfirmInfo', { 
      selectedTickets,
      eventDetails: {
        eventName: event.eventName,
        eventDate: event.eventDate,
        location: event.location,
        eventImg: event.eventImg
      }
    });
  }




  render() {
    const { event, loading, error } = this.state // 修改：解構 loading 和 error

   

    return (
      <div className="w-bg scrollCust">
        <Header />
        <div className="framWrap">
          {/* 活動明細 */}
          <div className="eventName">
            <div className="eventImg">
              <img src={event.eventImg} alt="" />
            </div>
            <div className="eventTitle">
              <h1>{event.eventName}</h1>
              <p>日期：{new Date(event.eventDate).toLocaleDateString()}</p>
              <p>時間：{new Date(event.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>場次地點：{event.location}</p>
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
              {event.ticketType.map((ticket, index) => (
                  <div key={ticket.type} className={`${['first', 'second', 'third', 'forth'][index]}Floor`}>
                    <div className="seatName" onClick={() => this.toggleTicket(ticket.type)}>
                      <div>
                        <span>{ticket.type}</span>
                        <div>
                          <span>剩餘</span>
                          <span id={`remaining${ticket.type}`}>{ticket.stock}</span>
                        </div>
                      </div>
                      <div>
                        <span>NT${ticket.price}</span>
                      </div>
                    </div>
                    <div className={`ticketName ${this.state.openTicketType === ticket.type ? 'active' : ''}`}>
                      <div className="ticketCotent">
                        <div>
                          <span>一般票</span>
                        </div>
                        <div className="ticketBtn">
                          <button
                            className="decrement"
                            onClick={() => this.handleQuantityChange(ticket.type, -1)}
                            data-target={`#quantity${ticket.type}`}
                            data-remaining={`#remaining${ticket.type}`}
                          >
                            <i className="fa-solid fa-circle-minus"></i>
                          </button>
                          <span id={`quantity${ticket.type}`}>{ticket.quantity || 0}</span>
                          <button
                            className="increment"
                            onClick={() => this.handleQuantityChange(ticket.type, 1)}
                            data-target={`#quantity${ticket.type}`}
                            data-remaining={`#remaining${ticket.type}`}
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
            <Link to={`/Event/ConfirmInfo`}>下一步</Link>
          </div>
        </div>
      </div>
    )
  }

  
  
  
}

export default EventConfirmSeat
