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
      <main className="flex flex-col h-[100dvh] items-center p-4">
        <Header />
        <section className="p-6 sm:p-8 text-4xl sm:text-5xl text-slate-200 font-roboto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h2>{t("header")}</h2>
        </section>
        <ServersList />
      </main>
    </TranslationsProvider>
  );
};

export default Home;
