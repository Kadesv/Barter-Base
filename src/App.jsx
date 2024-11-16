import { lazy, Suspense } from 'react';
import Root from './Root.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const BrowsePostsPage = lazy(() => import('./Pages/BrowsePostsPage.jsx'));
const AccountPage = lazy(() => import('./Pages/AccountPage.jsx'));
const MessagePage = lazy(() => import('./Pages/MessagePage.jsx'));
const SignInPage = lazy(() => import('./Pages/SignInPage.jsx'));
const SignUpPage = lazy(() => import('./Pages/SignUpPage.jsx'));
const AboutPage = lazy(() => import('./Pages/AboutPage.jsx'));

// Create a React Query client
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={async () => {
        const res = await axios.get('/api/posts/getCategories');
        return { categories: res.data };
      }}
      errorElement={<ErrorPage />}
    >
      <Route
        index
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <BrowsePostsPage />
          </Suspense>
        }
        loader={async () => axios.get('/api/posts/browse').then(res => res.data)}
      />
      <Route
        path="/account"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AccountPage />
          </Suspense>
        }
        loader={async () => axios.get('/api/accountInfo').then(res => res.data)}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="chats/:chatId"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <MessagePage />
          </Suspense>
        }
        loader={async ({ params }) => axios.get(`/api/chat/${params.chatId}`).then(res => res.data)}
      />
    </Route>,
  ),
);

export default function App() {
  return (
    // Wrap your application with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
