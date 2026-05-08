import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import FeedScreen from "./components/FeedScreen";
import ExploreScreen from "./components/ExploreScreen";
import MarketScreen from "./components/MarketScreen";
import ChatScreen from "./components/ChatScreen";
import ProfileScreen from "./components/ProfileScreen";
import NotificationPanel from "./components/NotificationPanel";
import BottomNav from "./components/BottomNav";

function App() {
  const [appState, setAppState] = useState("splash"); // splash, login, app
  const [currentTab, setCurrentTab] = useState("feed");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    if (appState === "splash") {
      const timer = setTimeout(() => setAppState("login"), 2800);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleLogin = useCallback(() => {
    setAppState("app");
  }, []);

  const handleTabChange = useCallback((tab) => {
    setCurrentTab(tab);
    setShowChat(false);
    setSelectedChat(null);
  }, []);

  const openChat = useCallback((chat) => {
    setSelectedChat(chat);
    setShowChat(true);
  }, []);

  const closeChat = useCallback(() => {
    setSelectedChat(null);
    setShowChat(false);
  }, []);

  if (appState === "splash") {
    return <SplashScreen />;
  }

  if (appState === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="grifferz-app">
      <div className="app-content">
        {currentTab === "feed" && (
          <FeedScreen
            onNotifications={() => setShowNotifications(true)}
            onOpenChat={() => handleTabChange("chat")}
          />
        )}
        {currentTab === "explore" && <ExploreScreen />}
        {currentTab === "market" && <MarketScreen />}
        {currentTab === "chat" && (
          <ChatScreen
            selectedChat={selectedChat}
            showConversation={showChat}
            onOpenChat={openChat}
            onCloseChat={closeChat}
          />
        )}
        {currentTab === "profile" && <ProfileScreen />}
      </div>

      <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />

      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}

export default App;
