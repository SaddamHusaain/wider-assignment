import { useState } from "react";
import { Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./style.scss";
import { product } from "../../app/slices/inventory";
import AddOrder from "../../modals/addOrder";
import AddProduct from "../../modals/addProduct";
import EditProduct from "../../modals/editProduct";
import LayoutContainer from "../../components/layout";

function Inventry() {
  const [orderDetail, setorderDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const store: any = useSelector((state) => state);

  const [isPlaceOrderModelOpen, setPlaceOrderModelOpen] = useState(false);

  const PlaceOrder = (e: any, value: any) => {
    if (value !== undefined) {
      setorderDetail(value);
    }
    setPlaceOrderModelOpen(!isPlaceOrderModelOpen);
  };

  return (
    <>
      <LayoutContainer>
        <Card className="empty-card" style={{ width: 280 }} onClick={() => setIsModalOpen(true)}>
          <div className="card-content empty">
            <div>
              <PlusOutlined />
              <div className="add-item">ADD NEW ITEM</div>
            </div>
          </div>
        </Card>


        {
          store.inventory.map((value: product, index: number) => {
            return (
              <Card
                key={index}
                style={{ width: 280 }}
                cover={<img alt="example" src={value.image} />}
                actions={[
                  <EditProduct product={value} />,
                  <Button disabled={(value.quantity === 0) ? true : false} type="primary" onClick={(e) => PlaceOrder(e, value)} > Place Order</Button>,
                ]}
              >
                <div className="card-content">
                  <div className="details d-flex">
                    <div className="label bold">{value.name}</div>
                    <div className="prize bold">${value.price}</div>
                  </div>
                  <div className="descriptions" title="{value.description}">
                    <span className="label bold">Description:</span>
                    {value.description}
                  </div>
                  <div className="details d-flex">
                    <div className=" sku">
                      <span className="label bold">SKU:</span>{value.SKU}
                    </div>
                    <div className="quantity">
                      <span className="label bold">Quantity:</span>{value.quantity}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        }
        <AddOrder visible={isPlaceOrderModelOpen} onCancel={PlaceOrder} orderDetail={orderDetail} />
      </LayoutContainer>

      <AddProduct isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}

export default Inventry;
