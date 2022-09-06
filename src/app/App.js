import Login from "../pages/Login";
import React from "react";
import UserForm from "../pages/User";
import DashBoard from "../pages/DashBoard";
import {Route,Routes} from "react-router-dom";
import Product from "../pages/Product";
import Cart from "../pages/Cart";

function App() {
  return (
  // <Login/>
    //<UserForm/>
     // <DashBoard/>
    // <Product/>
   //<Cart/>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route  path='/user' element={<UserForm/>}/>
        <Route  path='/dash' element={<DashBoard/>}/>
        <Route  path='/product' element={<Product/>}/>
        <Route  path='/cart' element={<Cart/>}/>
      </Routes>
  );
}

export default App;
