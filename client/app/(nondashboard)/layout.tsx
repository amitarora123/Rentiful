"use client";

import React from "react";
import Header from "@/components/Header";
import { useGetAuthUserQuery } from "@/store/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser } = useGetAuthUserQuery();
  console.log(authUser);
  return (
    <div className="w-full h-full">
      <Header />
      <div className="mt-15" />
      {children}
    </div>
  );
};

export default Layout;
