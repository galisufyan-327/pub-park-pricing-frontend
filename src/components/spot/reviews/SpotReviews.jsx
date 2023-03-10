import { Avatar, Col, Rate, Row } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { React, useState } from 'react';
import AddReview from '../add-review/AddReview';
import "./spot-reviews.css";

const styles = {
  editIcon: {
    cursor: "pointer",
  }
}

const SpotReviews = ({reviews, fetchSpot}) => {

  const [addReview, setAddReview] = useState(false);
  const [review, setReview] = useState({});
  const [processType, setProcessType] = useState("edit");
  const [editableIndex, setEditableIndex] = useState();

  const handleEditReview = (review, index) => {
    setAddReview(true);
    setReview(review);
    setEditableIndex(index);
  }

  if(!reviews) return null;
  return (
    reviews.map((review, index) => (
      <div className="spot-review-container">
        <Row>
          <Col span={22}>
            <div className='spot-review-container-first'>
              <div className="spot-review-avatar">
                <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 56, xl: 56, xxl: 56 }}>R</Avatar>
              </div>
              <div className="spot-review-details">
                <span>{review?.title}</span>
                <span>{review?.created_at}</span>
              </div>
            </div>
          </Col>
          <Col span={2}>
            <EditTwoTone style={styles.editIcon} onClick={(review) => {handleEditReview(review, index)}}/>
          </Col>
        </Row>
        <div className="spot-review-container-second">
          <Rate value={review.rating} />
          <p>{review?.comment}</p>
        </div>
          {addReview && editableIndex===index &&
            <AddReview
              setAddReview={setAddReview}
              processType={processType}
              review={review}
              fetchSpot={fetchSpot}
            >
            </AddReview>
          }
      </div>
    ))
  )
}

export default SpotReviews;