import Image from "next/image";
import { Inter } from "next/font/google";
import ManagerPage from "./manager";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <ManagerPage />
    </div>
  );
}
