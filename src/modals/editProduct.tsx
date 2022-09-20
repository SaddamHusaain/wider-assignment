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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  editProduct, product } from "../app/slices/inventory";
import getBase64 from "../helpers/getBase64";
import "./style.scss";

const dummyImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5RtTxUXN9_8zo82tXi81TPNbcbRN6zTnKA6a38Z5&s";

function EditProduct({ product }: { product: product }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  function resetForm() {
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      sku: product.SKU,
      quantity: product.quantity,
      price: product.price,
    });
    return;
  }

  const handleOkay = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    resetForm();
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
      editProduct({
        image: values?.image?.[0]?.preview ?? product.image,
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        SKU: values.sku,
      })
    );

    form.resetFields();
    setPreviewImage(dummyImage);

    setIsEditModalOpen(false);
    handleOkay()
  };

  useEffect(() => {
    setPreviewImage(product.image);
    resetForm();
    // eslint-disable-next-line 
  }, [product]);

  return (
    <>
      <Button type="primary" onClick={() => setIsEditModalOpen(true)}>
        Edit Item
      </Button>

      <Modal
        getContainer={false}
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={handleCancel}
        forceRender
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
                  src={dummyImage}
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
                      <Input type="number" min={1}/>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name="sku" label="SKU">
                      <Input type="text" readOnly disabled />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item name="description" label="Description">
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

export default EditProduct;
