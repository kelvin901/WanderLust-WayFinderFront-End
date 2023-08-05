import Front from "../components/Home/Front";
import HowItWorks from "../components/Home/HowItWorks";
import Stats from "../components/Home/Stats";
import Stories from "../components/Home/Stories";
import Trusted from "../components/Home/Trusted";
import AttractionsGrid from "../components/Home/AttractionCard";


export default function Home() {
  return (
    <main>
      <Front />
      <Stats />
      <AttractionsGrid/>
      <HowItWorks />
      <Stories />
      <Trusted />
    </main>
  );
}
