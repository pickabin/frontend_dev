import React from 'react';
import Articles from '../../components/articles/Articles';
import Info from '../../components/information/Info';
import Hero from '../../components/hero/Hero';
import { HomeContainer } from './Home.style';


function HomePage () {
   return (
	<>
	   <HomeContainer>
          <Hero />
          <Info />
          <Articles />
      </HomeContainer>
   </>
   );	
};

export default HomePage;
