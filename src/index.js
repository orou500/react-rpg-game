import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';
import About from './Pages/About';
import { AuthProvider } from './context/AuthProvider';
import reportWebVitals from './reportWebVitals';
import RequireAuth from './components/RequireAuth';
import Admin from './Pages/Admin';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';


if(process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path='/About' element={<About />} />
            {/* V Protected Routs V */}
            <Route element={<RequireAuth />}>
              <Route path='/' element={<App />} />
              <Route path='/Profile' element={<Profile />} />
              <Route path='/Admin' element={<Admin />} />
              <Route path='/Logout' element={<Logout />} />
            </Route>
            {/*  ^Protected Routs^ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
