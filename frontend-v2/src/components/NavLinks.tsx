"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import PaletteIcon from "@mui/icons-material/Palette";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const NavLinks = () => {
  return (
    <div className="flex flex-col bg-background border-r border-background">
      <NavItem href="/" tooltip="Digital art">
        <HomeIcon />
      </NavItem>

      <NavItem href="/physical-art" tooltip="Physical art">
        <PaletteIcon />
      </NavItem>

      <NavItem href="/top-creator" tooltip="Top creators">
        <EmojiEventsIcon />
      </NavItem>
    </div>
  );
};

export default NavLinks;

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  tooltip?: string;
};

const NavItem = ({ href, children, tooltip }: NavItemProps) => {
  const pathname = usePathname();
  return (
    <TooltipProvider>
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
