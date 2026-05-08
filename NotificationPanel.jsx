import React from "react";
import { X, Heart, UserPlus, MessageSquare, Share2, AtSign, Megaphone } from "lucide-react";
import { NOTIFS_DATA } from "../data/mockData";

const typeIcons = {
  like: Heart,
  follow: UserPlus,
  comment: MessageSquare,
  share: Share2,
  tag: AtSign,
  promo: Megaphone,
};

export default function NotificationPanel({ onClose }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 600,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{
        marginTop: "auto",
        background: "#0a0a0a",
        borderTop: "1px solid rgba(200,200,200,0.15)",
        borderRadius: "20px 20px 0 0",
        maxHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        animation: "slideInUp 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}>
        {/* Handle */}
        <div style={{
          width: "36px",
          height: "3px",
          borderRadius: "2px",
          background: "rgba(255,255,255,0.12)",
          margin: "12px auto 0",
        }} />

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px 12px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "11px",
            letterSpacing: "3px",
            color: "#a8a8a8",
          }}>NOTIFICAÇÕES</span>
          <X
            size={18}
            color="#707070"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Notifications List */}
        <div style={{ overflowY: "auto", padding: "8px 0" }}>
          {NOTIFS_DATA.map((notif) => {
            const Icon = typeIcons[notif.type] || Heart;
            return (
              <div
                key={notif.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 18px",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.03)",
                  transition: "background 0.2s",
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>{notif.av}</div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "2px",
                  }}>
                    <span style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "10px",
                      color: "#d0d0d0",
                    }}>{notif.name}</span>
                    <Icon size={11} color="#555" />
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#707070",
                    marginBottom: "3px",
                  }}>{notif.msg}</div>
                  <div style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "9px",
                    color: "#404040",
                  }}>{notif.time}</div>
                </div>

                {/* Unread dot */}
                {notif.unread && (
                  <div style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#fff",
                    flexShrink: 0,
                    marginTop: "5px",
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
