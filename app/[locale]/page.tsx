import ServersList from "@/components/ServersList";
import initTranslations from "../../utils/i18n";
import TranslationsProvider from "../../utils/TranslationsProvider";

const i18nNamespaces = ["Home"];

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <main className="flex flex-col h-[100dvh] gap-6 p-4 items-center bg-[url('/background-light.jpg')] dark:bg-[url('/background.jpg')] bg-center bg-cover">
        <section className="text-4xl text-slate-200 font-roboto p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          <h1>{t("header")}</h1>
        </section>
        <ServersList />
      </main>
    </TranslationsProvider>
  );
};

export default Home;
