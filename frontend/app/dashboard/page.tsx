"use client";

import React from "react";
import { ProtectedRoute } from "@/component/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="text-white flex justify-center pt-10">
        Welcome, {user?.username || "User"}.
      </div>
    </ProtectedRoute>
  );
};

export default Page;
