import "./MarqueeSection.css";
import Marquee from "react-fast-marquee";
import puma from "../../assets/pngwing.com.png";
import nike from "../../assets/pngwing.com (1).png";
import add from "../../assets/pngwing.com (2).png";
const MarqueeSection = () => {
  return (
    <div className="container py-5 Marquee">
      <Marquee>
        <img src={puma} alt="" />
        <img src={add} alt="" />
        <img src={nike} alt="" />
        <img src={add} alt="" />
        <img src={add} alt="" />
        <img src={nike} alt="" />
        <img src={add} alt="" />
      </Marquee>
    </div>
  );
};

export default MarqueeSection;
