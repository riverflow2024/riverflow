// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTickets } from '../TicketContext';
// import Swal from 'sweetalert2';
// import '../../src/assets/basic.css';
// import '../../src/assets/event/eventPage5.css';

// const EventOrder = () => {
//   const navigate = useNavigate();
//   const { selectedTickets } = useTickets();
//   const [eventDetails, setEventDetails] = useState({
//     image: "",
//     title: "",
//     date: "",
//     time: "",
//     location: ""
//   });
//   const [contactInfo, setContactInfo] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });
//   const [pickupMethod, setPickupMethod] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");

//   useEffect(() => {
//     // 模擬從 API 獲取活動詳情
//     setEventDetails({
//       image: "../assets/images/events/event-yitai.jpg",
//       title: "王以太 《Love Me Later》 台北站",
//       date: "2024-09-14",
//       time: "19:30",
//       location: "Legacy Max 台北市信義區松壽路11號6樓"
//     });

//     // 模擬從 API 獲取會員資料
//     setContactInfo({
//       name: "林小美",
//       email: "abc12345@gmail.com",
//       phone: "0912333555"
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setContactInfo(prev => ({ ...prev, [name]: value }));
//   };

//   const isFormValid = () => {
//     return contactInfo.name && contactInfo.email && contactInfo.phone &&
//            pickupMethod && paymentMethod;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isFormValid()) {
//       Swal.fire({
//         title: '訂單完成',
//         text: '謝謝您的購買!',
//         icon: 'success',
//         confirmButtonColor: '#98d900',
//         timer: 6000,
//         timerProgressBar: true,
//       }).then(() => {
//         navigate('/Member/Tickets');
//       });
//     }
//   };

//   const totalTickets = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
//   const totalCost = selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);

//   return (
//     <div className="w-bg scrollCust">
//       <div className="wrap container">
//         <div className="header"><img src="../../src/assets/images/indexImg/nav.jpg" alt="" /></div>

//         {/* 活動明細 */}
//         <div className="eventName">
//           <div className="eventImg">
//             <img src={eventDetails.image} alt={eventDetails.title} />
//           </div>
//           <div className="eventTitle">
//             <h1>{eventDetails.title}</h1>
//             <p>日期：{eventDetails.date}</p>
//             <p>時間： {eventDetails.time}</p>
//             <p>場次地點：{eventDetails.location}</p>
//           </div>
//         </div>

//         {/* 中間的線和購買順序 (保持不變) */}

//         {/* 聯絡人資訊 */}
//         <div className="ticketChoose">
//           <div className="ticketText">
//             <h3>聯絡人資訊</h3>
//           </div>
//           <div className="contact">
//             <div></div>
//             <div>
//               <div>
//                 <label htmlFor="contactName">顧客姓名</label>
//                 <br />
//                 <input
//                   type="text"
//                   id="contactName"
//                   name="name"
//                   placeholder="請輸入姓名"
//                   value={contactInfo.name}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="contactEmail">電子信箱</label>
//                 <br />
//                 <input
//                   type="email"
//                   id="contactEmail"
//                   name="email"
//                   placeholder="請輸入電子信箱"
//                   value={contactInfo.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="contactPhone">電話號碼</label>
//                 <br />
//                 <input
//                   type="tel"
//                   id="contactPhone"
//                   name="phone"
//                   placeholder="請輸入電話號碼"
//                   value={contactInfo.phone}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div></div>
//           </div>
//         </div>

//         {/* 取票方式 */}
//         <div className="ticketChoose">
//           <div className="ticketText">
//             <h3>取票方式</h3>
//           </div>
//           <div className="ticketTake">
//             <div className="takeTitle">
//               <label>
//                 <input
//                   type="radio"
//                   name="pickupMethod"
//                   value="ibon"
//                   checked={pickupMethod === "ibon"}
//                   onChange={(e) => setPickupMethod(e.target.value)}
//                 />
//                 <div>
//                   <p>ibon</p>
//                   <p>取票時，酌收30元手續費</p>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* 付款方式 */}
//         <div className="ticketChoose">
//           <div className="ticketText">
//             <h3>付款方式</h3>
//           </div>
//           <div className="ticketTake">
//             <div className="takeTitle">
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="creditCard"
//                   checked={paymentMethod === "creditCard"}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 />
//                 <div>
//                   <p>信用卡線上支付</p>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* 購票明細 */}
//         <div className="ticketChoose">
//           <div className="ticketText">
//             <h3>購票明細</h3>
//           </div>
//           <div className="ticketCotent">
//             <div><p></p></div>
//             <div className="contentTitle">
//               <div><span>票區</span></div>
//               <div><span>票種</span></div>
//               <div><span>金額</span></div>
//             </div>
//             <div><p></p></div>
//             {selectedTickets.map((ticket, index) => (
//               <React.Fragment key={index}>
//                 <div className="contentTitle">
//                   <div><span>{ticket.name}</span></div>
//                   <div><span>一般票</span></div>
//                   <div><span>NT${ticket.price}</span></div>
//                 </div>
//                 <div><p></p></div>
//               </React.Fragment>
//             ))}
//             <div className="cost">
//               <div></div>
//               <div>
//                 <span>共</span>
//                 <span>{totalTickets}</span>
//                 <span>張</span>
//               </div>
//               <div>
//                 <span>合計</span>
//                 <span>NT${totalCost}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 下一步按鍵 */}
//         <div className="nextBtn">
//           <button
//             className="nextStep"
//             disabled={!isFormValid()}
//             onClick={handleSubmit}
//           >
//             下一步
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventOrder;






// import React, { Component } from 'react';
// class EventOrder extends Component {
//     state = {  } 
//     render() { 
//         return (
//             <h1>11</h1>
//         );
//     }
// }
 
// export default EventOrder;




import React, { useState } from 'react';
import '../assets/event/eventPage5.css'
import yitaiImg from '../assets/images/events/event-yitai.jpg'

const EventOrder = () => {
  const [contactName, setContactName] = useState('林小美');
  const [contactEmail, setContactEmail] = useState('abc12345@gmail.com');
  const [contactPhone, setContactPhone] = useState('0912333555');
  const [ibonSelected, setIbonSelected] = useState(false);
  const [creditCardSelected, setCreditCardSelected] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    // 這裡應該添加訂單提交邏輯
    alert('訂單完成，謝謝您的購買!');
    // 跳轉頁面邏輯應該在這裡實現
  };

  const isNextStepEnabled = contactName && contactEmail && contactPhone && ibonSelected && creditCardSelected;

  return (
    <div className="wrap container">
      <div className="header">
        <img src="../../src/assets/images/indexImg/nav.jpg" alt="" />
      </div>

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

      <div className="middleLine">
        <p></p>
      </div>

      <div className="order">
        {/* 購買順序部分保持不變 */}
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
        <div className="ticketCotent">
          {/* 購票明細部分保持不變 */}
        </div>
      </div>

      <div className="nextBtn">
        <button
          className="nextStep"
          id="nextStep"
          disabled={!isNextStepEnabled}
          onClick={handleNextStep}
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default EventOrder;