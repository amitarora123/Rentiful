import {
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiX,
  SiYoutube,
} from "react-icons/si";
import Link from "next/link";
import React from "react";
import { Copyright } from "lucide-react";

const Footer = () => {
  const navigations = [
    {
      text: "About Us",
      href: "about",
    },
    {
      text: "Contact Us",
      href: "contact",
    },
    {
      text: "FAQ",
      href: "faq",
    },
    {
      text: "Terms",
      href: "terms",
    },
    {
      text: "Privacy",
      href: "privacy",
    },
  ];

  const socials = [SiFacebook, SiInstagram, SiX, SiLinkedin, SiYoutube];

  return (
    <footer className="px-10 lg:px-20 py-10">
      <div className="flex max-w-4xl mx-auto flex-col gap-5 sm:flex-row justify-between items-center w-full ">
        <h3 className="text-primary-700 font-bold text-xl">RENTIFUL</h3>

        <nav className="flex gap-5">
          {navigations.map(({ text, href }, index) => (
            <Link prefetch key={index} href={href} className="text-xs">
              {text}
            </Link>
          ))}
        </nav>

        <div className="flex gap-5 items-center">
          {socials.map((Icon, index) => (
            <Icon key={index} className="size-5" />
          ))}
        </div>
      </div>
      <div className="my-10 flex items-center justify-center gap-2">
        <Copyright size={15} />
        <div className="flex items-center justify-center gap-5 text-xs">
          <p>RENTiful. All rights reserved.</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookie Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
