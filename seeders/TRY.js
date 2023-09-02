import axios from 'axios'
/** 
 * mention you secret key over here to link it with stripe API
 * 
 * Note : Dont provide any process.env data it might not work ( feel free to check it out ,it might :p )
 */
import Stripe from 'stripe';

const stripe = new Stripe('')

/**
 * The API to get all the datas(products) from the database should be mentioned here
 */
const fetchProductsURL = "http://localhost:3000/products"

/**
 * The default image when there is no image string present in the application
 */
const defaultImageIfnoImage = "https://images.unsplash.com/photo-1546760888-ef9d7caee133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"

/**
 * It gives the URL for the product that should be updated according to the id provided. Feel free to update it according to the needs
 * 
 * @param {*} id Product Id 
 * @returns URL for updating that product 
 */
const getProductPutUrl=(id) => "http://localhost:3000/products/"+id


/**
 * 
 * This function will use stripe package and will inject the products 
 * in the stripe api. returning a prompt that will show you what product
 * you injected to the strip database. This will fetch the data from your backend
 * and will update it using the put architechture. 
 * 
 */
const seedProducttoStripe = async () =>{
  try{
  const response = await axios.get(fetchProductsURL)
  const products = response.data;
  for (const productData of products) {
    const product = await stripe.products.create({
      name: productData.name,
      description: productData.description,
      images: productData.image !== "" ?[productData.image]: [defaultImageIfnoImage]
    });
    const price = await stripe.prices.create({
      unit_amount: Math.round(productData.price),
      currency: "USD",
      product: product.id,
    });
    await axios.put(getProductPutUrl(productData.id),{ ...productData, priceId:price.id})
    console.log(`Product "${productData.name}" created with price id ${price.id}`);
  }
  }
  catch(e){
    console.log("The server is not responding ", e )
  }
}

/**
 * Invoking the function that will append the data to the database
 */
seedProducttoStripe()


