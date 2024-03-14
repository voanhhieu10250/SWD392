"use client";

import { cn } from "@/lib/utils";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomeIcon from "@mui/icons-material/Home";
import PaletteIcon from "@mui/icons-material/Palette";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const SideNav = () => {
  return (
    <div className="flex flex-col bg-background border-r border-background h-screen pt-[72px]">
      <NavItem href="/" tooltip="Digital art">
        <HomeIcon />
      </NavItem>

      <NavItem href="/top-creator" tooltip="Top creators">
        <EmojiEventsIcon />
      </NavItem>

      <NavItem href="/packages" tooltip="Packages">
        <PaletteIcon />
      </NavItem>
    </div>
  );
};

export default SideNav;

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  tooltip?: string;
};

const NavItem = ({ href, children, tooltip }: NavItemProps) => {
  const pathname = usePathname();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={href}
            className={cn(
              "py-3 flex items-center justify-center",
              pathname === href ? "bg-secondary" : "hover:bg-link-hover"
            )}
          >
            {children}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
