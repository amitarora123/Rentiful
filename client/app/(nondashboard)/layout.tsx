"use client";

import React from "react";
import Header from "@/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="mt-15" />
      {children}
    </div>
  );
};

export default Layout;
