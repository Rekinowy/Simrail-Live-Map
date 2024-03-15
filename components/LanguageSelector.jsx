"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { Select, SelectItem } from "@nextui-org/react";

export default function LanguageSelector({ selectStyles }) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const languages = [
    { locale: "en", label: "English", flag: "/gb.svg" },
    { locale: "pl", label: "Polski", flag: "/pl.svg" },
    { locale: "de", label: "Deutsch", flag: "/de.svg" },
  ];

  const handleChange = (e) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <Select
      name="language"
      aria-label="language"
      radius="sm"
      placeholder={
        languages.find((lang) => lang.locale === currentLocale)?.label
      }
      value={currentLocale}
      style={{ height: "40px" }}
      classNames={selectStyles}
      onChange={handleChange}
    >
      {languages.map((lang) => (
        <SelectItem
          key={lang.locale}
          value={lang.label}
          startContent={<img className="w-3 h-3" src={lang.flag} alt="flag" />}
        >
          {lang.label}
        </SelectItem>
      ))}
    </Select>
  );
}
