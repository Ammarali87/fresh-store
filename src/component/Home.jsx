import React, { useContext, useEffect, useState } from "react";
import {  NavLink  } from "react-router-dom";
import { AuthorContext } from "../Mycontex/Authorcontext";
import axios from "axios";
import Loading from "./Loading";
import Product from "./Product";
import ProductSlider from "./ProductSlider";
import {Helmet} from "react-helmet";
import { Offline, Online } from "react-detect-offline";


export default function Home() {
  const { setIsLoggin } = useContext(AuthorContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setIsLoading(false);
      setProducts(data.data);
      console.log("data Route2 ",data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false); // Set loading to false even on error
    }
  }

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products/category');
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsLoading(false); // Set loading to false even on error
    }
  }

    
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-h-[65vh]">
                   <Helmet>
                <title> Fresh Store Home</title>
            </Helmet>
      <h1>Fresh Store</h1>
      <br/>
      <ProductSlider products={products}/>
      <div className="max-h-[77vh] mt-[55px] b-block grid grid-cols-4 ">
      {products?.map((product,index) => (
        <div className=" ">
          <br/>       <br/> <br/>
      <Product key={index}  product={product}/>
        </div>
      ))}
  


      <p className="mb-11 p-7 translate-x-[240px] bg-gray-300 md:w-[600px]">
  
    <Online>Only shown when you're online</Online>
    <Offline>Only shown offline (surprise!)</Offline>
    <br/>
    <br/>
    <br/>
        Don't have an account?{" "}
        <NavLink onClick={() => setIsLoggin(false)} to="register" className="text-blue-500 hover:underline">
          Register here
        </NavLink>
      </p>
    </div>
    </div>
  );
}







