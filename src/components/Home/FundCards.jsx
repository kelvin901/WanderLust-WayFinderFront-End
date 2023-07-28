import FundCard from "./FundCard";
import CountdownTimer from "./Countdown";
import {
  funds_1,
  funds_2,
  funds_3,
  funds_4,
  funds_5,
  funds_6,
  funds_7,
  funds_8,
} from "../../assets/home";

const cards = [
  {
    id: 1,
    price: "8,123",
    date: <CountdownTimer deadline='2023-08-12 23:54:03'/>,
    topic: "Tian Tan Buddha/Big Buddha is Hong Kong's singular most recognisable and iconic attraction. Stands 34 m high and adjacent to Po Lin Monastery, a wondrous, incense-filled sanctum.",
    image: funds_1,
    circleText: "Hong Kong",
  },
  {
    id: 2,
    price: "13,000",
    date: <CountdownTimer deadline='2023-08-19 17:33:48'/>,
    topic:
      "Alimatha island is beautiful with amazing beaches, great food, and Italian entertainment. Trigger your adrenaline by diving into pools of friendly nurse sharks and graceful marble rays.",
    image: funds_2,
    circleText: "Maldives",
  },
  {
    id: 3,
    price: "5,000",
    date: <CountdownTimer deadline='2023-08-08 12:18:25'/>,
    topic:
      "The awe-inspiring Grand Canyon, carved by the mighty Colorado River over millions of years, stretches 277 miles and showcases nature's remarkable artistry with its vastness and stunning vistas.",
    image: funds_3,
    circleText: "Grand Canyon",
  },
  {
    id: 4,
    price: "12,000",
    date: <CountdownTimer deadline='2023-08-05 06:45:57'/>,
    topic: "Hawaii, a tropical paradise in the Pacific, enchants with its lush landscapes, pristine beaches, and vibrant culture. From volcanic wonders to turquoise waters, it's a haven of natural beauty and bliss.",
    image: funds_4,
    circleText: "Hawaii",
  },
  {
    id: 5,
    price: "5,123",
    date: <CountdownTimer deadline='2023-08-04 09:23:41'/>,
    topic: "Maasai Mara, a wildlife marvel in Kenya, mesmerizes with its vast savannas and abundant wildlife. The annual wildebeest migration is a breathtaking spectacle, making it a dream destination for nature enthusiasts.",
    image: funds_5,
    circleText: "Maasai Mara",
  },
  {
    id: 6,
    price: "6,000",
    date: <CountdownTimer deadline='2023-08-09 12:34:56'/>,
    topic: "The awe-inspiring Giza Pyramids in Egypt rise from the desert sands, an enigmatic testament to ancient engineering and culture. These monumental structures echo the mysteries of the past, captivating visitors with their timeless grandeur.",
    image: funds_6,
    circleText: "Giza Pyramids",
  },
  {
    id: 7,
    price: "6,720",
    date: <CountdownTimer deadline='2023-08-17 15:07:12'/>,
    topic:
      "Cape Town, a city of wonders, boasts stunning landscapes with Table Mountain's grandeur and pristine beaches. Its rich culture, vibrant energy, and warm hospitality leave visitors spellbound and yearning for more.",
    image: funds_7,
    circleText: "Cape town",
  },
  {
    id: 8,
    price: "12,000",
    date:  <CountdownTimer deadline='2023-08-13 21:59:35'/>,
    topic: "The iconic Eiffel Tower graces the Parisian skyline, enchanting visitors with its elegant iron structure and panoramic views. A symbol of love and artistry, it stands as a timeless masterpiece of engineering.",
    image: funds_8,
    circleText: "Eiffel tower",
  }
];

export default function FundCards() {
  return (
    
    <article className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-24 gap-6">
      {cards.map((card) => (
 <div key={card.id} className="mb-14 sm:mb-18">
          <FundCard card={card} />
        </div>
      ))}
    </article>
  );
}
