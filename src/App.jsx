import Root from './Root.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import BrowsePostsPage from './Pages/BrowsePostsPage.jsx';
import MessagePage from './Pages/MessagePage.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import SignPage from './Pages/SignPage.jsx';
import FavoritesPage from './Pages/FavoritesPage .jsx';
import AboutPage from './Pages/AboutPage.jsx';
import axios from 'axios';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>

      {/* Homepage */}
      <Route index element={<BrowsePostsPage />}
        loader={async () => {
          const res = await axios.get('/api/posts/browse');
          return { posts: res.data };
        }} />
      <Route path='/post:id' element={<></>} />

      <Route path='/account' element={<AccountPage />}
        loader={async () => {
          const res = await axios.get('/api/posts/account');
          return res.data;
        }}
          />
        <Route path='/favorites'element={<FavoritesPage />}/>
        <Route path='/about'element={<AboutPage />}/>
        <Route path='/sign'element={<SignPage />}/>
        <Route path='/messages'element={<MessagePage />}
        ></Route>

      

    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

