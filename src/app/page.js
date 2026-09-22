import Aim from "@/component/Aim";
import Banner from "@/component/Banner";
import Investors from "@/component/Investors";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Banner></Banner>
     <Aim></Aim>
     <Investors></Investors>
    </div>
  );
}
