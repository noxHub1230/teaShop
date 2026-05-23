import React, { useState , useEffect} from "react";
import { useAuth } from "./auth";
import { sendPasswordResetEmail, updatePassword } from "./authAPI";
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
    authInitialMode,
    accessToken,
  } = useAuth();

  const [mode, setMode] = useState(authInitialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
      setMode(authInitialMode);
    }, [authInitialMode]);
  
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
      } else if (mode === "register") {
        await register(email, password);
        setMode("login");
        setErrorMessage("註冊成功，請登入會員");
      } else if (mode === "forgot") {
        await sendPasswordResetEmail(email);
        setErrorMessage("重設連結已寄出，請至信箱查收");
      } else if (mode === "reset") {
      if (newPassword !== confirmPassword) {
        setErrorMessage("兩次密碼輸入不一致");
        setLoading(false);
        return;
      }
      const passwordError = validatePassword(newPassword);
      if (passwordError) {
        setErrorMessage(passwordError);
        setLoading(false);
        return;
      }
      await updatePassword(accessToken, newPassword);
      setErrorMessage("密碼重設成功，請重新登入");
      setMode("login");
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

        <h3>{mode === "login" ? "會員登入" : 
            mode==="register"?"會員註冊":
            mode==="forgot"?"忘記密碼":
            "重設密碼"}</h3>

        <form className="authForm" onSubmit={handleSubmit}>
        {mode !== "reset" && (
          <input
            type="email"
            placeholder="帳號：電子信箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        {mode!=="forgot"&&mode!=="reset"&&(
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
        )}
        {mode === "reset" && (
  <>
    <div className="passwordInputWrap">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="新密碼"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        type="button"
        className="passwordToggleBtn"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
      </button>
    </div>
    <div className="passwordInputWrap">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="確認新密碼"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
  </>
        )}
          {errorMessage && <p>{errorMessage}</p>}

          <button className="btn_cko" type="submit" disabled={loading}>
          {loading ? "處理中..." : 
          mode === "login" ? "登入" : 
          mode === "register" ? "註冊" : 
          mode === "forgot" ? "寄送重設連結":
          "確認重設密碼"}          
          </button>
        </form>
        {mode !== "reset" && (
          <>
            {mode === "login" && (
              <button type="button" onClick={() => { setErrorMessage(""); setMode("forgot"); }}>
                忘記密碼？
              </button>
            )}
            <button type="button" onClick={() => { 
              setErrorMessage(""); 
              setMode(mode === "register" ? "login" : mode === "forgot" ? "login" : "register"); 
            }}>
              {mode === "login" ? "還沒有帳號？註冊" : "已有帳號？登入"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
