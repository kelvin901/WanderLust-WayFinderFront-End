import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { faker } from '@faker-js/faker';

const RandomStarRating = () => {
  // Generate a random number between 3 and 5 (inclusive)
  const randomRating = Math.floor(Math.random() * 3) + 3;
  let remainder = 5 - randomRating;

  // Create an array with the appropriate number of empty and filled stars
  const emptyStars = Array(remainder).fill(<i className="fa fa-star-o" aria-hidden="true"></i>);
  const filledStars = Array(randomRating).fill(<i className="fa fa-star" aria-hidden="true"></i>);

  return (
    <div>
      <p>
        {filledStars}
        {emptyStars}
      </p>
      
    </div>
  );
};






const NewsCard = ({ text }) => (
  <div className="w-[320px] px-4 py-6 bg-white rounded-md news_card_shadow">
    <p className="text-[#5B6469] font-bold text-[15px]">{text} </p>
    <div className="pt-7 text-[13px] flex items-center gap-2">
      <img src={faker.image.avatar()} alt="person" className="w-10 h-10 rounded-full" />
      <div>
        <h1 className="font-medium">{faker.person.fullName()}</h1>
        <p className="text-[#BFBFC8]">@{faker.person.lastName()}</p>
        <p><RandomStarRating/></p>
      </div>
    </div>
  </div>
  
);

export default function Stories() {
  return (
    <section className="my-14">
      <Container>
        <div className="pt-14 pb-4 h-[700px] overflow-auto bg-[#F7F7F7] flex items-center lg:flex-nowrap flex-wrap gap-1">
          <article className="lg:w-1/2 w-full lg:pb-0 pb-4 flex flex-col lg:items-start items-center lg:ml-14 lg:mt-52">
            <SectionTitle title="Reviews" />
            <p className="text-[#5B6469]">Let's see what people say about us</p>
          </article>
          <div className="flex gap-4 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto">
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              <NewsCard text="Paradise found! The white sandy beaches, crystal-clear waters, and lush palm trees create a postcard-perfect escape. Snorkeling among vibrant marine life was an unforgettable experience. A true tropical haven for relaxation."  />
              <NewsCard text="The adventure of a lifetime! From adrenaline-pumping activities like bungee jumping to serene hikes in the mountains, this destination offers something for every thrill-seeker." />
              <NewsCard text="Impeccable hospitality and luxurious amenities made my stay unforgettable. The hotel staff went above and beyond to ensure my comfort. I felt like royalty throughout my entire visit!" />
            </div>
            <div className="rounded-md w-full flex flex-col gap-3 items-center">
              <NewsCard text="An unforgettable journey. The memories made and the friendships forged during this trip will stay with me forever. A transformative and enriching experience." />
              <NewsCard text= "Amazing travel planner! Made my trip stress-free and memorable. Highly recommended!"  />
              <NewsCard text="Charming and picturesque. The quaint little town with its cobbled streets and charming cottages felt like something out of a fairytale." />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
