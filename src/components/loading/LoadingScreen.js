import React, { useEffect, useState, useRef } from "react";
import { useLoading } from "./loading";
import "./loading.css";

export default function LoadingScreen() {
  const { isLoading, progress } = useLoading();

  const [displayProgress, setDisplayProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const rafRef = useRef(null);
  const currentRef = useRef(0);

  // loading 開始時顯示；結束後先跑到 100% 再淡出
  useEffect(() => {
    if (isLoading) {
      setFadeOut(false);
      setVisible(true);
      currentRef.current = 0;
      setDisplayProgress(0);
    } else if (visible) {
      const finishAndFade = () => {
        setFadeOut(true);
        const timer = setTimeout(() => {
          setVisible(false);
          setDisplayProgress(0);
          currentRef.current = 0;
        }, 700);
        return () => clearTimeout(timer);
      };

      if (currentRef.current < 100) {
        const interval = setInterval(() => {
          currentRef.current = Math.min(currentRef.current + 2, 100);
          setDisplayProgress(currentRef.current);
          if (currentRef.current >= 100) {
            clearInterval(interval);
            finishAndFade();
          }
        }, 10);
        return () => clearInterval(interval);
      } else {
        return finishAndFade();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // 平滑追蹤實際 progress（easing）
  useEffect(() => {
    if (!isLoading) return;
    const target = progress;

    const animate = () => {
      const diff = target - currentRef.current;
      if (Math.abs(diff) < 0.5) {
        currentRef.current = target;
        setDisplayProgress(target);
        return;
      }
      const step = Math.max(diff * 0.08, 0.5);
      currentRef.current = Math.min(currentRef.current + step, target);
      setDisplayProgress(Math.round(currentRef.current));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress, isLoading]);

  if (!visible) return null;

  // progress=0 → cover 高度 100%（全遮）；progress=100 → 0%（全露）
  const coverHeight = `${100 - displayProgress}%`;

  return (
    <div className={`ls-overlay${fadeOut ? " ls-overlay--fadeout" : ""}`}>
      <div className="ls-logo-wrap">
        {/* 底層：原始 logo 圖片（可不顯示，tint 層會蓋上去） */}
        <div className="ls-logo" />

        {/* 染色層：accent 色 + logo PNG 形狀遮罩 → 呈現淡米色 logo */}
        <div className="ls-tint" style={{ opacity: displayProgress / 100 }}/>

        {/* 進度遮罩：從頂部往下，高度隨 progress 縮小，逐漸露出染色 logo */}
        <div className="ls-cover" style={{ height: coverHeight }} />
      </div>

      <div className="ls-percent">{Math.round(displayProgress)}%</div>
    </div>
  );
}