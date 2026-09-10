import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const pointer = { x: null, y: null };

    const isMobile = window.innerWidth <= 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- Desktop: mouse ----
    const onMouseMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onMouseLeave = () => {
      pointer.x = null;
      pointer.y = null;
    };

    // ---- Mobile: touch ----
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      pointer.x = null;
      pointer.y = null;
    };

    if (isMobile) {
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    } else {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseleave", onMouseLeave);
    }

    // Giảm số lượng dots trên mobile để mượt & đỡ tốn pin
    const dotCount = isMobile ? 16 : 30;
    const linkDist = isMobile ? 70 : 90;
    const pointerDist = isMobile ? 100 : 120;

    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fill();
      });

      // đường nối giữa các dots
      dots.forEach((a, i) => {
        dots.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / linkDist) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // đường nối từ con trỏ (chuột hoặc ngón tay) đến dots gần
      if (pointer.x !== null) {
        dots.forEach((d) => {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < pointerDist) {
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(d.x, d.y);
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / pointerDist) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      if (isMobile) {
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      } else {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}