import React from "react";
import { Home, Search, PlusSquare, ShoppingBag, User, MessageCircle } from "lucide-react";

const tabs = [
  { id: "feed", label: "Feed", Icon: Home },
  { id: "explore", label: "Explorar", Icon: Search },
  { id: "market", label: "Shop", Icon: ShoppingBag },
  { id: "chat", label: "Chat", Icon: MessageCircle },
  { id: "profile", label: "Perfil", Icon: User },
];

export default function BottomNav({ currentTab, onTabChange }) {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "8px 0 20px",
      background: "rgba(0,0,0,0.97)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      flexShrink: 0,
      backdropFilter: "blur(20px)",
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const active = currentTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "6px 16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "all 0.2s ease",
            }}
          >
            <Icon
              size={24}
              strokeWidth={active ? 2.5 : 1.5}
              color={active ? "#fff" : "#666"}
              fill={active && (id === "feed" || id === "profile") ? "#fff" : "none"}
              style={{
                transition: "all 0.2s ease",
                filter: active ? "drop-shadow(0 0 8px rgba(255,255,255,0.3))" : "none",
              }}
            />
            <span style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "7px",
              letterSpacing: "1.5px",
              color: active ? "#ccc" : "#444",
              transition: "color 0.2s ease",
              textTransform: "uppercase",
            }}>
              {label}
            </span>
            {active && (
              <div style={{
                position: "absolute",
                bottom: "0",
                width: "20px",
                height: "2px",
                borderRadius: "1px",
                background: "linear-gradient(90deg, transparent, #fff, transparent)",
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
