import axios from 'axios';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Root from './Root.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import SignPage from './Pages/SignPage.jsx';
import BrowseForumsPage from './Pages/BrowseForumsPage.jsx';
import ForumDetailPage from './Pages/ForumDetailPage.jsx';
import AccountPage from './Pages/AccountPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>

      {/* Homepage */}
      <Route index element={<BrowseForumsPage />}
        loader={async () => {
          const res = await axios.get('/api/forums/browse');
          return { forums: res.data };
        }} />


      <Route path='/account' element={<AccountPage />}
        loader={async () => {
          const res = await axios.get('/api/forums/account');
          return { forums: res.data };
        }} />

      {/* Forum detail pages */}
      <Route
        path="forums/:forumId"
        element={<ForumDetailPage />}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/forums/${params.forumId}`);
          const { forum, comments } = res.data;
          return { forum, comments };
        }}
      />

      <Route
        path="forums/new"
        element={<ForumDetailPage />}
        loader={async () => {
          const res = await axios.get(`/api/forums/new`);
          return { forums: res.data };
        }}
      />

      <Route
        path="comments/new"
        element={<ForumDetailPage />}
        loader={async () => {
          const res = await axios.get(`/api/comments/new`);
          return { comments: res.data };
        }}
      />

      
<Route
        path="comments/newsub"
        element={<ForumDetailPage />}
        loader={async () => {
          const res = await axios.get(`/api/comments/newsub`);
          return { comments: res.data };
        }}
      />


      {/* Login */}
      <Route path="/sign" element={<SignPage />} />

    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}

