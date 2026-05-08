import React, { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { CHIPS_DATA, TRENDS_DATA, DISC_DATA } from "../data/mockData";

export default function ExploreScreen() {
  const [activeChip, setActiveChip] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#000",
    }}>
      {/* Header */}
      <div style={{ padding: "14px 16px 0", flexShrink: 0 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "2px",
          }}>EXPLORAR</span>
          <span style={{
            fontSize: "11px",
            color: "#707070",
            cursor: "pointer",
          }}>VER TUDO</span>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <Search size={16} style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.3,
            color: "#fff",
          }} />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar tendências, marcas, estilos..."
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "13px 16px 13px 40px",
              color: "#fff",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "15px",
              width: "100%",
              outline: "none",
              transition: "border-color 0.3s",
            }}
          />
        </div>

        {/* Chips */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "12px",
        }}>
          {CHIPS_DATA.map((chip, i) => (
            <button
              key={chip}
              onClick={() => setActiveChip(i)}
              style={{
                flexShrink: 0,
                padding: "7px 16px",
                borderRadius: "20px",
                fontFamily: "'Orbitron', monospace",
                fontSize: "9px",
                letterSpacing: "1.5px",
                cursor: "pointer",
                transition: "all 0.2s",
                border: i === activeChip
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.1)",
                background: i === activeChip
                  ? "#fff"
                  : "rgba(255,255,255,0.04)",
                color: i === activeChip ? "#000" : "#707070",
                boxShadow: i === activeChip ? "0 0 15px rgba(255,255,255,0.15)" : "none",
              }}
            >{chip}</button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Trending */}
        <div style={{ padding: "0 16px 12px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TrendingUp size={14} color="#a8a8a8" />
              <span style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "9px",
                letterSpacing: "3.5px",
                color: "#a8a8a8",
              }}>EM ALTA AGORA</span>
            </div>
          </div>

          {TRENDS_DATA.map((trend) => (
            <div
              key={trend.r}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              <div style={{
                width: "26px",
                height: "26px",
                borderRadius: "8px",
                background: trend.r <= 3 ? "rgba(255,255,255,0.07)" : "#111",
                border: trend.r <= 3 ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Orbitron', monospace",
                fontSize: "9px",
                color: trend.r <= 3 ? "#fff" : "#707070",
                flexShrink: 0,
              }}>#{trend.r}</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "12px",
                  color: "#fff",
                  fontWeight: 700,
                }}>{trend.tag}</div>
                <div style={{
                  fontSize: "10px",
                  color: "#404040",
                  fontFamily: "'Share Tech Mono', monospace",
                  marginTop: "2px",
                }}>{trend.posts}</div>
              </div>
              {trend.hot && (
                <div style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "7px",
                  padding: "2px 8px",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "8px",
                  color: "#d0d0d0",
                  letterSpacing: "1px",
                }}>HOT</div>
              )}
            </div>
          ))}
        </div>

        {/* Discover Grid */}
        <div style={{ padding: "8px 0 4px 16px", marginBottom: "8px" }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "9px",
            letterSpacing: "3.5px",
            color: "#a8a8a8",
          }}>DESCUBRA</span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3px",
          padding: "0 3px 3px",
        }}>
          {DISC_DATA.map((item, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                background: "#111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "opacity 0.2s",
              }}
            >
              {item.e}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                padding: "8px 6px 5px",
                fontFamily: "'Orbitron', monospace",
                fontSize: "7px",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.5)",
                textAlign: "center",
              }}>{item.l}</div>
            </div>
          ))}
        </div>

        <div style={{ height: "20px" }} />
      </div>
    </div>
  );
}
