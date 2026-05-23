import React, { useEffect, useState} from "react";
import { createContext, useContext } from "react";
import { useAuth } from "../authModel/auth";
import {
  fetchCart,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from "./cartAPI";

const cartContext = createContext();

export function CartProvider({ children }) {
  const { user, accessToken } = useAuth();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("teaShop_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 未登入時同步 localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("teaShop_cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  // 登入後：合併訪客購物車 + 讀取雲端購物車
  useEffect(() => {
    if (!user || !accessToken) return;

    const syncCart = async () => {
      try {
        // 先把 localStorage 的訪客購物車合併進雲端
        const localCart = cart;
        for (const item of localCart) {
          await insertCartItem(accessToken,user.id, item.id, item.quantity).catch(
            async () => {
              // 如果已存在（UNIQUE 衝突），改用更新
              await updateCartItem(accessToken, item.id, item.quantity);
            }
          );
        }
        // 清掉 localStorage
        localStorage.removeItem("teaShop_cart");

        // 從雲端重新讀取最新購物車
        const cloudCart = await fetchCart(accessToken);
        setCart(cloudCart.map((item) => ({ id: item.product_id, quantity: item.quantity })));
      } catch (err) {
        console.error("購物車同步失敗", err);
      }
    };

    syncCart();
  }, [user, accessToken]);

  const addToCart = async (product, quantity) => {
    if (user && accessToken) {
      // 登入狀態：操作雲端
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        await updateCartItem(accessToken,product.id, existing.quantity + quantity);
      } else {
        await insertCartItem(accessToken, user.id,product.id, quantity);
      }
      const cloudCart = await fetchCart(accessToken);
      setCart(cloudCart.map((item) => ({ id: item.product_id, quantity: item.quantity })));
    } else {
      // 未登入：操作 localStorage
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (user && accessToken) {
      await updateCartItem(accessToken, productId, newQuantity);
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = async (productId) => {
    if (user && accessToken) {
      await deleteCartItem(accessToken, productId);
    }
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCartAll = async () => {
    if (user && accessToken) {
      await clearCart(accessToken);
    }
    setCart([]);
    localStorage.removeItem("teaShop_cart");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <cartContext.Provider
      value={{ cart, addToCart, totalPrice, updateQuantity, removeItem, clearCartAll }}
    >
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => useContext(cartContext);