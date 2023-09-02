/* eslint-disable @typescript-eslint/no-explicit-any */
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';


export const stripePromise  = loadStripe('');


const CheckoutForm = ({products}:any) => {
  const [stripe , setStripe] = useState<Promise<Stripe|null>>(stripePromise);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!stripe)
    {
      alert("No Stripe")
      return 
    }
    const st = await stripe
    st?.redirectToCheckout({
      lineItems: products.map((product: { priceId: { toString: () => any; }; })=>({price:product.priceId.toString() , quantity:2})),
      mode: 'payment',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'yogesh@email.com',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={!stripe}>Submit</button>
    </form>
  )
};

export default CheckoutForm;