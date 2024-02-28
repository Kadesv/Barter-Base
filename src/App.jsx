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
      <Route index element={<BrowsepostsPage />}
        loader={async () => {
          const res = await axios.get('/api/posts/browse');
          return { posts: res.data };
        }} />


      <Route path='/account' element={<AccountPage />}
        loader={async () => {
          const res = await axios.get('/api/posts/account');
          return { posts: res.data };
        }} />

      {/* post detail pages */}
      <Route
        path="posts/:postId"
        element={<postDetailPage />}
        loader={async ({ params }) => {
          const res = await axios.get(`/api/posts/${params.postId}`);
          const { post, comments } = res.data;
          return { post, comments };
        }}
      />

      <Route
        path="posts/new"
        element={<PostDetailPage />}
        loader={async () => {
          const res = await axios.get(`/api/posts/new`);
          return { posts: res.data };
        }}
      />

      <Route
        path="chat/new"
        element={<postDetailPage />}
        loader={async () => {
          const res = await axios.get(`/api/comments/new`);
          return { comments: res.data };
        }}
      />

      
<Route
        path="chat/newMessage"
        element={<postDetailPage />}
        loader={async () => {
          const res = await axios.get(`/api/messages/new`);
          return { message: res.data };
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

