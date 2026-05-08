import React, { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Bell, Radio, Plus, ShoppingBag, BadgeCheck } from "lucide-react";
import { STORIES_DATA, POSTS_DATA } from "../data/mockData";

/* ========= Story Item ========= */
function StoryItem({ story }) {
  const [viewed, setViewed] = useState(false);
  return (
    <div
      onClick={() => setViewed(true)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        cursor: "pointer",
        flexShrink: 0,
        minWidth: "66px",
      }}
    >
      <div style={{
        padding: story.isOwn ? "0" : "2px",
        borderRadius: "50%",
        background: story.isOwn
          ? "none"
          : viewed
            ? "rgba(255,255,255,0.15)"
            : "linear-gradient(135deg, #fff, #555, #ccc)",
      }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: story.isOwn ? "rgba(255,255,255,0.06)" : "#111",
          border: story.isOwn ? "2px solid rgba(255,255,255,0.15)" : "2px solid #000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: story.isOwn ? "20px" : "24px",
          position: "relative",
        }}>
          {story.isOwn ? (
            <Plus size={20} color="#fff" strokeWidth={1.5} />
          ) : (
            story.emoji
          )}
        </div>
      </div>
      {story.live && (
        <div style={{
          background: "#fff",
          color: "#000",
          fontFamily: "'Orbitron', monospace",
          fontSize: "7px",
          padding: "1px 5px",
          borderRadius: "5px",
          marginTop: "-14px",
          position: "relative",
          zIndex: 1,
          fontWeight: 700,
          letterSpacing: "1px",
        }}>LIVE</div>
      )}
      <span style={{
        fontSize: "10px",
        color: "#707070",
        maxWidth: "60px",
        textAlign: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>{story.user}</span>
    </div>
  );
}

/* ========= Post Card (Instagram-style) ========= */
function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleDoubleTap = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const formatLikes = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return n.toString();
  };

  return (
    <article style={{
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      animation: "fadeIn 0.4s ease",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 14px",
        gap: "10px",
      }}>
        <div style={{
          padding: "2px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fff, #555, #ccc)",
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#1a1a1a",
            border: "2px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}>{post.av}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.5px",
            }}>{post.user}</span>
            {post.verified && (
              <BadgeCheck size={13} color="#fff" fill="#555" />
            )}
          </div>
          <span style={{
            fontSize: "10px",
            color: "#555",
            fontFamily: "'Share Tech Mono', monospace",
          }}>{post.location}</span>
        </div>
        <MoreHorizontal size={18} color="#707070" style={{ cursor: "pointer" }} />
      </div>

      {/* Image Area */}
      <div
        onDoubleClick={handleDoubleTap}
        style={{
          width: "100%",
          aspectRatio: "1",
          background: post.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }} />
        <span style={{ fontSize: "80px", filter: "drop-shadow(0 0 40px rgba(255,255,255,0.08))", position: "relative", zIndex: 1 }}>
          {post.emoji}
        </span>
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "8px",
          letterSpacing: "3px",
          color: "rgba(255,255,255,0.2)",
          position: "relative",
          zIndex: 1,
        }}>{post.sub}</span>

        {/* Product tag */}
        <div style={{
          position: "absolute",
          bottom: "12px",
          left: "12px",
          right: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(0,0,0,0.85)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          padding: "8px 12px",
          backdropFilter: "blur(10px)",
          zIndex: 2,
        }}>
          <ShoppingBag size={14} color="#aaa" />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", flex: 1, fontWeight: 600 }}>
            {post.product} — {post.productPrice}
          </span>
          <span style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "7px",
            padding: "4px 11px",
            fontFamily: "'Orbitron', monospace",
            fontSize: "8px",
            letterSpacing: "1px",
            color: "#fff",
            cursor: "pointer",
          }}>VER</span>
        </div>

        {/* Double tap heart */}
        {showHeart && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}>
            <Heart
              size={80}
              color="#fff"
              fill="#fff"
              style={{ animation: "heartPop 0.8s ease", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.5))" }}
            />
          </div>
        )}
      </div>

      {/* Actions (Instagram-style) */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 14px",
        gap: "16px",
      }}>
        <Heart
          size={24}
          color={liked ? "#fff" : "#e0e0e0"}
          fill={liked ? "#fff" : "none"}
          strokeWidth={liked ? 0 : 1.5}
          onClick={toggleLike}
          style={{
            cursor: "pointer",
            transition: "all 0.2s",
            animation: liked ? "heartPop 0.4s ease" : "none",
            filter: liked ? "drop-shadow(0 0 8px rgba(255,255,255,0.4))" : "none",
          }}
        />
        <MessageCircle size={24} color="#e0e0e0" strokeWidth={1.5} style={{ cursor: "pointer" }} />
        <Send size={22} color="#e0e0e0" strokeWidth={1.5} style={{ cursor: "pointer" }} />
        <div style={{ flex: 1 }} />
        <Bookmark
          size={24}
          color={saved ? "#fff" : "#e0e0e0"}
          fill={saved ? "#fff" : "none"}
          strokeWidth={saved ? 0 : 1.5}
          onClick={() => setSaved(!saved)}
          style={{ cursor: "pointer", transition: "all 0.2s" }}
        />
      </div>

      {/* Likes */}
      <div style={{ padding: "0 14px 4px" }}>
        <span style={{
          fontWeight: 700,
          fontSize: "13px",
          color: "#fff",
        }}>{formatLikes(likeCount)} curtidas</span>
      </div>

      {/* Caption */}
      <div style={{ padding: "0 14px 8px" }}>
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "11px",
          fontWeight: 700,
          color: "#fff",
          marginRight: "6px",
        }}>{post.user}</span>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>
          {post.desc}
        </span>
      </div>

      {/* Tags */}
      <div style={{ padding: "0 14px 6px", display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {post.tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            color: "#a8a8a8",
            cursor: "pointer",
          }}>{tag}</span>
        ))}
      </div>

      {/* Comments preview */}
      <div style={{ padding: "0 14px 4px" }}>
        <span style={{ fontSize: "12px", color: "#555", cursor: "pointer" }}>
          Ver todos os {post.cmtsStr} comentários
        </span>
      </div>

      {/* Time */}
      <div style={{ padding: "0 14px 12px" }}>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px",
          color: "#404040",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}>{post.timeAgo}</span>
      </div>
    </article>
  );
}

/* ========= Feed Screen ========= */
export default function FeedScreen({ onNotifications, onOpenChat }) {
  const [showToast, setShowToast] = useState(true);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#000",
    }}>
      {/* Header (Instagram-style) */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div className="chrome-text" style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "18px",
          fontWeight: 900,
          letterSpacing: "2px",
        }}>GRIFFERZ</div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "4px 10px",
            cursor: "pointer",
          }}>
            <Radio size={10} color="#fff" />
            <span style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "8px",
              letterSpacing: "2px",
              color: "#fff",
            }}>LIVE</span>
          </div>
          <div
            onClick={onNotifications}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <Bell size={16} color="#ddd" />
            <div style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#fff",
            }} />
          </div>
          <div
            onClick={onOpenChat}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Send size={16} color="#ddd" />
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: "absolute",
          top: "60px",
          left: "12px",
          right: "12px",
          zIndex: 200,
          background: "rgba(8,8,8,0.96)",
          border: "1px solid rgba(200,200,200,0.15)",
          borderRadius: "12px",
          padding: "11px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.7)",
          animation: "toastSlide 5s ease-in-out forwards",
        }}>
          <span style={{ fontSize: "20px" }}>💎</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "10px", color: "#d0d0d0" }}>DRXP GOLD</div>
            <div style={{ fontSize: "11px", color: "#707070", marginTop: "2px" }}>Curtiu seu look do dia ⚡</div>
          </div>
          <span
            onClick={() => setShowToast(false)}
            style={{ fontSize: "13px", color: "#404040", cursor: "pointer" }}
          >✕</span>
        </div>
      )}

      {/* Scrollable Content */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {/* Stories */}
        <div style={{
          display: "flex",
          gap: "12px",
          padding: "12px 14px",
          overflowX: "auto",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {STORIES_DATA.map((story) => (
            <StoryItem key={story.id} story={story} />
          ))}
        </div>

        {/* Posts */}
        {POSTS_DATA.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* End spacer */}
        <div style={{ height: "20px" }} />
      </div>
    </div>
  );
}
