import Root from './Root.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import BrowsePostsPage from './Pages/BrowsePostsPage.jsx';
import MessagePage from './Pages/MessagePage.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
import FavoritesPage from './Pages/FavoritesPage .jsx';
import AboutPage from './Pages/AboutPage.jsx';
import axios from 'axios';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import PostDetailPage from './Pages/PostDetailPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} 
      loader={async () => {
        const res = await axios.get('/api/posts/getCategories');
        return {categories: res.data};
      }}
    errorElement={<ErrorPage />}>

      {/* Homepage */}
      <Route index element={<BrowsePostsPage />}
        loader={async () => {
          const res = await axios.get('/api/posts/browse');
          const {userFavorites, posts} = res.data
          // console.log(userFavorites)
          return ({posts, userFavorites}) ;
        }} />
      <Route path='posts/:postId' 
        element={<PostDetailPage/>}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/posts/${params.postId}`);
          return {post: res.data}
        }}
     />
      
      <Route path='/account' element={<AccountPage />}
        // loader={async () => {
        //   const res = await axios.get('/api/posts/account');
        //   return res.data;
        // }}
          />
        <Route path='/favorites'element={<FavoritesPage />}/>
        <Route path='/about'element={<AboutPage />}/>
        <Route path='/signIn'element={<SignInPage />}></Route>
        <Route path='/signup'element={<SignUpPage />}></Route>
        <Route path='/messages'element={<MessagePage />}
        ></Route>

      

    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

