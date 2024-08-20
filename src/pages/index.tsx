import { Inter } from "next/font/google";
import useLogEvent from "@/utils/useLogEvent";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const { logEvent, loading, error, data } = useLogEvent();

  const handleButtonClick = () => {
      logEvent('Button Clicked');
  };

  return (
    <main
      className={`flex min-h-screen flex-col gap-10 p-24 ${inter.className}`}
    >
      <div className="flex flex-col gap-10 items-center justify-center">
        <button
          onClick={handleButtonClick}
          className="bg-white text-black px-3 py-1.5 rounded-sm hover:bg-slate-300"
        >
          Log Button Event
        </button>
      </div>
    </main>
  );
}
