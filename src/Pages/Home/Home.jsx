import CategoryProducts from "../../Components/CategoryProducts/CategoryProducts";
import CategorySection from "../../Components/CategorySection/CategorySection";
import Footer from "../../Components/Footer/Footer";
import Products from "../../Components/Products/Products";
import SubscribeSection from "../../Components/SubscribeSection/SubscribeSection";
import MarqueeSection from "../../Components/marquee/MarqueeSection";
import HeroSection from "../HeroSection/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategoryProducts />
      <Products SliceStart={0} SliceEnd={8} ProductListName="Best seller" />
      <CategorySection category="shoes" />
      <MarqueeSection />
      <CategorySection category="men" />
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default Home;
