"use client";

import { removeUser } from "@/redux/slices/userSlice";
import { AppDispatch } from "@/redux/store";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";

interface SignoutProps {
  className?: string;
}

function Signout({ className }: SignoutProps) {
  const activeRout = usePathname();
  const navig = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = useCallback(() => {
    dispatch(removeUser());
    navig.replace(`/auth/login?next=${activeRout}`);
    navig.refresh();
  }, [dispatch, activeRout, navig]);

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-danger hover:bg-danger/90 text-white font-montserrat font-medium text-sm transition-all duration-200 cursor-pointer shadow-xs active:scale-95",
        className
      )}
    >
      <LogOut className="size-4" />
      <span>Logout</span>
    </button>
  );
}

export default Signout;
