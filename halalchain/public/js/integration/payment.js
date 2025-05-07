import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const processPayment = async (paymentData) => {
  const stripe = await stripePromise;
  
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: paymentData.priceId, quantity: 1 }],
    mode: 'payment',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  });

  if (error) throw error;
};