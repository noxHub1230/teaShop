import React, { createContext, useCallback, useContext, useState } from "react";

// 建立 Loading Context，讓全站可以共用 loading 狀態
const loadingContext = createContext();

// LoadingProvider 負責保存目前是否正在 loading
export function LoadingProvider({ children }) {
  // isLoading 代表 loading 畫面是否顯示
    const [pendingCount, setPendingCount] = useState(0);

    const startLoading = useCallback(() => {
    setPendingCount((count) => count + 1);
    }, []);

    const stopLoading = useCallback(() => {
    setPendingCount((count) => Math.max(0, count - 1));
    }, []);

    const isLoading = pendingCount > 0;
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

  const waitForImages = (container) => {
  const images = Array.from(container.querySelectorAll("img"));

  const imagePromises = images.map((img) => {
    if (img.complete) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  return Promise.all(imagePromises);
    };

  const waitForFonts = () => {
  if (!document.fonts) {
    return Promise.resolve();
  }

  return document.fonts.ready;
    };

  const waitForPageAssets = useCallback(async (container) => {
  if (!container) return;

  await Promise.all([
    waitForImages(container),
    waitForFonts(),
  ]);
    }, []);

  // 把狀態和方法提供給整個 App 使用
  return (
    <loadingContext.Provider
      value={{
        isLoading,
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
