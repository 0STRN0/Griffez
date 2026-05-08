import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, ArrowLeft, Phone, Video, MoreHorizontal, Smile, Paperclip, Send, BadgeCheck } from "lucide-react";
import { CHATS_DATA, CONV_MSGS } from "../data/mockData";

/* ========= Chat Conversation ========= */
function ChatConversation({ chat, onClose }) {
  const [messages, setMessages] = useState([...CONV_MSGS]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [...prev, { t: input.trim(), s: true, time }]);
    setInput("");
  };

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: "#000",
      display: "flex",
      flexDirection: "column",
      zIndex: 500,
      animation: "slideInRight 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <ArrowLeft
          size={22}
          color="#fff"
          onClick={onClose}
          style={{ cursor: "pointer", opacity: 0.7 }}
        />
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "#1a1a1a",
          border: chat.on ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}>{chat.av}</div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "12px",
            color: "#fff",
            fontWeight: 700,
          }}>{chat.u}</div>
          <div style={{
            fontSize: "10px",
            marginTop: "2px",
            color: chat.on ? "rgba(255,255,255,0.5)" : "#404040",
          }}>
            {chat.on ? "● online agora" : "● offline"}
          </div>
        </div>
        <div style={{ display: "flex", gap: "14px", opacity: 0.4 }}>
          <Phone size={18} color="#fff" style={{ cursor: "pointer" }} />
          <Video size={18} color="#fff" style={{ cursor: "pointer" }} />
          <MoreHorizontal size={18} color="#fff" style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}>
        <div style={{
          textAlign: "center",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "9px",
          color: "rgba(255,255,255,0.15)",
          margin: "8px 0",
          letterSpacing: "2px",
        }}>HOJE · 14:20</div>

        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.s ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "72%",
              padding: "10px 14px",
              borderRadius: msg.s ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              fontSize: "13px",
              lineHeight: 1.4,
              background: msg.s
                ? "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.07))"
                : "rgba(255,255,255,0.07)",
              border: msg.s
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid rgba(255,255,255,0.1)",
              color: msg.s ? "#fff" : "#f0f0f0",
            }}>
              {msg.t}
              <div style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.25)",
                marginTop: "4px",
                textAlign: "right",
                fontFamily: "'Share Tech Mono', monospace",
              }}>{msg.time}{msg.s ? " ✓✓" : ""}</div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px 16px 16px 4px",
          padding: "12px 16px",
          display: "flex",
          gap: "4px",
          alignItems: "center",
          alignSelf: "flex-start",
        }}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <div key={i} style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
              animation: `typingDot 1.2s infinite ${delay}s`,
            }} />
          ))}
        </div>

        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px 24px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <Smile size={20} color="#fff" style={{ opacity: 0.4, cursor: "pointer", flexShrink: 0 }} />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Mensagem..."
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "22px",
            padding: "10px 16px",
            color: "#fff",
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "14px",
            width: "100%",
            outline: "none",
            flex: 1,
          }}
        />
        <Paperclip size={16} color="#fff" style={{ opacity: 0.3, cursor: "pointer" }} />
        <div
          onClick={sendMessage}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: input.trim() ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(200,200,200,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          <Send size={14} color="#fff" />
        </div>
      </div>
    </div>
  );
}

/* ========= Chat Screen ========= */
export default function ChatScreen({ selectedChat, showConversation, onOpenChat, onCloseChat }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = CHATS_DATA.filter((c) =>
    c.u.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#000",
      position: "relative",
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
          }}>MENSAGENS</span>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            borderRadius: "20px",
            padding: "5px 12px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            color: "#f0f0f0",
            letterSpacing: "1px",
          }}>
            <Plus size={12} />
            NOVO
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "10px" }}>
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
            placeholder="Buscar conversa..."
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
            }}
          />
        </div>
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onOpenChat(chat)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              cursor: "pointer",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              background: chat.unread ? "rgba(255,255,255,0.015)" : "transparent",
              transition: "background 0.2s",
            }}
          >
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                border: chat.on ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.08)",
                flexShrink: 0,
              }}>{chat.av}</div>
              {chat.on && (
                <div style={{
                  position: "absolute",
                  bottom: "1px",
                  right: "1px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #000",
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "3px",
              }}>
                <span style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "11px",
                  color: "#fff",
                  fontWeight: 700,
                }}>{chat.u}</span>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "9px",
                  color: "#404040",
                }}>{chat.time}</span>
              </div>
              <div style={{
                fontSize: "12px",
                color: chat.unread ? "#a8a8a8" : "#555",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: chat.unread ? 600 : 400,
              }}>{chat.msg}</div>
            </div>

            {/* Unread */}
            {chat.unread > 0 && (
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#fff",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "9px",
                fontWeight: 700,
                flexShrink: 0,
              }}>{chat.unread}</div>
            )}
          </div>
        ))}
      </div>

      {/* Conversation Overlay */}
      {showConversation && selectedChat && (
        <ChatConversation chat={selectedChat} onClose={onCloseChat} />
      )}
    </div>
  );
}
