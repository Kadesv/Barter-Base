import Root from './Root.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import BrowsePostsPage from './Pages/BrowsePostsPage.jsx';
import MessagePage from './Pages/MessagePage.jsx';
import AccountPage from './Pages/AccountPage.jsx';
import SignInPage from './Pages/SignInPage.jsx';
import SignUpPage from './Pages/SignUpPage.jsx';
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
    <Route path="/" element={<Root />}
      loader={async () => {
        const res = await axios.get('/api/posts/getCategories');
        return { categories: res.data };
      }}
      errorElement={<ErrorPage />}>

      {/* Homepage */}
      <Route index element={<BrowsePostsPage />}
        loader={async () => {
          const res = await axios.get('/api/posts/browse');
          const { userFavorites, posts } = res.data
          return ({ posts, userFavorites });
        }} />

      <Route path='/account' element={<AccountPage />} 
      errorElement={<ErrorPage />}

      loader={async ()=>{ 
        const res = await axios.get('/api/accountInfo');
       if(res.data.success === false){
        return {user: undefined}
       }
        return res.data

      }}/>

      <Route path='/about' element={<AboutPage />} />
      <Route path='/signIn' element={<SignInPage />}></Route>
      <Route path='/signup' element={<SignUpPage />}></Route>
      <Route path='chats/:chatId'
        element={<MessagePage />}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/chat/${params.chatId}`);
          return { chatInfo: res.data }
        }}
      />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

