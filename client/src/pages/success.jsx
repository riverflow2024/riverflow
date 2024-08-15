import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState('處理中...');
  const location = useLocation();
  const processedRef = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');
    const isEventPayment = urlParams.get('event') === 'true';

    if (sessionId && !processedRef.current) {
      processedRef.current = true; // 標記為已處理
      const endpoint = isEventPayment
        ? `http://localhost:3000/riverflow/events/Tobuy/event-payment-success?session_id=${sessionId}`
        : `http://localhost:3000/riverflow/pay/payment-success?session_id=${sessionId}`;

      fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('網絡回應不正常');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setPaymentStatus('支付成功！');
        })
        .catch(error => {
          console.error('錯誤:', error);
          setPaymentStatus('支付處理時發生錯誤。');
        });
    }
  }, [location]);

  return (
    <div className="w-bg">
      <header>
        {/* 頁首內容 */}
      </header>

      <div style={{ marginTop: '100px', fontSize: '24px', textAlign: 'center' }}>
        <h1>{paymentStatus}</h1>
        <p>{paymentStatus === '支付成功！' ? '您的訂單已成功處理。' : '正在處理您的訂單...'}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;