import TranslationsProvider from "@/lib/utils/TranslationsProvider";
import initTranslations from "@/lib/utils/i18n";
import dynamic from "next/dynamic";

const i18nNamespaces = ["Details", "Searchbox", "Settings", "Home"];

const MapPage = async ({ params }: { params: { code: string; locale: string } }) => {
  const DynamicMap = dynamic(() => import("../../../../components/Map"), {
    ssr: false,
  });

  const { resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationsProvider locale={params.locale} namespaces={i18nNamespaces} resources={resources}>
      <DynamicMap code={params.code} locale={params.locale} />
    </TranslationsProvider>
  );
};

export default MapPage;
