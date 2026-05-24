import { useState } from "react";
import { signup } from "../utils/auth";
import { createUser } from "../utils/firestore";
import Card from "../components/Card";
import Btn from "../components/Btn";
import Input from "../components/Input";

export default function SignupPage({ onSignup, onSwitch, notify }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      notify("Fill all fields.", "error");
      return;
    }
    if (password.length < 6) {
      notify("Password must be 6+ characters.", "error");
      return;
    }
    try {
      const result = await signup(email, password);
      await createUser({
        uid: result.user.uid,
        email: result.user.email,
        name
      });
      notify("Account created successfully!");
      onSignup(result.user);
    } catch (error) {
      console.error(error);
      notify(error.message, "error");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Join Flippr</div>
      <div style={{ color: "#9ca3af", marginBottom: 28 }}>Create your account to buy and sell</div>
      <Card style={{ padding: 32 }}>
        <Input label="Full Name" value={name} onChange={setName} placeholder="Your name" />
        <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
        <Input label="Password" value={password} onChange={setPassword} type="password" placeholder="Min 6 characters" />
        <Btn onClick={handleSignup} style={{ width: "100%", marginBottom: 12 }}>Create Account</Btn>
        <div style={{ textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
          Already have an account?{" "}
          <button onClick={onSwitch} style={{ background: "none", border: "none", color: "#534AB7", fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Sign in</button>
        </div>
      </Card>
    </div>
  );
}
