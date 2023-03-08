import { Card, Rate } from "antd";
import Meta from "antd/es/card/Meta";
import ImageCarousel from "./image-carousel/ImageCarousel";
import "./spot.css";

export default function Spot({ spot }) {
  return (
    <Card
      className="spot-card"
      cover={<ImageCarousel images={spot.images_urls ?? []} />}
    >
      <Meta title={spot?.title} description={spot?.description} />
      <div className="spot-description">
        <div className="spot-price">
          <span className="spot-price-value">$ {spot?.price}</span>
          <span className="spot-price-description"> dog / hour</span>
        </div>
        <div className="spot-reviews">
          <Rate disabled defaultValue={1} count={1} />
          <span className="spot-reviews-count">({spot?.reviews?.length})</span>
        </div>
      </div>
    </Card>
  )
}
