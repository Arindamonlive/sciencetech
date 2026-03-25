import React, { useEffect, useState } from "react";

const DotBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("dotCanvasHero");
    const ctx = canvas.getContext("2d");

    let width, height;
    let dots = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      dots = Array.from({ length: 150 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot, i) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#8b5cf6";
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const dx = dot.x - dots[j].x;
          const dy = dot.y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${1 - dist / 120})`;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <canvas
      id="dotCanvasHero"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
};

const HeroSection = ({ title = "ScienceTech", subtitle, yearEnd = 2026 }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [year, setYear] = useState(2021);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let current = 2021;
    const interval = setInterval(() => {
      current++;
      setYear(current);
      if (current === yearEnd) clearInterval(interval);
    }, 400);

    return () => clearInterval(interval);
  }, [yearEnd]);

  return (
    <div
      style={{
        position: "relative",
        height: isMobile ? "60vh" : "80vh",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: isMobile ? "40px 15px" : "80px 20px"
      }}
    >
      <DotBackground />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <h1
          style={{
            fontSize: isMobile ? "32px" : "clamp(40px, 8vw, 110px)",
            fontWeight: "900",
            color: "#111827",
          }}
        >
          {title.split("Tech")[0]}
          <span style={{ color: "#a78bfa" }}>Tech</span>{" "}
          {year}
        </h1>

        <p
          style={{
            fontSize: isMobile ? "14px" : "20px",
            color: "#000",
            marginTop: "10px"
          }}
        >
          {subtitle || "Science Exhibition & Technical Debate"}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;