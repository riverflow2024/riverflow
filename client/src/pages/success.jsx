import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // 請確保安裝了 js-cookie 包

const PaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const processedRef = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionId = urlParams.get('session_id');
    const isEventPayment = urlParams.get('event') === 'true';
    const token = Cookies.get('token'); // 從 cookie 中獲取 token

    if (sessionId && !processedRef.current) {
      processedRef.current = true;
      const endpoint = isEventPayment
        ? `http://localhost:3000/riverflow/events/Tobuy/event-payment-success`
        : `http://localhost:3000/riverflow/pay/payment-success`;

      console.log('Sending request to:', `${endpoint}?session_id=${sessionId}`);
      console.log('Token:', token); // 日誌記錄 token（注意：在生產環境中不要這樣做）

      fetch(`${endpoint}?session_id=${sessionId}`, {
        method: 'GET',
        credentials: 'include', // 這確保 cookies 被發送
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 將 token 添加到 Authorization 頭部
        }
      })
        .then(response => {
          console.log('Response status:', response.status);
          console.log('Response headers:', response.headers);
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`網絡回應不正常 (${response.status}): ${text}`);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Response data:', data);
          setPaymentStatus('success');
        })
        .catch(error => {
          console.error('錯誤:', error);
          setPaymentStatus('error');
          setErrorMessage(error.message || '處理您的付款時發生錯誤。');
        });
    }
  }, [location]);

  useEffect(() => {
    if (paymentStatus === 'success') {
      const timer = setTimeout(() => {
        navigate('/'); // 5秒後重定向到首頁
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus, navigate]);

  const renderContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="text-center">
            <div className="spinner"></div>
            <p className="mt-4 text-lg">正在處理您的付款...</p>
          </div>
        );
      case 'success':
        return (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p className="font-bold">付款成功！</p>
            <p>您的訂單已成功處理。5秒後將自動跳轉到首頁。</p>
          </div>
        );
      case 'error':
        return (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">付款錯誤</p>
            <p>{errorMessage}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-bg min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        {renderContent()}
        {errorMessage && (
          <div className="mt-4 text-red-500">
            <p>錯誤詳情：</p>
            <pre className="mt-2 p-2 bg-red-100 rounded">{errorMessage}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;