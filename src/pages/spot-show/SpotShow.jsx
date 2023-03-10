import { Button, Col, Divider, Image, Layout, Rate, Row, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSpot } from '../../api/spots';
import "./spot-show.css";
import SpotReviews from '../../components/spot/reviews/SpotReviews';
import { Carousel } from 'react-responsive-carousel';
import noImage from "../../assets/no-image.jpg";

const ShowSpot = () => {
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const fetchSpot = useCallback(async () => {
    const response = await getSpot(params?.id)
    if (response?.status === 200) {
      setSpot(response.data);
      setLoading(false);
    }
    else navigate("/");
  }, []);

  useLayoutEffect(() => { fetchSpot(); }, [fetchSpot]);

  return (
    <Row className="spot-show-container">
      <Col span={24} className="spot-show-inner-container">
        {
          !!spot &&
          <Layout className='spot-show-layout'>
            <Row>
              <Col span={24} className="spot-show-title-container">
                <Title className="spot-show-title">{spot?.title}</Title>
                <div><Link to={`/spots/${spot?.id}/edit`}><Button type="primary">Edit Spot</Button></Link></div>
              </Col>
            </Row>
            {!!spot?.reviews.length && <RatingDetails reviews={spot?.reviews} />}
            <Row>
              <Col span={24} className="spot-show-carousel-container">
                <ShowPageCarousel
                  images={spot?.images_urls}
                  imageStyle={{
                    width: "95%",
                    height: 500,
                  }}
                />
              </Col>
            </Row>
            <Divider type="horizontal" style={{ backgroundColor: "lightgray" }} />
            <Title level={3} className="spot-show-pricing">Pricing</Title>
            <span className='spot-show-price-box'>
              <span>$ {spot?.price}</span> per dog per hour
            </span>
            <Divider type="horizontal" style={{ backgroundColor: "lightgray" }} />
            <Title level={3} className="spot-show-pricing">Description</Title>
            <p className="spot-show-description">{spot?.description}</p>
            <Divider type="horizontal" style={{ backgroundColor: "lightgray" }} />
            <Title level={3} className="spot-show-pricing">Reviews</Title>

            <RatingDetails reviews={spot?.reviews} showSimple />
            <SpotReviews reviews={spot?.reviews} />
          </Layout>
        }

        {loading &&
          <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large"><div className="content" /></Spin>
          </Space>
        }
      </Col>
    </Row>
  )
}

const RatingDetails = ({ reviews, showSimple }) => {
  const getSpotRating = () => ((reviews?.reduce((sum, review) => sum += review?.rating, 0)) / reviews.length).toFixed(1).toString()

  if (!!reviews.length)
    return (
      <Row>
        <Col span={16} className="spot-show-sub-detail" style={{ ...(showSimple && { fontSize: "24px" }) }}>
          <Rate disabled defaultValue={1} count={1} />
          <p>{getSpotRating()}</p>
          {
            showSimple ? <p>({reviews.length})</p> : <>
              <Divider type="vertical" />
              <p>{reviews.length} review(s)</p>
            </>
          }
        </Col>
      </Row>
    );
  else return <p>No reviews available</p>
}

export default ShowSpot;

const ShowPageCarousel = ({ images, imageStyle }) => {
  return (
    <Row>
      <Col>
        {!!!images.length ?
          <div>
            <img src={noImage} alt="not-available" style={{ objectFit: "contain" }} />
          </div> :
          <Carousel
            autoPlay
            useKeyboardArrows
            interval={1000}
          >
            {images.map((src, index) => <div key={index}>
              <img src={src} style={imageStyle ?? {}} alt={index} />
            </div>
            )}
          </Carousel>
        }
      </Col>
    </Row>
  )
}