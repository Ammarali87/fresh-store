import axios from "axios";
import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Product({product }){
  const [isLoading, setIsLoading] = useState(true);

  async function addToCart(){
    setIsLoading(false)
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId: product.id} , {
      headers :{
        token : localStorage.getItem("token")
      }
    })
    setIsLoading(true)  
   }    
  return (
     <div  className=" mx-auto text-center p-4">
    <Link to={`/deetails/${product.id}`}>
      <img src={product.imageCover} alt={product.title} className=" mt-3 mx-auto" />
      <h2>{product.title}</h2>
       <h6>{product.ratingsAverage}</h6>
    </Link>
    <button 
  disabled={!isLoading} 
  className="mt-3 bg-blue-400" 
  onClick={addToCart} 
>
  {!isLoading ? "loading":"add to cart"}
</button>

</div>

  
)

}





