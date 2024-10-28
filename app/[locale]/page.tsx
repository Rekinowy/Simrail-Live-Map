import Header from "@/components/Home/Header";
import ServersList from "@/components/Home/ServersList";
import initTranslations from "@/lib/utils/i18n";
import TranslationsProvider from "@/lib/utils/TranslationsProvider";

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
      <main className="flex flex-col h-[100dvh] items-center p-4 lg:p-8">
        <Header />
        <section className="p-8 text-4xl sm:text-5xl text-slate-200 font-roboto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h2 style={{ textShadow: "1px 1px 1px #1d2935" }}>{t("header")}</h2>
        </section>
        <ServersList />
        <footer className="lg:absolute md:bottom-4 pt-4 text-[0.75em] text-light_primary_light dark:text-light_primary_dark opacity-30 ">
          Created by Rekinowy
        </footer>
      </main>
    </TranslationsProvider>
  );
};

export default Home;
