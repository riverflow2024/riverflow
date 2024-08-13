import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../src/assets/basic.css';
import '../../src/assets/event/eventPage4.css';
import yitaiImg from '../assets/images/events/event-yitai.jpg'

const EventConfirmInfo = () => {
    const [eventDetails, setEventDetails] = useState({
        image: "",
        title: "",
        date: "",
        time: "",
        location: ""
      });
    
      const [tickets, setTickets] = useState([]);
    
      useEffect(() => {
        // 模擬數據獲取
        setEventDetails({
          image: yitaiImg,
          title: "王以太 《Love Me Later》 台北站",
          date: "2024-09-14",
          time: "19:30",
          location: "Legacy Max 台北市信義區松壽路11號6樓"
        });
    
        setTickets([
          { area: "1F搖滾區", type: "一般票", price: 2800, quantity: 1 },
          { area: "1F搖滾區", type: "一般票", price: 2800, quantity: 1 }
        ]);
      }, []);
    
      const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
      const totalCost = tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);
    
      return (
        <div className="w-bg">
          <div className="framWrap">
            <div className="header"><img src="../../src/assets/images/indexImg/nav.jpg" alt="" /></div>
    
            <div className="eventName">
              <div className="eventImg">
                <img src={eventDetails.image} alt={eventDetails.title} />
              </div>
              <div className="eventTitle">
                <h1>{eventDetails.title}</h1>
                <p>日期：{eventDetails.date}</p>
                <p>時間： {eventDetails.time}</p>
                <p>場次地點：{eventDetails.location}</p>
              </div>
            </div>
    
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
                <div className="ticketOrder2"><span>2</span></div>
                <div><span>確認明細</span></div>
                <p></p>
              </div>
              <div className="ticketOrder">
                <div><span>3</span></div>
                <div><span>確認資料</span></div>
                <p></p>
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
            <Link to={`/Event/Order`}>下一步</Link>
            </div>
          </div>
        </div>
      );
    };

export default EventConfirmInfo;
