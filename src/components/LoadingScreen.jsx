import { useState, useEffect } from "react";
import "./LoadingScreen.css";

const DURATION = 4000; // tổng thời gian load (ms)
const NAME = "Trần Ngọc Ánh Dương";

export default function LoadingScreen({ onFinish }) {
  const [percent, setPercent] = useState(0);
  const [hide, setHide] = useState(false);
  const [typed, setTyped] = useState("");

  // hiệu ứng gõ chữ tên
  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTyped(NAME.slice(0, i));
      if (i >= NAME.length) clearInterval(typeInterval);
    }, DURATION / NAME.length / 1.5);
    return () => clearInterval(typeInterval);
  }, []);

  // chạy % loading
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const next = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setPercent(next);

      if (next >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setHide(true);
          setTimeout(onFinish, 700);
        }, 400);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`loading-screen ${hide ? "loading-screen--hide" : ""}`}>
      <div className="loading-screen__glow" />

      <div className="loading-screen__content">
        <div className="loading-screen__ring">
          <svg viewBox="0 0 120 120" className="ring-svg">
            <circle className="ring-bg" cx="60" cy="60" r="52" />
            <circle
              className="ring-progress"
              cx="60"
              cy="60"
              r="52"
              style={{
                strokeDasharray: 327,
                strokeDashoffset: 327 - (327 * percent) / 100,
              }}
            />
          </svg>
          <span className="ring-percent">{percent}%</span>
        </div>

        <h1 className="loading-screen__name">
          {typed}
          <span className="cursor">|</span>
        </h1>
        <p className="loading-screen__role">Frontend Developer</p>
      </div>
    </div>
  );
}