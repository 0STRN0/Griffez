import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, Chrome } from "lucide-react";

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      setError("Preencha usuário e senha");
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      animation: "fadeIn 0.5s ease",
    }}>
      {/* Top Section */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "60px 32px 32px",
        position: "relative",
        minHeight: "240px",
      }}>
        {/* Background effects */}
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            animation: "gridPulse 5s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            width: "100%",
            height: "1.5px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            animation: "scanline 6s linear infinite",
          }} />
          <div style={{
            position: "absolute",
            top: "-60px",
            left: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.025), transparent 70%)",
            animation: "floatOrb 8s ease-in-out infinite",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="chrome-text" style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "36px",
            fontWeight: 900,
            letterSpacing: "5px",
            marginBottom: "6px",
          }}>GRIFFERZ</div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "8px",
            letterSpacing: "5px",
            color: "#404040",
          }}>FUTURE FASHION NETWORK</div>
        </div>
      </div>

      {/* Bottom Form */}
      <div style={{
        padding: "28px 28px 40px",
        background: "rgba(8,8,8,0.98)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "18px",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "1px",
          marginBottom: "4px",
        }}>ENTRAR</h2>
        <p style={{ fontSize: "13px", color: "#707070", marginBottom: "24px" }}>
          Acesse sua conta exclusiva
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background: "rgba(255,60,60,0.08)",
            border: "1px solid rgba(255,60,60,0.2)",
            borderRadius: "10px",
            padding: "10px 14px",
            marginBottom: "14px",
            fontSize: "12px",
            color: "#ff8888",
            animation: "slideDown 0.3s ease",
          }}>
            {error}
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "8px",
            letterSpacing: "2px",
            color: "#707070",
            display: "block",
            marginBottom: "7px",
          }}>USUÁRIO</label>
          <div style={{ position: "relative" }}>
            <User size={15} style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.35,
              color: "#fff",
            }} />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && document.getElementById("pass-input")?.focus()}
              placeholder="@seu_usuário"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "13px 16px 13px 42px",
                color: "#fff",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "15px",
                width: "100%",
                outline: "none",
                transition: "border-color 0.3s, background 0.3s",
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "8px",
            letterSpacing: "2px",
            color: "#707070",
            display: "block",
            marginBottom: "7px",
          }}>SENHA</label>
          <div style={{ position: "relative" }}>
            <Lock size={15} style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.35,
              color: "#fff",
            }} />
            <input
              id="pass-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="••••••••"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "13px 42px 13px 42px",
                color: "#fff",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "15px",
                width: "100%",
                outline: "none",
                transition: "border-color 0.3s, background 0.3s",
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.4,
                padding: "4px",
                color: "#fff",
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <span style={{
            fontSize: "11px",
            color: "#707070",
            cursor: "pointer",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}>Esqueci a senha</span>
        </div>

        {/* Buttons */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            marginBottom: "12px",
            background: "linear-gradient(135deg, #2a2a2a, #1a1a1a, #222)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "30px",
            padding: "13px 32px",
            fontFamily: "'Orbitron', monospace",
            fontSize: "11px",
            letterSpacing: "2.5px",
            color: "#f0f0f0",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          ACESSAR
        </button>

        <button
          onClick={onLogin}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "30px",
            padding: "12px 32px",
            fontFamily: "'Orbitron', monospace",
            fontSize: "11px",
            letterSpacing: "2.5px",
            color: "#707070",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          MODO DEMO
        </button>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0",
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
          <span style={{
            fontSize: "10px",
            color: "#404040",
            fontFamily: "'Share Tech Mono', monospace",
            letterSpacing: "2px",
          }}>OU</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Social */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {["Google", "Apple"].map((name) => (
            <button
              key={name}
              onClick={onLogin}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "12px",
                color: "#a8a8a8",
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                transition: "background 0.2s",
              }}
            >
              <Chrome size={14} />
              {name}
            </button>
          ))}
        </div>

        <div style={{ textAlign: "center", fontSize: "12px", color: "#707070" }}>
          Não tem conta?{" "}
          <span
            onClick={onLogin}
            style={{ color: "#f0f0f0", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >Criar conta grátis</span>
        </div>
      </div>
    </div>
  );
}
