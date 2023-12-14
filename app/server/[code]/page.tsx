import dynamic from "next/dynamic";

const MapPage = ({ params }: { params: { code: string } }) => {
  const DynamicMap = dynamic(() => import("../../../components/Map"), {
    ssr: false,
  });
  return <DynamicMap code={params.code} />;
};

export default MapPage;
