import React from "react";
import { Metadata } from "next";
import AccountDetailsForm from "./_components/AccountDetailsForm";
import PasswordChangeForm from "./_components/PasswordChangeForm";
import Signout from "./_components/Signout";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your profile details and account security settings.",
};

export default function SettingPage() {
  return (
    <div className="container px-3 sm:px-5 py-8 md:py-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="font-montserrat font-semibold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100">
              Account Settings
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-montserrat mt-1">
              Manage your personal profile details and security settings.
            </p>
          </div>

          <Signout />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <AccountDetailsForm />
          <PasswordChangeForm />
        </div>
      </div>
    </div>
  );
}
