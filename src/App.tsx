import { useEffect, useState } from 'react'
import './App.css'
import CheckoutForm from './checkoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
function App() {
  const [product , setProducts] = useState<any>([])

  

  useEffect(()=>{fetchProducts()},[])

  const fetchProducts = async () =>{
    const response = await fetch("http://localhost:3000/products")
    const data = await response.json();
    data.length = 10
    setProducts(data)
  }

  
  return (
      <CheckoutForm products ={product}/>
  )
}

export default App
