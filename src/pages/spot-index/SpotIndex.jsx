import { Button, Col, Row, Space, Spin } from "antd"
import { useLayoutEffect, useState } from "react";
import { fetchSpots } from "../../api/spots";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import "./spot-index.css"
import Spot from "../../components/spot/Spot";

const gutterValues = { xs: 8, sm: 16, md: 32, lg: 32 };

const SniffspotIndex = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => { initializeSpots() }, []);

  const initializeSpots = async () => {
    const response = await fetchSpots();
    if (response.status === 200) setSpots(response.data);
    setLoading(false);
  }

  const spotsNotFound = () => !spots.length && !loading;

  return (
    <>
      <Row className="spot-title-container" gutter={24}>
        <Col span={12}><Title className="spot-list-title" level={2}>Popular private dog parks</Title></Col>
        <Col className="create-spot-btn" span={12}>
          <Link to="/spots/new"><Button type="primary" htmlType="button">Create new spot</Button></Link>
        </Col>
      </Row>
      <Row className="spot-grid" gutter={[gutterValues, gutterValues]}>

        {!!spots.length && spots.map((spot) => (
          <Col className="gutter-row" span={8} key={spot?.id} >
            <Link to={`/spots/${spot.id}`} target="_blank"><Spot spot={spot} /></Link>
          </Col>
        ))}

        {loading &&
          <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large"><div className="content" /></Spin>
          </Space>
        }

        {spotsNotFound() &&
          <Col className="gutter-row" span={24}>
            <Title level={5} className="no-spot-found">No spots found</Title>
          </Col>
        }
      </Row>
    </>
  )
}

export default SniffspotIndex;
