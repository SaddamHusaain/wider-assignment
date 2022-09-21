import { MinusOutlined, PlusOutlined, DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Drawer, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../app/slices/confirmOrderSlice";
import { decreaseQuantity, deleteOrder, increaseQuantity, reset } from "../app/slices/currentOrdersSlice";
import { decreseQuantityInInventory, product } from "../app/slices/inventory";
import { orders } from "../app/slices/ordersSlice";

export default function ConfirmOrder({ product, }: { product: {} }) {

  const dispatch = useDispatch();
  const [currentOrders, setCurrentOrders] = useState([] as any[]);
  const drawerState = useSelector((state: any) => state.confirmOrder.drawer);
  const currentOrdersList = useSelector((state: any) => state.currentOrders);
  const inventoryData = useSelector((state: any) => state.inventory);

  const showDrawer = () => {
    dispatch(setDrawer(true))
  };

  const onClose = () => {
    dispatch(setDrawer(false))
  };

  const decrease = (value: product, index: number) => {
    const data = currentOrders[index];
    const updatedData = Object.assign({}, data);
    if (updatedData["quantity"] > 1) {
      updatedData["quantity"] = updatedData["quantity"] - 1;
      updatedData["totalprice"] = updatedData["price"] * updatedData["quantity"];
      dispatch(decreaseQuantity({ index: index, data: updatedData }))
    }
  }

  const increase = (value: product, index: number) => {
    const data = currentOrders[index];
    const updatedData = Object.assign({}, data);
    const obj = inventoryData.findIndex((value: any) => value.SKU === data.sku);
    if (updatedData["quantity"] < inventoryData[obj].quantity) {
      updatedData["quantity"] = updatedData["quantity"] + 1;
      updatedData["totalprice"] = updatedData["price"] * updatedData["quantity"];
      dispatch(increaseQuantity({ index: index, data: updatedData }))
    }
  }

  const handleConfirmOrder = () => {

    const data = currentOrdersList;
    const updatedData = data.map((obj: any) => ({ ...obj, createdAt: Date.now() }));

    dispatch(decreseQuantityInInventory(updatedData))
    dispatch(orders(updatedData));
    dispatch(reset())
    onClose();
  }

  const handleDeleteOrderItem = (index: number) => {
    if (currentOrdersList?.length === 1) {
      onClose();
    }
    dispatch(deleteOrder(index));


  }

  useEffect(() => {
    setCurrentOrders(currentOrdersList);
  }, [currentOrdersList]);


  return (
    <div>
      {currentOrdersList.length > 0 && <span className="view-order" onClick={showDrawer}>
        View Order <ShoppingCartOutlined /> <div className="cartcount"> <Badge>{currentOrdersList.length}</Badge></div>
      </span>
      }


      <Drawer open={drawerState} onClose={onClose} title="View Order">

        <div className="product-item">
          {
            currentOrdersList.map((value: product, index: number) => {
              return (
                <>

                  <Card
                    className="card-drawer"
                    cover={
                      <img
                        alt="example"
                        src={value.image}
                        style={{ maxWidth: 60, minWidth: 60, height: 60 }}
                      />
                    }
                  >
                    <div className="card-body">
                      <div className="details">
                        <div className="bold spacebtwn">{value.name}
                          <div className="delicon" onClick={() => handleDeleteOrderItem(index)}><DeleteOutlined /></div>
                        </div>
                        <div className="discription">
                          {value.description}
                        </div>
                        <div className="quantity">
                          <div className="quantitybtn padding-0">
                            <Button
                              type="primary"
                              icon={<MinusOutlined />}
                              size="small"
                              onClick={() => decrease(value, index)}
                            />
                            <Input
                              value={currentOrders?.[index]?.quantity}
                              defaultValue={0}
                            />
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              size="small"
                              onClick={() => increase(value, index)}
                            />
                          </div>
                        </div>
                        <div className="price">
                          <span className="bold">Price :</span> ${value.price} x {currentOrders?.[index]?.quantity}= <strong>${value.price * currentOrders?.[index]?.quantity}</strong>
                        </div>
                      </div>
                    </div>
                  </Card>


                </>
              )
            })
          }
        </div>
        <div className="drawer-footer">
          <div className="order-placement">
            <p>Subtotal</p>
            <span> $
            {
              currentOrdersList.reduce(function (sum: any, val: any) { return sum + parseInt(val.totalprice) }, 0)
            }</span>
           
          </div>
          <Button type="primary" onClick={handleConfirmOrder}>Confirm Order </Button>
        </div>
      </Drawer >
    </div >
  )
}