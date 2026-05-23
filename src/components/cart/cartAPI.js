const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const headers = (accessToken) => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${accessToken}`,
  "Content-Type": "application/json",
});

// 讀取會員的雲端購物車
export async function fetchCart(accessToken) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/carts?select=*`, {
    headers: headers(accessToken),
  });
  const data = await response.json();
  if (!response.ok) throw new Error("讀取購物車失敗");
  return data; // 回傳 [{id, user_id, product_id, quantity}, ...]
}

// 新增一筆到雲端購物車
export async function insertCartItem(accessToken, userId,product_id, quantity) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/carts`, {
    method: "POST",
    headers: {
      ...headers(accessToken),
      Prefer: "return=representation",
    },
    body: JSON.stringify({ user_id: userId, product_id, quantity }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error("新增購物車失敗");
  return data;
}

// 更新數量
export async function updateCartItem(accessToken, product_id, quantity) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/carts?product_id=eq.${product_id}`,
    {
      method: "PATCH",
      headers: {
        ...headers(accessToken),
        Prefer: "return=representation",
      },
      body: JSON.stringify({ quantity }),
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error("更新購物車失敗");
  return data;
}

// 刪除一筆
export async function deleteCartItem(accessToken, product_id) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/carts?product_id=eq.${product_id}`,
    {
      method: "DELETE",
      headers: headers(accessToken),
    }
  );
  if (!response.ok) throw new Error("刪除購物車失敗");
  return true;
}

// 清空整個購物車
export async function clearCart(accessToken, userId) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/carts?user_id=eq.${userId}`,
    {
      method: "DELETE",
      headers: headers(accessToken),
    }
  );
  if (!response.ok) throw new Error("清空購物車失敗");
  return true;
}