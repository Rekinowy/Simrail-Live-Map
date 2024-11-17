"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { Select, SelectItem } from "@nextui-org/react";

export default function LanguageSelector({ selectStyles, isHome = false }) {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const languages = [
    { locale: "en", label: "English", flag: "/gb.svg" },
    { locale: "pl", label: "Polski", flag: "/pl.svg" },
    { locale: "de", label: "Deutsch", flag: "/de.svg" },
    { locale: "fr", label: "Français", flag: "/fr.svg" },
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
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <Select
      name="language"
      aria-label="language"
      radius="sm"
      placeholder={
        isHome ? (
          <img
            className="w-4 sm:w-5 h-4 sm:h-5"
            src={languages.find((lang) => lang.locale === currentLocale)?.flag}
            alt="flag"
          />
        ) : (
          languages.find((lang) => lang.locale === currentLocale)?.label
        )
      }
      value={currentLocale}
      style={!isHome ? { height: "40px" } : {}}
      classNames={selectStyles}
      onChange={handleChange}
    >
      {languages.map(
        (lang) =>
          lang.locale !== currentLocale && (
            <SelectItem
              key={lang.locale}
              value={lang.label}
              textValue={lang.label}
              style={{
                margin: "auto",
                width: "100%",
                margin: "auto",
              }}
              startContent={<img className={isHome ? "w-4 md:w-5 h-4 md:h-5" : "w-3 h-3"} src={lang.flag} alt="flag" />}
            >
              {isHome ? "" : lang.label}
            </SelectItem>
          )
      )}
    </Select>
  );
}
