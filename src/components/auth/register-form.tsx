"use client";

import { useState } from "react";

import { registerAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  return (
    <form
      action={registerAction}
      className="mt-6 space-y-4"
      onSubmit={(e) => {
        if (password !== confirmPassword) {
          e.preventDefault();
          setLocalError("Passwords do not match");
        }
      }}
    >
      {localError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-foreground">
          {localError}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setLocalError(null);
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setLocalError(null);
          }}
        />
      </div>

      <Button
        type="submit"
        className="h-11 w-full bg-[color:var(--holo-cyan)] text-[#041018] hover:bg-[color:var(--holo-cyan)]/90"
      >
        Register
      </Button>
    </form>
  );
}

