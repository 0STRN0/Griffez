import React, { useState, useEffect } from "react";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1.5;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "#000",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "28px",
      animation: "fadeIn 0.5s ease",
    }}>
      {/* Grid Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        animation: "gridPulse 5s ease-in-out infinite",
      }} />

      {/* Scanline */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        animation: "scanline 6s linear infinite",
        pointerEvents: "none",
        zIndex: 100,
      }} />

      {/* Logo Ring */}
      <div style={{
        width: "140px",
        height: "140px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Ring 1 */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid transparent",
          background: "linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #fff, #444, #888, #222) border-box",
          animation: "rotateSlow 10s linear infinite",
        }} />
        {/* Ring 2 */}
        <div style={{
          position: "absolute",
          inset: "12px",
          borderRadius: "50%",
          border: "1px solid transparent",
          background: "linear-gradient(#000, #000) padding-box, linear-gradient(315deg, #fff, #444, #888, #222) border-box",
          animation: "counterRotate 7s linear infinite",
        }} />
        {/* Ring 3 */}
        <div style={{
          position: "absolute",
          inset: "24px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
        }} />
        <span className="chrome-text" style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "42px",
          fontWeight: 900,
          position: "relative",
          zIndex: 2,
        }}>G</span>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div className="chrome-text" style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "38px",
          fontWeight: 900,
          letterSpacing: "6px",
        }}>GRIFFERZ</div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "9px",
          letterSpacing: "5px",
          color: "#404040",
          marginTop: "6px",
          animation: "flicker 8s infinite",
        }}>FUTURE FASHION NETWORK</div>
      </div>

      {/* Progress */}
      <div style={{ width: "160px" }}>
        <div style={{
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "8px",
        }}>
          <div style={{
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, transparent, #fff, transparent)",
            transition: "width 0.1s linear",
          }} />
        </div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "9px",
          color: "rgba(255,255,255,0.2)",
          textAlign: "center",
          letterSpacing: "2px",
        }}>
          {progress < 100 ? `LOADING... ${Math.floor(progress)}%` : "INICIANDO..."}
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            background: i <= Math.floor((progress / 100) * 5)
              ? "rgba(255,255,255,0.6)"
              : "rgba(255,255,255,0.15)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>
    </div>
  );
}
