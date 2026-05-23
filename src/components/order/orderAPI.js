const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

export async function insertOrderHistory(accessToken, userId, orderNumber, totalPrice, items) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/order_history`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      user_id: userId,
      order_number: orderNumber,
      total_price: totalPrice,
      items: items,
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error("訂單紀錄儲存失敗");
  return data;
}

export async function fetchOrderHistory(accessToken) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/order_history?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) throw new Error("訂單紀錄讀取失敗");
  return data;
}