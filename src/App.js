/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import './App.scss';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import './cssClasses.scss';
import 'antd/dist/reset.css';
import RequireAuth from './assets/RequireAuth';
import Products from './pages/Products/Products';
import { getUser } from './state/user/userSelector';
import { login } from './state/user/userThrunk';
import Error404 from './pages/Error404/Error404';
import MainHeader from './pages/MainHeader/MainHeader';
import Checkout from './pages/Checkout/Checkout';

/*----------------------------------------------------------------------------*/
/* App                                                                        */
/*----------------------------------------------------------------------------*/

const App = () => {
  const dispatch = useDispatch();
  const { loaded } = useSelector(getUser);

  useEffect(() => {
    dispatch(login('', '', true));
  }, [dispatch]);

  return (
    <>
      {loaded && (
        <>
          <div className='whole-page'>
            <MainHeader />
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='login' element={<Login />} />
              <Route
                path='products'
                element={
                  <RequireAuth>
                    <Products />
                  </RequireAuth>
                }
              />
              <Route path='*' element={<Error404 />} />
              <Route path='checkout' element={<Checkout />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
};

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
export default App;
