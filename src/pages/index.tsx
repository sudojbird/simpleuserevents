import useLogEvent from "@/utils/useLogEvent";

export default function Home() {
  const { logEvent, loading, error, data } = useLogEvent();

  const handleButtonClick = () => {
      logEvent('Button Clicked');
  };

  const handleViewRepoClick = () => {
      logEvent('Viewed Project Repo')
      window.open('https://github.com/sudojbird/simpleuserevents', '_blank');
  }

  return (
    <div
      className="flex flex-col justify-between p-24"
    >
      <div className="flex flex-row gap-10 items-center justify-center">
        <button
          onClick={handleButtonClick}
          className="bg-white text-black px-3 py-1.5 rounded-sm hover:bg-slate-300"
        >
          Log Button Event
        </button>
        <button
          onClick={handleViewRepoClick}
          className="bg-white text-black px-3 py-1.5 rounded-sm hover:bg-slate-300"
        >
          View Project Repo
        </button>
      </div>
    </div>
  );
}
