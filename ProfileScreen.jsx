import React, { useState } from "react";
import { Settings, Grid3x3, Bookmark, Tag, MessageCircle, MoreHorizontal, BadgeCheck, Zap } from "lucide-react";
import { PROFILE_DATA, PROF_EMOJIS } from "../data/mockData";

const tabsConfig = [
  { id: 0, label: "POSTS", Icon: Grid3x3 },
  { id: 1, label: "SALVOS", Icon: Bookmark },
  { id: 2, label: "MARCAS", Icon: Tag },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const getGridEmojis = () => {
    if (activeTab === 0) return PROF_EMOJIS;
    if (activeTab === 1) return ["🔖", "💎", "🪞", "⚡", "🔮", "🌌"];
    return ["🦋", "💎", "🌙", "⚡", "🔮", "🌌"];
  };

  const gridStats = ["24.7K", "18.2K", "9.1K", "12.3K", "7.8K", "15.4K"];
  const shades = ["#111", "#0e0e0e", "#131313", "#0c0c0c", "#161616", "#0a0a0a"];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#000",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "1px",
          }}>{PROFILE_DATA.name}</span>
          {PROFILE_DATA.verified && (
            <BadgeCheck size={15} color="#fff" fill="#555" />
          )}
        </div>
        <div style={{ display: "flex", gap: "14px" }}>
          <Settings size={22} color="#ddd" style={{ cursor: "pointer" }} />
          <MoreHorizontal size={22} color="#ddd" style={{ cursor: "pointer" }} />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Profile Info (Instagram-style) */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "16px" }}>
            {/* Avatar */}
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #fff, #555, #ccc, #333)",
              borderRadius: "50%",
              padding: "3px",
              flexShrink: 0,
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#111",
                border: "2px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "34px",
              }}>{PROFILE_DATA.av}</div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "20px", flex: 1, justifyContent: "space-around" }}>
              {[
                { n: PROFILE_DATA.posts, l: "Posts" },
                { n: PROFILE_DATA.followers, l: "Seguidores" },
                { n: PROFILE_DATA.following, l: "Seguindo" },
              ].map((stat) => (
                <div key={stat.l} style={{ textAlign: "center", cursor: "pointer" }}>
                  <div style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#fff",
                  }}>{stat.n}</div>
                  <div style={{
                    fontSize: "11px",
                    color: "#707070",
                    marginTop: "2px",
                  }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "13px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "2px",
            }}>{PROFILE_DATA.name}</div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px",
              color: "#555",
              marginBottom: "6px",
            }}>{PROFILE_DATA.handle} · {PROFILE_DATA.location}</div>
            <div style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
            }}>
              {PROFILE_DATA.bio}
              <br />
              <span style={{ color: "#a8a8a8" }}>
                {PROFILE_DATA.bioSub}
              </span>
            </div>
          </div>

          {/* Mood */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "5px 12px",
            marginBottom: "14px",
          }}>
            <Zap size={12} color="#a8a8a8" />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "9px",
              color: "#707070",
              letterSpacing: "1px",
            }}>MOOD: {PROFILE_DATA.mood}</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: "10px",
                fontFamily: "'Orbitron', monospace",
                fontSize: "10px",
                letterSpacing: "1.5px",
                cursor: "pointer",
                fontWeight: 700,
                transition: "all 0.2s",
                border: isFollowing
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(255,255,255,0.2)",
                background: isFollowing
                  ? "transparent"
                  : "rgba(255,255,255,0.1)",
                color: isFollowing ? "#707070" : "#fff",
              }}
            >
              {isFollowing ? "SEGUINDO" : "SEGUIR"}
            </button>
            <button style={{
              flex: 1,
              padding: "9px 0",
              borderRadius: "10px",
              fontFamily: "'Orbitron', monospace",
              fontSize: "10px",
              letterSpacing: "1.5px",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "#707070",
              fontWeight: 700,
            }}>
              MENSAGEM
            </button>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}>
              <MoreHorizontal size={16} color="#707070" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}>
          {tabsConfig.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                flex: 1,
                padding: "12px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "none",
                border: "none",
                borderBottom: activeTab === id
                  ? "2px solid #fff"
                  : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Icon
                size={18}
                color={activeTab === id ? "#fff" : "#555"}
              />
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2px",
          padding: "2px",
        }}>
          {getGridEmojis().map((emoji, i) => (
            <div
              key={`${activeTab}-${i}`}
              style={{
                aspectRatio: "1",
                background: shades[i % shades.length],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "opacity 0.2s",
              }}
            >
              {emoji}
              {i < gridStats.length && (
                <div style={{
                  position: "absolute",
                  bottom: "5px",
                  left: "6px",
                  fontSize: "8px",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontWeight: 600,
                }}>
                  {gridStats[i]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ height: "20px" }} />
      </div>
    </div>
  );
}
