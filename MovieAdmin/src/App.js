import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Component, lazy } from "react";
import AdminTemplate from "./components/AdminTemplate";
import Movie from "./components/AdminTemplate/Movie";
import User from "./components/AdminTemplate/User";
import Auth from "./components/AdminTemplate/Auth";
import { Navigate } from "react-router-dom";
import LoginRegister from "./components/UserTemplate/WithCard";
import { MuiThemeProvider } from "material-ui/styles";
import Logout from "./components/AdminTemplate/Logout";
import AddMovie from "./components/AdminTemplate/Movie/AddMovie";
import EditMovie from "./components/AdminTemplate/Movie/EditMovie";
import ShowTime from "./components/AdminTemplate/Movie/Showtime";
import AddUser from "./components/AdminTemplate/User/AddUser";
import EditUser from "./components/AdminTemplate/User/EditUser";
const LoginLazy = lazy(() => import('./components/UserTemplate/WithCard'));
const AdminLazy = lazy(() => import('./components/AdminTemplate'));
// import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
// import { history } from './history';

function App() {
  return (
    // <HistoryRouter history={history}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<LoginLazy />}></Route>
          <Route path='admin' element={<AdminLazy />}>
            <Route path='user' element={<User />} />
            <Route path='add-user' element={<AddUser />} />
            <Route path='edit-user' element={<EditUser />} />
            <Route path='movie' element={<Movie />} />
            <Route path='add-movie' element={<AddMovie />} />
            <Route path='log-out' element={<Logout />} />
            <Route path='edit-movie/:id' element={<EditMovie />} />
            <Route path='show-time/:id' element={<ShowTime />} />
          </Route>
        </Routes >
      </BrowserRouter >
    </MuiThemeProvider>
    // {/* </HistoryRouter> */}
  );
}

export default App;
