"use client";

import React, { useEffect } from "react";
import { Navigationbar } from "./components/reusable/Navigationbar";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  const lng = navigator.language;

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [i18n, lng]);

  return (
    <>
      <Navigationbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="">
          <p className="">{t("translations:iotNexus.translation.welcome")}</p>
        </div>
      </main>
    </>
  );
}
