import React, { useState } from "react";
import { ShoppingCart, SlidersHorizontal, Grid } from "lucide-react";
import { PRODUCTS_DATA, MARKET_CHIPS } from "../data/mockData";

export default function MarketScreen() {
  const [activeChip, setActiveChip] = useState(0);

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
          marginBottom: "14px",
        }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "2px",
          }}>MARKETPLACE</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "20px",
              padding: "5px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              color: "#a8a8a8",
              letterSpacing: "1px",
            }}>
              <SlidersHorizontal size={11} />
              FILTROS
            </div>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}>
              <Grid size={13} color="#a8a8a8" />
            </div>
          </div>
        </div>

        {/* Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
          border: "1px solid rgba(200,200,200,0.15)",
          borderRadius: "16px",
          padding: "18px",
          position: "relative",
          overflow: "hidden",
          marginBottom: "14px",
        }}>
          {/* Grid bg */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.5,
          }} />
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "15px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "4px",
            position: "relative",
            zIndex: 1,
          }}>DROPS EXCLUSIVOS</div>
          <div style={{
            fontSize: "11px",
            color: "#707070",
            marginBottom: "12px",
            position: "relative",
            zIndex: 1,
          }}>Coleção 2099 — disponível agora</div>
          <button style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "30px",
            padding: "8px 18px",
            fontFamily: "'Orbitron', monospace",
            fontSize: "9px",
            letterSpacing: "2.5px",
            color: "#707070",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
          }}>VER TUDO</button>
          <div style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "40px",
            opacity: 0.6,
          }}>💎</div>
        </div>

        {/* Category chips */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "12px",
        }}>
          {MARKET_CHIPS.map((chip, i) => (
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

      {/* Products Grid */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          padding: "0 16px 16px",
        }}>
          {PRODUCTS_DATA.map((product) => (
            <div
              key={product.id}
              style={{
                background: "#111",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              {/* Product Image */}
              <div style={{
                height: "110px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "42px",
                position: "relative",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}>
                {product.e}
                <div style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  borderRadius: "6px",
                  padding: "2px 7px",
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "7.5px",
                  letterSpacing: "1px",
                  background: product.tagType === "hot"
                    ? "rgba(255,255,255,0.12)"
                    : product.tagType === "new"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.04)",
                  border: product.tagType === "hot"
                    ? "1px solid rgba(255,255,255,0.2)"
                    : product.tagType === "new"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(255,255,255,0.08)",
                  color: product.tagType === "hot"
                    ? "#fff"
                    : product.tagType === "new"
                      ? "#a8a8a8"
                      : "#707070",
                }}>{product.tag}</div>
              </div>

              {/* Product Info */}
              <div style={{ padding: "10px 10px 12px" }}>
                <div style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "11px",
                  color: "#fff",
                  fontWeight: 700,
                  marginBottom: "2px",
                }}>{product.n}</div>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "9px",
                  color: "#404040",
                  marginBottom: "8px",
                }}>{product.brand}</div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span className="chrome-text" style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}>{product.price}</span>
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                    <ShoppingCart size={13} color="#aaa" />
                  </div>
                </div>
                <div style={{
                  fontSize: "9px",
                  color: "#404040",
                  fontFamily: "'Share Tech Mono', monospace",
                  marginTop: "5px",
                }}>{product.sales}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: "20px" }} />
      </div>
    </div>
  );
}
