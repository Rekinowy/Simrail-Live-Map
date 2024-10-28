import ServersList from "@/components/ServersList";
import initTranslations from "../../lib/utils/i18n";
import TranslationsProvider from "../../lib/utils/TranslationsProvider";
import Image from "next/image";

const i18nNamespaces = ["Home"];

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
      <video
        className="fixed h-screen w-screen object-cover opacity-20"
        src="/simrail-trailer.mp4"
        playsInline
        autoPlay
        muted
        loop
      />
      <main className="flex flex-col h-[100dvh] items-center p-4">
        <header className="flex z-10 gap-2 items-center place-self-start">
          <Image width={72} height={72} src={"/favicon.png"} alt="logo"></Image>
          <h1 className="text-3xl leading-none font-medium">
            <span className="tracking-wide">Simrail</span>
            <br />
            <span className="text-2xl text-light_gray">Live Map</span>
          </h1>
        </header>
        <section className="p-6 sm:p-8 text-4xl sm:text-5xl text-slate-200 font-roboto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h2>{t("header")}</h2>
        </section>
        <ServersList />
      </main>
    </TranslationsProvider>
  );
};

export default Home;
