import { useState, useRef } from "react";
import { getUsers } from "../utils/storage";
import Card from "../components/Card";
import Btn from "../components/Btn";
import Input from "../components/Input";
import { googleLogin } from "../utils/auth";

export default function LoginPage({ onLogin, onSwitch, notify }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { onLogin(user); }
    else { notify("Invalid email or password.", "error"); }
  };

  const handleGoogleLogin = async () => {

    try {

      const result = await googleLogin();

      notify("Logged in successfully!");

      onLogin(result.user);

    } catch (error) {

      console.error(error);

      notify("Google login failed", "error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Welcome back</div>
      <div style={{ color: "#9ca3af", marginBottom: 28 }}>Sign in to your Flippr account</div>
      <Card style={{ padding: 32 }}>
        <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
        <Input label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
        <Btn onClick={handleLogin} style={{ width: "100%", marginBottom: 12 }}>Sign In</Btn>
        <Btn
          onClick={handleGoogleLogin}
          variant="secondary"
          style={{ width: "100%", marginTop: 12 }}
        >
          Continue with Google
        </Btn>
        <div style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
          Don't have an account?{" "}
          <button onClick={onSwitch} style={{ background: "none", border: "none", color: "#534AB7", fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Sign up</button>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: "#f0efff", borderRadius: 10, fontSize: 12, color: "#534AB7" }}>
          <strong>Demo:</strong> riya@example.com / pass123<br />
          <strong>Admin:</strong> admin@flippr.com / admin123
        </div>
      </Card>
    </div>
  );
}