"use client";

import { useEffect } from "react";

export const usePostLoginEffect = () => {
  useEffect(() => {
    const runPostLogin = async () => {

      const alreadyHandled = localStorage.getItem("post_login_done");
      if (alreadyHandled === "true") return;

      await fetch("/api/auth/post-signup", {
        method: "POST",
      });

      localStorage.setItem("post_login_done", "true");
      }

    runPostLogin();
  }, []);
};