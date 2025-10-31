"use client";

import {
  Computer,
  CreditCard,
  DollarSign,
  Grid2X2Icon,
  Heart,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";

// Menu items.
const tenantUrls = [
  {
    title: "Favorites",
    url: "/tenant/favorites",
    icon: Heart,
  },
  {
    title: "Application",
    url: "/tenant/applications",
    icon: Computer,
  },
  //   {
  //     title: "Residence",
  //     url: "/tenants/residence",
  //     icon: Trees,
  //   },
  {
    title: "Billing History",
    url: "/tenant/billing",
    icon: DollarSign,
  },
  {
    title: "Payment Methods",
    url: "/tenant/payment-methods",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/tenant/settings",
    icon: Settings,
  },
];

const managerUrls = [
  {
    title: "Properties",
    url: "/manager/properties",
    icon: Grid2X2Icon,
  },
  {
    title: "Billing",
    url: "/manager/billing",
    icon: DollarSign,
  },
  {
    title: "Application",
    url: "/manager/applications",
    icon: Computer,
  },
  {
    title: "Settings",
    url: "/manager/settings",
    icon: Settings,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  const [role, setRole] = useState("");

  useEffect(() => {
    (async () => {
      const session = await fetchAuthSession();

      setRole(
        session.tokens?.idToken?.payload["custom:role"] as "manager" | "tenant"
      );
    })();
  }, []);

  return (
    <Sidebar collapsible="icon" className="mt-15">
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              <SidebarMenuItem className="max-md:hidden px-2 py-3 hover:bg-primary-100">
                <SidebarMenuButton
                  asChild
                  className="justify-start hover:bg-none!important"
                >
                  <SidebarTrigger />
                </SidebarMenuButton>
              </SidebarMenuItem>
              {(role === "tenant" ? tenantUrls : managerUrls).map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`relative ${
                    pathname.includes(item.url) ? "bg-primary-100" : ""
                  } px-2 py-3 border-primary-800 hover:bg-primary-100`}
                >
                  <div
                    className={`absolute right-0 bottom-0 origin-center w-0.5 bg-primary-700 h-full transition-transform duration-300 ${
                      pathname.includes(item.url)
                        ? "scale-y-full "
                        : "scale-y-0"
                    }`}
                  />
                  <Link prefetch href={item.url}>
                    <SidebarMenuButton className="flex  gap-4 hover:bg-none!important ">
                      {<item.icon className="size-5" />} {item.title}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
