import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Upload,
  UploadFile,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RcFile } from "antd/lib/upload";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/slices/inventory";
import getBase64 from "../helpers/getBase64";

function AddProduct({
  isModalOpen = false,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
  };

  const normFile = (e: any) => {
    handlePreview(e?.fileList[0]);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: any) => {
    dispatch(
      addProduct({
        image:
          values?.image?.[0]?.preview ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5RtTxUXN9_8zo82tXi81TPNbcbRN6zTnKA6a38Z5&s",
        name: values.name,
        description: values.desription,
        price: values.price,
        quantity: values.quantity,
        SKU: values.sku,
      })
    );

    form.resetFields();
    setPreviewImage(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5RtTxUXN9_8zo82tXi81TPNbcbRN6zTnKA6a38Z5&s"
    );

    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
      getContainer={false}
        title="Add Product"
        forceRender
        open={isModalOpen}
        onCancel={handleCancel}
        width="60vw"
        footer={""}
      >
        <Form
          layout="vertical"
          form={form}
          name="addProduct"
          encType="multipart/form-data"
          onFinish={onFinish}
        >
          <Row>
            <Col span={6}>
              <Space
                size="large"
                className="upload-image"
                direction="vertical"
                align="center"
              >
                <img
                  alt="example"
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5RtTxUXN9_8zo82tXi81TPNbcbRN6zTnKA6a38Z5&s"
                  srcSet={previewImage}
                />
                <Form.Item
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="image"
                    onPreview={handlePreview}
                    beforeUpload={(file) => {
                      setFileList([...fileList, file]);
                      return false;
                    }}
                    multiple={false}
                    maxCount={1}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              </Space>
            </Col>
            <Col span={18}>
              <div>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true }]}
                    >
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" min={0}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="quantity"
                      label="Quantity"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" min={0}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="sku" label="SKU">
                      <Input type="text" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="desription" label="Description">
                      <TextArea />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <div className="modal-footer">
                <Button onClick={handleCancel}>Close</Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default AddProduct;
