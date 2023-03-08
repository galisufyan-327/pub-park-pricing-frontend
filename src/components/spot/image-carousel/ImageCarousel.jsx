import { Carousel } from "antd"
import noImage from "../../../assets/no-image.jpg";

export default function ImageCarousel({ images = [], imageStyle }) {
  const carouselClass = {
    ".ant-carousel .slick-prev, .ant-carousel .slick-next": {
      display: "block",
      background: "red",
    }
  }
  return (
    <Carousel autoplaySpeed={7000} draggable={true} arrows className={carouselClass}>
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
