import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';

import 'bootstrap/dist/js/bootstrap.bundle.js';
import Signup from './components/screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './components/screens/MyOrder';


const App = () => {

  return (
    <div>

      <CartProvider>

        <Router>
          <div>

            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/createuser' element={<Signup />} />
              <Route path='/myOrder' element={<MyOrder />} />
              


            </Routes>

          </div>
        </Router>
      </CartProvider>


    </div>
  );
};

export default App;
