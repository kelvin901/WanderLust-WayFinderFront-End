import React from 'react';
import { TypeAnimation } from 'react-type-animation';

function About() {

  return (
    <div className='about-container'>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Our Core Values',
          2000, // wait 1s before showing the next value
          'Honesty',
          2000,
          'Teamwork',
          2000,
          'Quality Service',
          2000,
          'Communication',
          2000,
          'Loyalty',
          2000,
          'Constructive Spirit',
          2000,
          'Community and Environment',
          2000,
          'Our Purpose',
          2000,
          'Our Mission',
          2000,
          'Our Vision',
          2000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '2em', display: 'inline-block' }}
        repeat={Infinity}
      />
 <div className="container mx-auto p-4">
      <div className="content">
        <h3 className="text-2xl font-bold">Honesty</h3>
        <p className="my-4">
          For us, as a company, it is very important that the information provided to our customers is honest and true. This value is what makes us different and helps us make decisions based on firm and true facts.
        </p>

        <h3 className="text-2xl font-bold">Teamwork</h3>
        <p className="my-4">
          We have built a team that works result-oriented; unifying talent and give-and-take to respect and join different opinions, knowledge, and abilities because teamwork and mutual support build the foundation of our relationship.
        </p>

        <h3 className="text-2xl font-bold">Quality Service</h3>
        <p className="my-4">
          Service quality is one of our most important values which demands all our effort, determination, and courage to be successful in what we are doing and the services we are providing. We conduct our work with dedication and without mistakes, optimizing delivery time and putting effort into what we do to achieve results of quality.
        </p>

        <h3 className="text-2xl font-bold">Communication</h3>
        <p className="my-4">
          Each one of us must interact transparently and appropriately, trying to strengthen our interpersonal relations and the image of the company. We are conscious that our communication generates perceptions, expectations, and requirements which motivate us to improve our behavior, attitude, and knowledge.
        </p>

        <h3 className="text-2xl font-bold">Loyalty</h3>
        <p className="my-4">
          Our team members must show loyalty; referring to faithfulness, commitment, identification, pride, membership, confidentially, and interest defense; in any moment for and in the name of the company.
        </p>

        <h3 className="text-2xl font-bold">Constructive Spirit</h3>
        <p className="my-4">
          Constructed spirit refers to a positive attitude, optimism, increase of the value chain, creativity and good faith that must be shown and lived by those who work in our company.
        </p>

        <h3 className="text-2xl font-bold">Community and Environment</h3>
        <p className="my-4">
          We commit socially and culturally to the community and adapt our business strategies to the preservation of the environment.
        </p>

        <h1 className="text-2xl font-bold my-6">Our Purpose</h1>
        <p className="my-4">
          Provide high-quality and sustainable travel experiences.
        </p>

        <h1 className="text-2xl font-bold my-6">Our Mission</h1>
        <p className="my-4">
          Serving our customers, searching their entire satisfaction and providing touristic services of quality, committing to the social, cultural and environmental reality of our country.
        </p>

        <h1 className="text-2xl font-bold my-6">Our Vision</h1>
        <p className="my-4">
          Being part of the exclusive leaders in the Kenyan tourism sector by the year 2030; as well as being recognized for the quality of our services and the contribution that we make to the development of our country.
        </p>
      </div>
    </div>
    </div>
  );
}

export default About;
