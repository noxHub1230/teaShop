import React, { createContext, useCallback, useContext, useState, useEffect } from "react";

// 建立 Loading Context，讓全站可以共用 loading 狀態
const loadingContext = createContext();

// LoadingProvider 負責保存目前是否正在 loading，以及載入進度
export function LoadingProvider({ children }) {
  const [pendingCount, setPendingCount] = useState(0);
  // progress: 0~100，代表目前的載入進度百分比
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback(() => {
    setPendingCount((count) => count + 1);
    setProgress(0);
  }, []);

  const stopLoading = useCallback(() => {
    setPendingCount((count) => Math.max(0, count - 1));
  }, []);

  const isLoading = pendingCount > 0;

  // 鎖定/解鎖頁面滾動
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  // 等待所有圖片載入，並且逐張回報進度
  const waitForImages = (container, onProgress) => {
    const images = Array.from(container.querySelectorAll("img"));

    // 沒有圖片時直接回報 100%
    if (images.length === 0) {
      onProgress(100);
      return Promise.resolve();
    }

    let loadedCount = 0;

    const imagePromises = images.map((img) => {
      // 已經載好的圖片直接計入
      if (img.complete && img.naturalWidth > 0) {
        loadedCount++;
        onProgress(Math.round((loadedCount / images.length) * 100));
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        const handleDone = () => {
          loadedCount++;
          onProgress(Math.round((loadedCount / images.length) * 100));
          resolve();
        };
        img.addEventListener("load", handleDone, { once: true });
        img.addEventListener("error", handleDone, { once: true });
      });
    });

    return Promise.all(imagePromises);
  };

  // 等待字型載入
  const waitForFonts = () => {
    if (!document.fonts) {
      return Promise.resolve();
    }
    return document.fonts.ready;
  };

  // 同時等待圖片與字型，並依圖片進度更新 progress
  const waitForPageAssets = useCallback(async (container) => {
    if (!container) return;

    // 字型沒有進度事件，與圖片並行跑，但進度只由圖片決定
    await Promise.all([
      waitForImages(container, (imgProgress) => {
        setProgress(imgProgress);
      }),
      waitForFonts(),
    ]);

    // 確保最終是 100%
    setProgress(100);
  }, []);

  return (
    <loadingContext.Provider
      value={{
        isLoading,
        progress,
        startLoading,
        stopLoading,
        waitForPageAssets,
      }}
    >
      {children}
    </loadingContext.Provider>
  );
}

// 自訂 hook，讓其他元件可以用 useLoading()
export const useLoading = () => useContext(loadingContext);