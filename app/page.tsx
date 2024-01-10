import ServersList from "@/components/ServersList";

const Home = () => {
  return (
    <main className="flex flex-col min-h-[100dvh] gap-6 p-4 items-center bg-[url('/background.jpg')] bg-cover">
      <section className="text-white text-4xl">Select server</section>
      <ServersList />
    </main>
  );
};

export default Home;
