// src/Home.js
import React from 'react';
// import { Link } from 'react-router-dom';
import BannerProduct from '../components/Banner/BannerProduct';
import ProductCardFirst from '../components/Productsonhome/ProductCardFirst'
import ProductCardSecond from '../components/Productsonhome/ProductCardSecond';
import ProductVertcalCard from '../components/Productsonhome/ProductVertcalCard';

const Home = () => {

  return (
    <div>
   
      <BannerProduct />


      <ProductCardFirst category={"k-pop"} heading={"BestSelling Products"}/>  

    
      <ProductCardSecond category={"k-pop"} heading={"Trending"}/>  

      <ProductVertcalCard  category={"k-pop"}  heading={"New Arrivals"}/>  



    </div>
  );
};

export default Home;
