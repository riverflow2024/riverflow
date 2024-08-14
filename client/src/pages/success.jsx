import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState('處理中...');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      fetch(`http://localhost:3000/riverflow/pay/payment-success?session_id=${sessionId}`)
        .then(response => response.text())
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
        {/* Header content */}
        {/* You can create a separate Header component and import it here */}
      </header>

      <div style={{ marginTop: '100px', fontSize: '24px', textAlign: 'center' }}>
        <h1>{paymentStatus}</h1>
        <p>{paymentStatus === '支付成功！' ? '您的訂單已成功處理。' : '正在處理您的訂單...'}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;