import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../assets/event/eventPage5.css'
import Header from '../components/header'

const EventOrder = () => {
  const location = useLocation();
  const [eventDetails, setEventDetails] = useState({});
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [contactName, setContactName] = useState('林小美')
  const [contactEmail, setContactEmail] = useState('abc12345@gmail.com')
  const [contactPhone, setContactPhone] = useState('0912333555')
  const [ibonSelected, setIbonSelected] = useState(false)
  const [creditCardSelected, setCreditCardSelected] = useState(false)

  useEffect(() => {
    if (location.state) {
      const { eventDetails, tickets, totalTickets, totalCost } = location.state
      setEventDetails(eventDetails)
      setTickets(tickets)
      setTotalTickets(totalTickets)
      setTotalCost(totalCost)
    }
  }, [location])

  const handleNextStep = (e) => {
    e.preventDefault()
    // 這裡應該添加訂單提交邏輯
    alert('訂單完成，謝謝您的購買!')
    // 跳轉頁面邏輯應該在這裡實現
  }

  const isNextStepEnabled = contactName && contactEmail && contactPhone && ibonSelected && creditCardSelected

  return (
    <div className="framWrap container">
      <Header />
      <div className="header">
        <img src="../../src/assets/images/indexImg/nav.jpg" alt="" />
      </div>

      <div className="eventName">
        <div className="eventImg">
          <img src={eventDetails.image} alt="" />
        </div>
        <div className="eventTitle">
          <h1>{eventDetails.title}</h1>
          <p>日期：{eventDetails.date}</p>
          <p>時間：{eventDetails.time}</p>
          <p>場次地點：{eventDetails.location}</p>
        </div>
      </div>

      <div className="middleLine">
        <p></p>
      </div>

      <div className="order">
        <div className="ticketOrder">
          <div>
            <span>1</span>
          </div>
          <div>
            <span>選擇票區</span>
          </div>
          <p></p>
        </div>
        <div className="ticketOrder">
          <div>
            <span>2</span>
          </div>
          <div>
            <span>確認明細</span>
          </div>
          <p></p>
        </div>
        <div className="ticketOrder">
          <div className="ticketOrder3">
            <span>3</span>
          </div>
          <div>
            <span>確認資料</span>
          </div>
          <p></p>
        </div>
      </div>

      <div className="ticketChoose">
        <div className="ticketText">
          <h3>聯絡人資訊</h3>
        </div>
        <div className="contact">
          <div></div>
          <div>
            <div>
              <label htmlFor="contactName">顧客姓名</label>
              <br />
              <input
                type="text"
                id="contactName"
                name="contactName"
                placeholder="請輸入姓名"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contactEmail">電子信箱</label>
              <br />
              <input
                type="text"
                id="contactEmail"
                name="contactEmail"
                placeholder="請輸入電子信箱"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contactPhone">電話號碼</label>
              <br />
              <input
                type="text"
                id="contactPhone"
                name="contactPhone"
                placeholder="請輸入電話號碼"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <div className="ticketChoose">
        <div className="ticketText">
          <h3>取票方式</h3>
        </div>
        <div className="ticketTake">
          <div className="takeTitle">
            <label htmlFor="fee">
              <input
                type="radio"
                name="fee"
                id="fee"
                checked={ibonSelected}
                onChange={() => setIbonSelected(!ibonSelected)}
              />
              <div>
                <p>ibon</p>
                <p>取票時，酌收30元手續費</p>
              </div>
            </label>
          </div>
        </div>
        
      </div>

      <div className="ticketChoose">
        <div className="ticketText">
          <h3>付款方式</h3>
        </div>
        <div className="ticketTake">
          <div className="takeTitle">
            <label htmlFor="credit">
              <input
                type="radio"
                name="credit"
                id="credit"
                checked={creditCardSelected}
                onChange={() => setCreditCardSelected(!creditCardSelected)}
              />
              <div>
                <p>信用卡線上支付</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="ticketChoose">
              <div className="ticketText">
                <h3>購票明細</h3>
              </div>
              <div className="ticketDetail">
                <div>
                  <p></p>
                </div>
                <div className="contentTitle">
                  <div>
                    <span>票區</span>
                  </div>
                  <div>
                    <span>票種</span>
                  </div>
                  <div>
                    <span>金額</span>
                  </div>
                </div>
                <div>
                  <p></p>
                </div>
                {tickets.map((ticket, index) => (
                  <React.Fragment key={index}>
                    <div className="contentTitle">
                      <div>
                        <span>{ticket.area}</span>
                      </div>
                      <div>
                        <span>{ticket.type}</span>
                      </div>
                      <div>
                        <span>NT${ticket.price}</span>
                      </div>
                    </div>
                    <div>
                      <p></p>
                    </div>
                  </React.Fragment>
                ))}
                <div className="cost">
                  <div></div>
                  <div>
                    <span>共</span>
                    <span>{totalTickets}</span>
                    <span>張</span>
                  </div>
                  <div>
                    <span>合計</span>
                    <span>NT${totalCost}</span>
                  </div>
                </div>
              </div>
            </div>

      <div className="nextBtn">
        <button className="nextStep" id="nextStep" disabled={!isNextStepEnabled} onClick={handleNextStep}>
          下一步
        </button>
      </div>
    </div>
  )
}

export default EventOrder
