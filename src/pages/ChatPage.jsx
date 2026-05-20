import Card from "../components/Card";
import Btn from "../components/Btn";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import Input from "../components/Input";
import { useState, useRef, useEffect } from "react";
import {getUsers,getMessages,saveMessages} from "../utils/storage";

export default function ChatPage({ currentUser, messages, refreshMessages, chatPartner, setChatPartner, notify }) {
  const [msgText, setMsgText] = useState("");
  const messagesEndRef = useRef(null);

  if (!currentUser) return <div style={{ textAlign: "center", padding: 60 }}><div style={{ fontFamily: "'Fraunces', serif", fontSize: 24 }}>Please login to use chat</div></div>;

  const allUsers = getUsers();
  const myConversations = [...new Set(messages.filter(m => m.senderId === currentUser.id || m.receiverId === currentUser.id).map(m => m.senderId === currentUser.id ? m.receiverId : m.senderId))];
  const conversationUsers = myConversations.map(id => allUsers.find(u => u.id === id)).filter(Boolean);

  const activeChat = chatPartner ? messages.filter(m => (m.senderId === currentUser.id && m.receiverId === chatPartner.id) || (m.senderId === chatPartner.id && m.receiverId === currentUser.id)).sort((a, b) => a.createdAt - b.createdAt) : [];

  const sendMsg = () => {
    if (!msgText.trim() || !chatPartner) return;
    const m = getMessages();
    m.push({ id: `m${Date.now()}`, senderId: currentUser.id, senderName: currentUser.name, receiverId: chatPartner.id, receiverName: chatPartner.name, text: msgText, createdAt: Date.now(), read: false });
    saveMessages(m);
    refreshMessages();
    setMsgText("");
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  useEffect(() => {
    if (chatPartner) {
      const m = getMessages().map(msg => msg.senderId === chatPartner.id && msg.receiverId === currentUser.id ? { ...msg, read: true } : msg);
      saveMessages(m);
      refreshMessages();
    }
  }, [chatPartner?.id]);

  return (
    <div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#1a1a2e", marginBottom: 24 }}>Messages</div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, height: 600 }}>
        {/* Sidebar */}
        <Card style={{ overflow: "auto" }}>
          {conversationUsers.length === 0 ? (
            <div style={{ padding: 24, color: "#9ca3af", fontSize: 14, textAlign: "center" }}>No conversations yet</div>
          ) : conversationUsers.map(u => {
            const lastMsg = messages.filter(m => (m.senderId === currentUser.id && m.receiverId === u.id) || (m.senderId === u.id && m.receiverId === currentUser.id)).sort((a, b) => b.createdAt - a.createdAt)[0];
            const unread = messages.filter(m => m.senderId === u.id && m.receiverId === currentUser.id && !m.read).length;
            return (
              <div key={u.id} onClick={() => setChatPartner(u)} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", background: chatPartner?.id === u.id ? "#f0efff" : "transparent", borderBottom: "1px solid #f0efff" }}>
                <Avatar name={u.name} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{u.name}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lastMsg?.text || ""}</div>
                </div>
                {unread > 0 && <Badge color="#fff" bg="#534AB7">{unread}</Badge>}
              </div>
            );
          })}
        </Card>
        {/* Chat Area */}
        <Card style={{ display: "flex", flexDirection: "column" }}>
          {chatPartner ? (
            <>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0efff", display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar name={chatPartner.name} size={36} />
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{chatPartner.name}</div>
              </div>
              <div style={{ flex: 1, overflow: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {activeChat.length === 0 && <div style={{ color: "#9ca3af", textAlign: "center", marginTop: 40 }}>Start a conversation</div>}
                {activeChat.map(m => {
                  const isMe = m.senderId === currentUser.id;
                  return (
                    <div key={m.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
                      <div style={{ maxWidth: "70%", background: isMe ? "#534AB7" : "#f0efff", color: isMe ? "#fff" : "#1a1a2e", padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: 14, lineHeight: 1.5 }}>
                        {m.productTitle && <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Re: {m.productTitle}</div>}
                        {m.text}
                        <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4 }}>{new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
              <div style={{ padding: "12px 16px", borderTop: "1px solid #f0efff", display: "flex", gap: 8 }}>
                <input value={msgText} onChange={e => setMsgText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Type a message..." style={{ flex: 1, padding: "10px 14px", border: "1.5px solid #e2e0ff", borderRadius: 12, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", background: "#fafafe" }} />
                <Btn onClick={sendMsg}>Send</Btn>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9ca3af", fontSize: 15 }}>Select a conversation</div>
          )}
        </Card>
      </div>
    </div>
  );
}
