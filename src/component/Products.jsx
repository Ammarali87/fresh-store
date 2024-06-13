import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Product from "./Product";
import Loading from "./Loading";
import { Helmet } from "react-helmet";
import { Offline, Online } from "react-detect-offline";

export default function Products() {

  async function getProducts() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return data.data;
  }

  const { data, error, isLoading } = useQuery("products", getProducts ,{
    cacheTime: 5000 , 
    refetchOnMount: false , 
    refetchOnReconnect : false , 
    // refetchInterval : 5000 , 
    enabled:true,
    staleTime:5000,
    refetchOnWindowFocus:true 
  });

   if (isLoading) {
    return <Loading/>
  }

  if (error) {
    return <div className="text-center">Error loading products</div>;
  }

  return (
    <div className="bg-rose-400 text-center max-h-[65vh]">
        <Helmet>
                <title> Fresh Store Products</title>
            </Helmet>
      <h3>Products</h3>
      <div className="product-list max-h-[77vh] mt-[55px] grid grid-cols-4">
        {data?.map((product, index) => (
          <div key={index} className="product-item">
            <Product product={product} />
          </div>
        ))}
        
      </div>
    </div>
  );
}
