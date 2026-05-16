import React from "react";
import{createContext,useContext,useState} from "react";

const cartContext=createContext();

const updateQuantity = (productId, newQuantity) => {
  setCart(prev =>
    prev.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
};

const removeItem = (productId) => {
  setCart(prev => prev.filter(item => item.id !== productId));
};

export function CartProvider({children}){
    const [cart,setCart]=useState([]);
    const addToCart=(product,quantity)=>{
        setCart(prev=>{
            const existing=prev.find(item=>item.id===product.id);
            if (existing){
                return prev.map(item=>item.id===product.id?
                    {...item,quantity:item.quantity+quantity}
                    :
                    item
                );
            }
            return [...prev,{...product,quantity}];
        })
    }

    const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0);

     return (
    <cartContext.Provider value={{ cart, addToCart ,totalPrice, updateQuantity,removeItem}}>
      {children}
    </cartContext.Provider>
  );
};
export const useCart = () => useContext(cartContext);