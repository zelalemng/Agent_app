import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Category from "./pages/CategoryPage";
import Homepage from "./pages/Homepage";
import Order from "./pages/OrderPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderList from "./components/OrderList";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              
                <Homepage />
              
            }
          />
          <Route
            path="/order"
            element={
              
                <Order />
              
              
              
            }
          />
          <Route
            path="/category"
            element={
              
                <Category />
              
              
              
            }
          />
        
          <Route
            path="/customers"
            element={
              
                <OrderList />
              
              
             
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
export function ProtectedRoute({ children }) {
  if (localStorage.Order("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
