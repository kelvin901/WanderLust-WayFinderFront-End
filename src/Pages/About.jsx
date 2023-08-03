import React from 'react';
import { TypeAnimation } from 'react-type-animation';

function About() {
  return (
    <div className='about-container'>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          'Our Core Values',
          1000, // wait 1s before showing the next value
          'Honesty',
          1000,
          'Teamwork',
          1000,
          'Quality Service',
          1000,
          'Communication',
          1000,
          'Loyalty',
          1000,
          'Constructive Spirit',
          1000,
          'Community and Environment',
          1000,
          'Our Purpose',
          1000,
          'Our Mission',
          1000,
          'Our Vision',
          1000,
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: '2em', display: 'inline-block' }}
        repeat={Infinity}
      />
      <div className='content'>
        <h3>Honesty</h3>
        <p>
          For us, as a company, it is very important that the information provided to our customers is honest and true. This value is what makes us different and helps us make decisions based on firm and true facts.
        </p>
        
        <h3>Teamwork</h3>
        <p>
          We have built a team that works result-orientated; unifying talent and give-and-take to respect and join different opinions, knowledge, and abilities because teamwork and mutual support build the foundation of our relationship.
        </p>
        
        <h3>Quality Service</h3>
        <p>
          Service quality is one of our most important values which demands all our effort, determination, and courage to be successful in what we are doing and the services we are providing. We conduct our work with dedication and without mistakes, optimizing delivery time and putting effort into what we do to achieve results of quality.
        </p>

        {/* Rest of the content */}
      </div>
    </div>
  );
}

export default About;
