import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import TechStack from '../components/home/TechStack';
import Team from '../components/home/Team';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <TechStack />
      <Team />
      <Contact />
    </>
  );
};

export default Home;
