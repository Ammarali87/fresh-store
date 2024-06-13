import React , {createContext} from "react"


 export const Mycontext =  createContext(0)

   export default function MycontextProvider({children}){
      const [count , setCount ] = React.useState(0)
      
    return (
       <Mycontext.Provider value={{count , setCount}}>
           {children}        
       </Mycontext.Provider>
     )
   }
