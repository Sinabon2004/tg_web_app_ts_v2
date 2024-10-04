import Header from "@/components/header";
import Games from "@/components/games";
import QuickRoutes from '@/components/QuickRoutes'
function Home() {
  return (
    <div className="relative ">
      <div className="absolute bg-primary-dark-blue inset-0">
        <img className='w-full h-full ' src="/images/background.png" alt="" />
      </div>
      <Header />
      <Games />
      <QuickRoutes/>
    </div>
  );
}

export default Home;
