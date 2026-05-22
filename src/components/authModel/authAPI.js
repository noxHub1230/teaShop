const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const authErrorMessages = {
  "Invalid login credentials": "帳號或密碼錯誤",
  "Email not confirmed": "請先完成 Email 驗證",
  "Token has expired or is invalid": "驗證碼已過期或錯誤",
  "missing email or phone":"尚未填入Email"
};

const getErrorMessage = (data, fallback) =>
  authErrorMessages[data?.error_description] ||
  authErrorMessages[data?.msg] ||
  data?.msg ||
  data?.error_description ||
  fallback;

export async function signUpWithEmail(email, password) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "註冊失敗"));
  }

  return data;
}

export async function signInWithEmail(email, password) {
  const response = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "登入失敗"));
  }

  return data;
}

export async function getCurrentUser(accessToken) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: "GET",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "取得會員資料失敗"));
  }

  return data;
}

export async function signOut(accessToken) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(getErrorMessage(data, "登出失敗"));
  }

  return true;
}
