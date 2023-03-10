import "react-responsive-carousel/lib/styles/carousel.min.css";
import noImage from "../../../assets/no-image.jpg";
import { Carousel } from "antd";

export default function ImageCarousel({ images = [], imageStyle }) {
  return (
    <Carousel autoplaySpeed={7000} draggable={true} arrows>
      {!!images.length && images.map((src, index) => <div key={index}>
        <img src={src} style={imageStyle ?? {}} alt={index} />
      </div>
      )}
      {!!!images.length &&
        <div>
          <img src={noImage} alt="not-available" style={{ objectFit: "contain" }} />
        </div>
      }
    </Carousel>
  )
}
