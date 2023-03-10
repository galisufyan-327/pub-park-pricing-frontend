import { Button, Col, Form, Rate, Row, Space, Spin } from "antd"
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addReview, updateReview } from "../../../api/review";
import { successNotify } from "../../common/notification/NotificationToast";
import "./add-review.css"

const AddReview = (props) => {
  const { setAddReview, processType, review, fetchSpot } = props;
  const [comment, setComment] = useState(review?.comment || "");
  const [rating, setRating] = useState(review?.rating || 1);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const isNewProcess = processType === "new"? true: false;

  useEffect(()=>{
    setComment(review?.comment)
    setRating(review?.rating)
  },[review])

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const review = {
      comment: comment,
      rating: rating,
    }

    if (isNewProcess) {
      const response = await addReview(params?.id, review);
      if (response?.status === 201) {
        successNotify({ message: "Review Added", description: "Rewiew has been added successfully"});
      }
    } else {
      const response = await updateReview(params?.id, props.review.id, review);
      if (response?.status === 200) {
        successNotify({ message: "Review Updated", description: "Rewiew has been updated successfully"});
      }
      fetchSpot();
    }
    setLoading(false);
    setAddReview(false);
  }

  return (
    <Row>
      <Col span={8}><Title className="new-review-title" level={4}>Add Review</Title></Col>
      <Col span={24}>
        <form className="add-review-form-container" onSubmit={onSubmit}>
        <Form.Item
          label="Rating"
          labelCol={{ span: 2.5 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: false,
              message: 'Rate the spot',
            },
          ]}
        >
          <Rate defaultValue={1} value={rating ?? 1} onChange={(e) => {setRating(e)}}/>
        </Form.Item>
        <Form.Item
          label="Comment"
          labelCol={{ span: 2.5 }}
          wrapperCol={{ span: 16 }}
          rules={[
            {
              required: false,
              message: 'Write you comment here!',
            },
          ]}
        >
          <TextArea name="comment" value={comment ?? ""} onChange={(e)=> {setComment(e.target.value)}} />
        </Form.Item>
        <Row>
          <Col span={2}>
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                {isNewProcess? "Add Review" : "Update Review"}
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              wrapperCol={{
                offset: 12,
                span: 6,
              }}
            >
              <Button type="primary" danger onClick={() => {setAddReview(false)}}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
        </form>
      </Col>
      {loading &&
        <Space direction="vertical" style={{ width: '50%' }}>
          <Spin tip="Loading" size="large"><div className="content" /></Spin>
        </Space>
      }
    </Row>
  )
}

export default AddReview;