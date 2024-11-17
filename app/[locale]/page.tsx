import Main from "@/components/Home/Main";
import initTranslations from "@/lib/utils/i18n";
import TranslationsProvider from "@/lib/utils/TranslationsProvider";

const i18nNamespaces = ["Home"];

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
      <div>
        <video
          className="fixed h-screen w-screen object-cover opacity-20"
          src="/simrail-trailer-480.mp4"
          playsInline
          autoPlay
          muted
          loop
        />
      </div>
      <Main title={t("header")} />
    </TranslationsProvider>
  );
};

export default Home;
