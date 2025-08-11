import { Helmet } from 'react-helmet-async';
import BannerProduct from '../components/Banner/BannerProduct';
import ProductCardFirst from '../components/Productsonhome/ProductCardFirst'
import ProductCardSecond from '../components/Productsonhome/ProductCardSecond';
import ProductVertcalCard from '../components/Productsonhome/ProductVertcalCard';
// import ProductByCategory from '../components/Productsonhome/ProductByCategory';
import { useParams } from 'react-router-dom';

const Home = () => {

  const { productId } = useParams();
  const product = { name: 'Home', description: 'A great product', image: 'product-image-url.jpg' }; // Replace with actual product fetching logic


  return (  
    <div className='py-[68px]'>
      
      <Helmet>
        <title>{product.name} - E-Tail</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.name}, buy online, ecommerce`} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <link rel="canonical" href={`https://yourwebsite.com/product/${productId}`} />
      </Helmet>
      
      <BannerProduct />
    
      {/* <ProductByCategory category={"kpop"} heading={"Top K-POP Products"}/>   */}

      <ProductCardFirst category={"kpop"} heading={"BestSelling Products"}/>  

    
      <ProductCardSecond category={"kpop"} heading={"Trending"}/>  

      <ProductVertcalCard  category={"kpop"}  heading={"New Arrivals"}/>  



    </div>
  );
};

export default Home;
