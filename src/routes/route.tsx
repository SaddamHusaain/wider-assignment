import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inventry from "../pages/inventory";
import ViewAllOrders from "../pages/view_all_orders";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inventry />} />
        <Route path="/view-all-orders" element={<ViewAllOrders />} />
      </Routes>
    </BrowserRouter>
  );
}