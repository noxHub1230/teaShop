import React from "react";
import { useLoading } from "./loading";
import "./loading.css";

export default function LoadingScreen() {
  // 取得目前是否 loading
  const { isLoading } = useLoading();

  // 如果沒有 loading，就不顯示任何東西
  if (!isLoading) return null;

  return (
    <div className="loadingOverlay">
      <div className="loadingBox">
        <div className="loadingSpinner"></div>
        <p>載入中...</p>
      </div>
    </div>
  );
}