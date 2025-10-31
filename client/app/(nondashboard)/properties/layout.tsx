"use client";
import FilterSidebar from "@/components/Filter-Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useRef } from "react";
import FilterHeader from "../components/FilterHeader";
import Header from "@/components/Header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <FilterSidebar />
      <SidebarInset>
        <FilterHeader />

        <div className="grow transition-all duration-300">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
