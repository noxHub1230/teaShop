import React, { useState } from "react";
import { useAuth } from "./auth";
import "./AuthModel.css";

const validatePassword = (password) => {
  if (password.length < 8) {
    return "密碼至少需要 8 個字";
  }

  if (!/[A-Z]/.test(password)) {
    return "密碼需要至少 1 個英文大寫字母";
  }

  if (!/[a-z]/.test(password)) {
    return "密碼需要至少 1 個英文小寫字母";
  }

  if (!/[0-9]/.test(password)) {
    return "密碼需要至少 1 個數字";
  }

  return "";
};

export default function AuthModel() {
  const {
    isAuthModelOpen,
    closeAuthModel,
    login,
    register,
  } = useAuth();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModelOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    if (mode === "register") {
      const passwordError = validatePassword(password);

      if (passwordError) {
        setErrorMessage(passwordError);
        setLoading(false);
        return;
      }
    }

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
        setMode("login");
        setErrorMessage("註冊成功，請登入會員");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authOverlay">
      <div className="authPanel">
        <button className="authCloseBtn" onClick={closeAuthModel}>
          <i className="bi bi-x-lg"></i>
        </button>

        <h3>{mode === "login" ? "會員登入" : "會員註冊"}</h3>

        <form className="authForm" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="帳號：電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        <div className="passwordInputWrap">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="密碼：長度大於8，且包含英文大小寫"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
            type="button"
            className="passwordToggleBtn"
            onClick={() => setShowPassword((prev) => !prev)}
        >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
        </button>
        </div>

          {errorMessage && <p>{errorMessage}</p>}

          <button className="btn_cko" type="submit" disabled={loading}>
            {loading ? "處理中..." : mode === "login" ? "登入" : "註冊"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setMode(mode === "login" ? "register" : "login");
          }}
        >
          {mode === "login" ? "還沒有帳號？註冊" : "已有帳號？登入"}
        </button>
      </div>
    </div>
  );
}
