 import React, { useContext } from "react"
import { NavLink, Navigate } from "react-router-dom"
import { AuthorContext } from "../Mycontex/Authorcontext";

 export default function Navbar(){
    const { isLoggin, setIsLoggin } = useContext(AuthorContext);

     function logOut(){
         setIsLoggin(false)
         Navigate("/login")
         localStorage.removeItem("token")
     }
  return (
    
    <div className="sticky top-[-77%] bg-red-500">
          { isLoggin ? <div> 
              
          <nav className="bg-white      border-gray-200 dark:bg-gray-900">
             <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
             <NavLink to={""} className="text-lg p-2 mt-3 hover:bg-green-100 " >
                 
                 <div className="flex items-center space-x-3 rtl:space-x-reverse">
                     <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                     <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Fresh Store</span>
                 </div>
                 
                 </NavLink>
                 <div className="flex items-center space-x-6 rtl:space-x-reverse">
                     
                 </div>
             </div>
          </nav>
          <nav className="  mb-7     bg-gray-100 dark:bg-gray-700">
             <div className="max-w-screen-xl px-4 py-3 mx-auto">
                 <div className="flex items-center">
                     <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                         
                         <li>
                         <NavLink to={""} className="text-lg  hover:text-red-300 " >Homepage</NavLink>
                         </li>
                         <li>
                         <NavLink to={"allorders"} className="text-lg  hover:text-red-300 " >Order</NavLink>
                         </li>
                         <li>
                         <NavLink to={"products"} className="text-lg  hover:text-red-300 " >Products</NavLink>
                         </li>
                         <li>
                         <NavLink to={"cart"} className="text-lg  hover:text-red-300 " >Cart</NavLink>
                         </li>
                     </ul>
                    
                     <button className="  ms-auto  bg-gray-200" onClick={ logOut }> Sign out </button>
                 </div>
             </div>
          </nav>
                         </div>
        
        : ""
          
          }

   </div>

  ) }