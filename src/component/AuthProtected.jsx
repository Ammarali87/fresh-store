import React, { Children, useContext } from "react"
import { AuthorContext } from "../Mycontex/Authorcontext"
import Login from "./Login";
import Home from "./Home";
 
export default function AuthProtected({children}){

 const { isLoggin } = useContext(AuthorContext);
return (
  <div className=" text-center">
    
     { isLoggin ?  <Home/> : children}

  </div>
)

}

