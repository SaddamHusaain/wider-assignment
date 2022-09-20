import { Layout } from "antd";
import { Header, Content } from "antd/lib/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import ConfirmOrder from "../../drawers/confirmOrder";

export default function LayoutContainer({ children }: { children: any }) {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header className="header">
        <Link to="/" className="logo"> Deli Resturant </Link>
        <nav>
          <ul>
            <li onClick={() => navigate("/")}>
              <span className={window.location.pathname === "/" ? "active" : ""} >Inventory</span>
            </li>
            <li onClick={() => navigate("/view-all-orders")}>
              <span className={window.location.pathname === "/view-all-orders" ? "active" : ""} >View all orders</span>
            </li>
          </ul>
          <ConfirmOrder product={''} />
        </nav>
      </Header>
      <Content className="content">
        {children}
      </Content>
    </Layout >
  )
}