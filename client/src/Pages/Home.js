// src/Home.js
import React from 'react';
// import { Link } from 'react-router-dom';
import BannerProduct from '../components/Banner/BannerProduct';
import ProductCardFirst from '../components/Productsonhome/ProductCardFirst'
import ProductCardSecond from '../components/Productsonhome/ProductCardSecond';
import ProductVertcalCard from '../components/Productsonhome/ProductVertcalCard';
import ProductByCategory from '../components/Productsonhome/ProductByCategory';

const Home = () => {

  return (
    <div>
   
      <BannerProduct />

      <ProductByCategory category={"kpop"} heading={"Top K-POP Products"}/>  

      <ProductCardFirst category={"kpop"} heading={"BestSelling Products"}/>  

    
      <ProductCardSecond category={"kpop"} heading={"Trending"}/>  

      <ProductVertcalCard  category={"kpop"}  heading={"New Arrivals"}/>  



    </div>
  );
};

export default Home;
