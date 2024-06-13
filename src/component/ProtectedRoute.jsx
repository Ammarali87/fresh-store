import React, { Children, useContext } from "react"
import { AuthorContext } from "../Mycontex/Authorcontext"
import Login from "./Login";
import Home from "./Home";
 
export default function ProtectedRoute({children}){

 const { isLoggin } = useContext(AuthorContext);
return (
  <div className=" text-center">
    
     { isLoggin ?  children : <Login/>}

  </div>
)

}

