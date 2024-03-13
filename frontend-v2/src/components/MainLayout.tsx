"use client";

import { usePathname } from "next/navigation";
import SideNav from "./SideNav";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Side nav */}
      {!pathname.startsWith("/art/") && (
        <div className="w-[75px] fixed top-0 left-0">
          <SideNav />
        </div>
      )}

      {/* main */}
      <div className={cn(!pathname.startsWith("/art/") && "ml-[75px]")}>
        <main
          className={cn(
            "container mx-auto",
            pathname.startsWith("/art/") && "max-w-6xl"
          )}
        >
          {children}
        </main>
      </div>

      {pathname.startsWith("/art/") && (
        <div className="flex justify-center items-center h-16 bg-background">
          <p className="text-muted-foreground text-sm">
            © 2024 HieuVo. All Rights Reserved.
          </p>
        </div>
      )}
    </>
  );
};

export default MainLayout;
