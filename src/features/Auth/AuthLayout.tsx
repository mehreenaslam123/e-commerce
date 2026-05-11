import React from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="min-h-screen  flex flex-col justify-between bg-[var(--gas-background)]">
    <div className="flex-1 flex items-center justify-center">
      {children ? children : <Outlet />}
    </div>
  </div>
);

