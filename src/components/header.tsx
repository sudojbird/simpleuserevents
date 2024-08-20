import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div className="flex justify-between items-center py-6 px-8">
      <div className="flex flex-row gap-8">
        <Link href="/" className="text-xl font-bold">
          Test Events
        </Link>
        <Link href="/events" className="text-xl font-bold">
          View Events
        </Link>
      </div>
      <ConnectButton />
    </div>
  );
}
