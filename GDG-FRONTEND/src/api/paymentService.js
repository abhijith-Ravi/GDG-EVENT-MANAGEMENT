import { authUtils } from './authService';

const API_BASE = import.meta.env.VITE_API_URL || '';


function getAuthHeaders() {
  const token = authUtils.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function safeFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Failed to connect to backend server. Please make sure the Spring Boot application is running on port 8080.');
    }
    throw err;
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const paymentService = {
  /**
   * Step 1 – Create Razorpay order on the backend.
   * POST /payment/create-order  { eventId }
   * Returns { orderId, amount, currency, key }
   */
  createOrder: async (eventId) => {
    const response = await safeFetch(`${API_BASE}/payment/create-order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ eventId }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Failed to create payment order');
    }
    return response.json(); // PaymentResponse: { orderId, amount, currency, key }
  },

  /**
   * Step 2 – Verify payment signature on the backend.
   * POST /payment/verify  { razorpayOrderId, razorpayPaymentId, razorpaySignature }
   * Returns "Payment Verified Successfully." (200) or 400 on failure.
   */
  verifyPayment: async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
    const response = await safeFetch(`${API_BASE}/payment/verify`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    });
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    return true;
  },

  /**
   * Full flow: opens Razorpay checkout, verifies on backend.
   * Resolves with verified payment details on success.
   * Rejects if user dismisses or verification fails.
   */
  initiatePayment: async (eventId, eventName, userInfo) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) throw new Error('Failed to load Razorpay SDK');

    const order = await paymentService.createOrder(eventId);

    return new Promise((resolve, reject) => {
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency,
        name: 'GDG NMIT',
        description: eventName,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            await paymentService.verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );
            resolve({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
          } catch (err) {
            reject(new Error('Payment verification failed. Please contact support.'));
          }
        },
        prefill: {
          name: userInfo?.username || '',
          email: '',
        },
        theme: { color: '#4285F4' },
        modal: {
          ondismiss: () => reject(new Error('Payment cancelled by user')),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        reject(new Error(response.error?.description || 'Payment failed'));
      });
      rzp.open();
    });
  },
};
