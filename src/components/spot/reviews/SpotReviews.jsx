import { Avatar, Rate } from 'antd';
import React from 'react'
import "./spot-reviews.css"

const SpotReviews = ({ reviews }) => {
  if (!reviews) return null;
  return (
    reviews.map(review => (
      <div className="spot-review-container">
        <div className='spot-review-container-first'>
          <div className="spot-review-avatar">
            <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 56, xl: 56, xxl: 56 }}>R</Avatar>
          </div>
          <div className="spot-review-details">
            <span>{review?.title}</span>
            <span>{review?.created_at}</span>
          </div>
        </div>
        <div className="spot-review-container-second">
          <Rate value={review.rating} disabled />
          <p>{review?.comment}</p>
        </div>
      </div>
    ))
  )
}

export default SpotReviews;