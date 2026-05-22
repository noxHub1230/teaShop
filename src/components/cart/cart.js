import React , {useEffect} from "react";
import{createContext,useContext,useState} from "react";

const cartContext=createContext();

export function CartProvider({children}){
    // 初始化時，先從 localStorage 拿資料
    // 就像「開店前先把昨天的訂單從抽屜拿出來」
    const [cart, setCart] = useState(() => {
        try {
        const saved = localStorage.getItem('teaShop_cart');
        return saved ? JSON.parse(saved) : [];
        } catch {
        return [];
        }
    });

    // 每次 cart 有變動，就存進 localStorage
    // 就像「每次有新訂單就把它放進抽屜備份」
    useEffect(() => {
        localStorage.setItem('teaShop_cart', JSON.stringify(cart));
    }, [cart]);

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

    const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0);

     return (
    <cartContext.Provider value={{ cart, addToCart ,totalPrice, updateQuantity,removeItem}}>
      {children}
    </cartContext.Provider>
  );
};
export const useCart = () => useContext(cartContext);