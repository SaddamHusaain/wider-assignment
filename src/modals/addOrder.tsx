import { Button, Col, Modal, Row, Image, Input } from "antd";
import React, { useEffect, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import "./style.scss";
import { curentOrders } from "../app/slices/currentOrdersSlice";
import { useDispatch } from "react-redux";
import { setDrawer } from "../app/slices/confirmOrderSlice";

const AddOrder = (props: any) => {
  const dispatch = useDispatch();
  const [itemData, setitemData] = useState({ image: "", name: "", description: "", sku: "", quantity: 0, price: 0, totalprice: 0 });

  useEffect(() => {
    setitemData({ image: props?.orderDetail?.image, name: props?.orderDetail?.name, description: props?.orderDetail?.description, sku: props?.orderDetail?.SKU, quantity: 1, price: props.orderDetail.price, totalprice: props.orderDetail.price });
  }, [props]);

  const increaseQuantity = () => {
    const quantity: number = +itemData.quantity + 1;
    if (quantity <= props.orderDetail.quantity) {
      const Totalprice = props.orderDetail.price * quantity;
      setitemData({ ...itemData, quantity: quantity, totalprice: Totalprice });
    }

  };
  const decreaseQuantity = () => {
    const quantity: number = +itemData.quantity - 1;
    if (quantity >= 1) {
      let Totalprice = props.orderDetail.price * quantity;
      setitemData({ ...itemData, quantity: quantity, totalprice: Totalprice });
    }
  };

  const handleCancel = () => {
    props.onCancel();
  }
  const handleOk = () => {
    dispatch(curentOrders(itemData))
    dispatch(setDrawer(true));
    props.onCancel();
  };


  return (
    <>
      <Modal
        width={700}
        open={props?.visible}
        title="Add order"
        onOk={handleOk}
        onCancel={props?.onCancel}
        footer={[
          <Button onClick={handleCancel}>Close</Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Add order
          </Button>,
        ]}
      >
        <Row>
          <Col span={8} >
            <Image width={200} src={props?.orderDetail?.image} />
          </Col>
          <Col span={16}>
            <div className="modal-content">
              <div className="item-detail">
                <span className="bold"> Name:</span> {props?.orderDetail?.name}
              </div>
              <div className="item-detail">
                <span className="bold"> Discription:</span>{" "}
                {props?.orderDetail?.description}
              </div>
              <div className="item-detail">
                {" "}
                <span className="bold"> SKU:</span> {props?.orderDetail?.SKU}
              </div>
              <div className="item-detail">
                <span className="bold"> Quantity:</span>
                <div className="item-detail padding-0">
                  <div className="quantitybtn select-quantity">
                    <Button
                      disabled={itemData.quantity === 1 ? true : false}
                      type="primary"
                      icon={<MinusOutlined />}
                      size="small"
                      onClick={decreaseQuantity}
                    />
                    <Input
                      placeholder="Quantity"
                      value={itemData.quantity}
                      readOnly
                    />
                    <Button
                      disabled={itemData.quantity < props.orderDetail.quantity ? false : true}
                      type="primary"
                      icon={<PlusOutlined />}
                      size="small"
                      onClick={increaseQuantity}
                    />
                  </div>
                </div>
              </div>
              <div className="item-detail">
                <span className="bold"> Price: </span> ${itemData.price}
              </div>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AddOrder;
