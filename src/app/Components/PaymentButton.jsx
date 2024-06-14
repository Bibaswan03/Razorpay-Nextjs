// components/PaymentButton.js
"use client"
import { useState } from 'react';

const PaymentButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    // Call your backend to create an order
    const res = await fetch('http://localhost:3000/api/create-order', {
      method: 'POST',
    });
    const data = await res.json();
    console.log(data); 
    if (!data) {
      setIsLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: data.amount,
      currency: data.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: data.id,
      handler: async function (response) {
        // Verify the payment on the server
        console.log(response)
        const verificationRes = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: data.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });

        const verificationData = await verificationRes.json();
        if (verificationData.status === 'success') {
          alert('Payment verified successfully');
        } else {
          alert('Payment verification failed');
        }
      },
      prefill: {
        name: 'Your Name',
        email: 'your.email@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? 'Loading...' : 'Pay with Razorpay'}
    </button>
  );
};

export default PaymentButton;
