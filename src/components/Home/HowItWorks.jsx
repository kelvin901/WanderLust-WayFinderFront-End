import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { how_1, how_2, how_3, how_4 } from "../../assets/home";

const items = [
  {
    id: 1,
    icon: how_1,
    heading: "Find your next destination",
    text: "Discover the world's wonders, explore travel destinations, and ignite wanderlust!",
  },
  {
    id: 2,
    icon: how_2,
    heading: "Access the platform",
    text: "Register and login to access more features like creating and customizing your next travel plan.",
  },
  {
    id: 3,
    icon: how_3,
    heading: "Plan your next trip",
    text: "Customize your next travel plan using our Itenerary tool.",
  },
  {
    id: 4,
    icon: how_4,
    heading: "Let the tech work its magic",
    text: "Sit back, relax, and let us make your dream trip - hassle-free and unforgettable experiences!",
  },
];

export default function HowItWorks() {
  return (
    <section className="my-14">
      <Container>
        <SectionTitle title="how it works" />
        <div className="bg-[#6D9886] bg-opacity-30 px-8 py-14 rounded-md mt-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
            {items.map((item) => (
              <div
                className="text-center flex flex-col items-center justify-center"
                key={item.id}
              >
                <img src={item.icon} alt="icon" className="pb-4 w-24" />
                <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
