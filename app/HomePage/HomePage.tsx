import HeroSlider from "../Components/HeroSlider";
import AboutSection from "../Components/AboutSection"
import WhyChooseUs from "../Components/WhyChooseUs"
import FeaturedProducts from "../Components/FeaturedProducts"
import PromoBanner from "../Components/PromoBanner"
import ProductsSection from "../Components/ProductsSection"
import FinalCTA from "../Components/FinalCTA"
function HomePage(){
    return(
        <div>
            <HeroSlider />
            <AboutSection />
            <FeaturedProducts />
            <PromoBanner />
            <ProductsSection />
            <WhyChooseUs />
            <FinalCTA />
        </div>
    )
}
export default HomePage;