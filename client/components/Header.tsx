"use client";

import Logo from "./Logo";
import Image from "next/image";
import { MessageCircle, Plus, Search } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useGetAuthUserQuery } from "@/store/api";

type HeaderProps = {
  children?: React.ReactNode; // optional
};
const Header = ({ children }: HeaderProps) => {
  const { authStatus, signOut } = useAuthenticator();
  const { data: authUser } = useGetAuthUserQuery();
  const pathname = usePathname();

  const isDashboardPage =
    pathname.includes("manager") || pathname.includes("tenant") ? true : false;

  return (
    <header className="w-full z-50 flex items-center justify-between  fixed top-0 right-0 left-0 h-15  px-5 bg-neutral-800">
      <Link prefetch href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" width={20} height={20} alt="logo" />
        <Logo />
      </Link>

      {!isDashboardPage ? (
        <div className="hidden lg:block">
          <p className="text-sm text-primary-300">
            Discover your perfect rental apartment with our advanced search
          </p>
        </div>
      ) : authUser?.userRole === "tenant" ? (
        <div className="flex-1 ml-5 md:ml-10">
          <Link prefetch href="/properties">
            <Button
              variant="secondary"
              className="bg-secondary-500 hover:bg-secondary-400 cursor-pointer text-white"
            >
              <Search className="size-5 align-middle" />
              <span className="hidden md:block ">Search Properties</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex-1 ml-5 md:ml-10">
          <Link prefetch href="/manager/properties/add">
            <Button
              variant="secondary"
              className="bg-secondary-500 hover:bg-secondary-400 cursor-pointer text-white"
            >
              <Plus className="size-5 align-middle" />
              <span className="hidden md:block ">Add Property</span>
            </Button>
          </Link>
        </div>
      )}

      {authStatus === "unauthenticated" ? (
        <div className="flex gap-2 items-center">
          <Link
            prefetch
            href="/sign-in"
            className="text-primary-400 hover:bg-white hover:text-black transition-colors duration-200 ease px-3 py-1 border border-primary-300 rounded-md "
          >
            <span className="text-sm font-medium">Sign In</span>
          </Link>
          <Link
            prefetch
            href="/sign-up"
            className="bg-secondary-600 hover:bg-white hover:text-black transition-colors duration-200 ease text-white px-3 py-1 rounded-md "
          >
            <span className="text-sm font-medium">Sign Up</span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <div className="border border-primary-200 text-primary-200 hover:border-primary-400 hover:text-primary-400 cursor-pointer rounded-full p-2 relative">
            <MessageCircle className="size-5 " />

            <div className="rounded-full p-1 text-[8px] absolute -bottom-2 right-0.5 bg-red-500 text-white">
              +1
            </div>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center cursor-pointer gap-2 focus:outline-none ">
              <Avatar>
                {/* <AvatarImage src={authUser?.userInfo?.image}></AvatarImage> */}
                <AvatarFallback className="bg-primary-600">
                  {authUser?.userRole?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-primary-200 hidden md:block">
                {authUser?.userInfo?.name}
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2 mt-2">
              <DropdownMenuLabel>
                <Link
                  prefetch
                  href={
                    authUser?.userRole === "tenant"
                      ? "/tenant/favorites"
                      : "/manager/properties"
                  }
                >
                  Go to Dashboard
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link prefetch href={`/${authUser?.userRole}/settings`}>
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {children}
        </div>
      )}
    </header>
  );
};

export default Header;
