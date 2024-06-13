import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {Helmet} from "react-helmet";
 
export default function Cart() {
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {cartId } = useParams()
  // Function to create checkout session
  async function checkOut() {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/6668ed92ed0dc0016cde7ad9',
        {
          shippingAddress: {
            details: "details",
            phone: "01010700999",
            city: "Cairo"
          }
        },
        {
          headers: {
            token: localStorage.getItem("token") // Retrieve token from local storage
          },
          params: {
            url: "https://vitejsvitek3nqwb-0bcn--5173--c3e5e364.local-credentialless.webcontainer.io" // Parameter for the URL
          }
        }
      );
      console.log("Checkout session created !:", cartId, data); // Log the response data
    } catch (error) {
      console.error("Error creating checkout session:", error); 
    }
  }

  // Function to fetch cart data for logged-in user
  async function getLoggedUserCart() { 
    setIsLoading(true);

    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsLoading(false);
    }
  }  

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  // Function to remove a specific item from cart
  async function removeCartItem(productId) {
    try {
      const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCartData(data); // Update cart data after removal
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  }  

  // Function to clear the entire cart
  async function clearCart() {
    try {
      const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCartData({data:{products:[]}}); // Update cart data after clearing
      alert("Cart has been cleared.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }  

  return (
    <div className="bg-rose-400 mt-[-33px] max-h-[80vh] text-center">
          <Helmet>
                <title> Fresh Cart</title>
            </Helmet>
      <h3>Cart</h3>
      <button
        disabled={isLoading}
        onClick={clearCart}
        className="block mx-auto text-red-500 border-red-500 px-4 rounded"
      >
        { !isLoading ? "Clear Cart" : "Loading" }
      </button>

      {isLoading && <Loading />}

      {!isLoading && cartData?.data.products.length === 0 && (
        <div>
          <h1 className="text-center my-14">Empty Cart</h1>
          <br/> <br/>
        </div>
      )}

      {!isLoading && 
        <>
          {cartData?.data.products.map((product, index) => (
            <div key={index} className="bg-rose-400 flex justify-between p-5 shadow mb-3">
              <img src={product.product.imageCover} className="w-[30%]" alt={product.product.title} />
              <div className="ms-3 flex flex-col justify-center">
                <h3 className="font-bold">{product.product.title}</h3>
                <p className="text-green-400">{product.product.category.name}</p>
                <p>{product.price} EGP</p>
                <p>{product.product.ratingsAverage} <i className="fa-regular fa-star text-yellow-400"></i></p>
              </div>
              <div className="flex flex-col justify-between">
                <button onClick={() => removeCartItem(product.product._id)} className="text-red-500">
                  <i className="fa-solid fa-trash"></i> Remove
                </button>
                <div className="flex items-center mt-4">
                  <button className="mx-2 px-2 rounded-md border">+</button>
                  <span>{product.count}</span>
                  <button className="mx-2 px-2 rounded-md border">-</button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex  mt-5 mx-8  justify-between ">
            <Link to={"/address/"+ cartData?.data._id} className="mb-16 text-gray-800 w-[111px] py-2 rounded bg-teal-500 hover:bg-teal-400" onClick={checkOut}> Check out</Link>
            <h2 > total Price is : $ {cartData?.data.totalCartPrice}</h2>
          </div>
        </>
      }
    </div>
  );
}




