import React, { useContext } from 'react';
import { AuthorContext } from '../Mycontex/Authorcontext';

export default function Order() {
  let {userData} =  useContext(AuthorContext)
   console.log(userData)
  return (
    <div className="min-h-[60vh] bg-rose-500 text-center">
     <h2>Order</h2>
    </div>
  );
}
