import { Button, Col, Form, Image, Input, Row, Space, Spin } from 'antd';
import "./create-spot.css"
import Title from 'antd/es/typography/Title';
import { useCallback, useLayoutEffect, useState } from 'react';
import { createSpot, getSpot, updateSpot } from '../../api/spots';
import { convertToFormData } from '../../utils/convert-to-form-data';
import { useNavigate, useParams } from 'react-router-dom';

const CreateSpot = () => {
  const [values, setValues] = useState({ spot: { title: "", description: "", price: 0 } });
  const [previews, setPreviews] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const [loading, setLoading] = useState(!!params.id);

  const initializeSpot = useCallback(
    async () => {
      const { data, status } = await getSpot(params?.id);

      if (status === 200) {
        setValues({
          spot: {
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
          }
        })
        setIsEdit(true);
      } else window.history.replaceState({}, "", "/spots/new")
      setLoading(false);
    },
    [],
  )

  useLayoutEffect(() => {
    initializeSpot();
  }, [params?.id, initializeSpot]);


  const onSubmit = async (event) => {
    event.preventDefault();

    if (isEdit) {
      const { status } = await updateSpot(params?.id, convertToFormData(values));
      (status === 200) && navigate(`/spots/${params?.id}`);
      return;
    }

    const { data, status } = await createSpot(convertToFormData(values));
    (status === 201) && navigate(`/spots/${data?.id}`);
  };

  const onValuesChange = (event) => {
    event.preventDefault();

    const { name, value, files, type } = event.target;

    if (type === "file") setPreviews(Array.from(files).map(file => URL.createObjectURL(file)));

    setValues(prev => ({
      ...prev,
      spot: {
        ...prev.spot, [name]: files ? Object.values(files) : value,
      }
    }));
  };

  return (
    <Row className="create-spot-container">
      <Col span={24}><Title className="new-spot-title" level={1}>{isEdit ? "Edit Spot" : "Create new spot"}</Title></Col>
      <Col span={24} className="create-spot-form-container">
        <form className="create-spot-form" onSubmit={onSubmit}>
          <Form.Item
            label="Title"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            rules={[
              {
                required: true,
                message: 'Please input spot title!',
              },
            ]}
          >
            <Input name="title" value={values?.spot?.title ?? ""} onChange={onValuesChange} />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input spot description!',
              },
            ]}
          >
            <Input name="description" value={values?.spot?.description ?? ""} onChange={onValuesChange} />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            label="Price"
            rules={[
              {
                required: true,
                message: 'Please input spot price!',
              },
            ]}
          >
            <Input type="number" name="price" value={values?.spot?.price ?? 0} onChange={onValuesChange} />
          </Form.Item>

          <Form.Item
            label="Images"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}

            rules={[
              {
                required: true,
                message: 'Please input spot price!',
              },
            ]}
          >
            <Input type="file" name="images" multiple value={values?.spot?.files} onChange={onValuesChange} />
          </Form.Item>

          {!!previews.length &&
            <Row gutter={[16, 16]} className="img-preview-container">
              {previews.map(preview => (
                <Col span={8} key={preview}>
                  <Image width={200} height={200} src={preview} />
                </Col>
              ))}
            </Row>
          }

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              {isEdit ? "Update spot" : "Add spot"}
            </Button>
          </Form.Item>
          {loading &&
            <Space direction="vertical" style={{ width: '100%' }}>
              <Spin tip="Loading" size="large"><div className="content" /></Spin>
            </Space>
          }
        </form>
      </Col>
    </Row>
  );
};

export default CreateSpot;