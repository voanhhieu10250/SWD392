import Link from "next/link";
import { Suspense } from "react";
import LoginDialog from "./AuthButtons";
import { ModeToggle } from "./ModeToggle";
import SearchBox from "./SearchBox";
import OptionsDropdown from "./OptionsDropdown";
import { getSession } from "@/lib/auth";
import UploadDialog from "./UploadDialog";

const TopNav = async () => {
  let session = await getSession();
  // console.log(session);

  return (
    <div className="sticky top-0 flex justify-between px-[calc(1%+10px)] py-4 shadow-md bg-background z-50">
      <div className="grid place-content-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          Artwork
        </Link>
      </div>
      <div className="grid place-content-center">
        <Suspense>
          <SearchBox />
        </Suspense>
      </div>
      <div className="flex items-center gap-x-2">
        {session ? (
          <>
            <OptionsDropdown username={session.user.username} />
            <UploadDialog />
          </>
        ) : (
          <LoginDialog />
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopNav;
