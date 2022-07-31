import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import HomePage from "./templates/HomeTemplate/HomePage/ListMoviePage";
import AboutPage from "./templates/HomeTemplate/AboutPage";
import NewsPage from "./templates/HomeTemplate/NewsPage";
import Detail from "./templates/HomeTemplate/DetailPage/Detail";
import Login from "./templates/HomeTemplate/LoginHomePage/Login";
import Checkout from "./templates/HomeTemplate/CheckoutPage/Checkout";
import Loading from "./components/Loading/Loading";
import Register from "./templates/HomeTemplate/RegisterHomePage/Register";
import Profile from "./templates/HomeTemplate/ProfilePage/Profile";

function App() {
  return (
    <BrowserRouter>
      <Loading />
      <Routes>
        {/* HomeTemplate */}
        <Route path="/" element={<HomeTemplate />}>
          <Route path="" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* AuthHomePage */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* CheckoutPage */}
        <Route path="/checkout/:id" element={<Checkout />} />
        {/* AdminTemplate */}
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
