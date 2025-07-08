"use client";

import { useEffect } from "react";

export const usePostLoginEffect = () => {
  useEffect(() => {
    const runPostLogin = async () => {
      const token = localStorage.getItem("bearer_token");
      if (!token) {
        console.warn("No bearer token found in localStorage");
        return;
      }

      const alreadyHandled = localStorage.getItem("post_login_done");
      if (alreadyHandled === "true") return;

      const jwtToken = await fetch("/api/auth/token", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

      await fetch("/api/auth/post-signup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("post_login_done", "true");
      }

    runPostLogin();
  }, []);
};