"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [force, setForce] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const f = params.get("force") === "1";
      const forcedEmail = params.get("email") || "";
      setForce(f);
      if (forcedEmail && !email) setEmail(forcedEmail);
    } catch (err) {
      // noop
    }
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const payload: any = { email, password };
    if (!force) payload.token = token;
    else payload.force = true;
    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      router.push("/login");
    } else {
      alert("Reset failed");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Set a new password</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="token">Token</Label>
          {!force ? (
            <Input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              A forced reset is in progress for this account. No token is
              required.
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Setting..." : "Set password"}
        </Button>
      </form>
    </div>
  );
}
