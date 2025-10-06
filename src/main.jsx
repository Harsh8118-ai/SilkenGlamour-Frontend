import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Css.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from './Layout';
import { AuthProvider } from './Store/auth';
import { CartProvider } from './components/Cart/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Blog from './components/Blog/Blog';
import Review from './components/Review/Review';
import SearchServices from './components/Home/SearchServices';
import TrackOrder from './components/Orders/TrackOrder';
import TrackOrderList from './components/Orders/TrackOrderList';
import OrderHistory from './components/Orders/OrderHistory';
import AdminDashboard from './components/Admin/Admin';
import AdminRoute from './components/Admin/AdminRoute';
import AdminOrdersPage from './components/Admin/AdminOrdersPage';
import AdminUsersPage from './components/Admin/AdminUsersPage';
import AdminLayout from './components/Admin/AdminLayout';



// Load Google Analytics ID from .env
const TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(TRACKING_ID);

// Function to track page views
const TrackPageView = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  return null;
};

// Lazy-loaded components for better code splitting
const Home = React.lazy(() => import('./components/Home/Home'));
const About = React.lazy(() => import('./components/About/About'));
const ContactLayout = React.lazy(() => import('./components/Contact/ContactLayout'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));
const SignUp = React.lazy(() => import('./components/Contact/SignUp'));
const Login = React.lazy(() => import('./components/Contact/LogIn'));
const LogOut = React.lazy(() => import('./components/Contact/LogOut'));
const ServiceLayout = React.lazy(() => import('./components/Service/Service Nav/ServiceLayout'));
const Service = React.lazy(() => import('./components/Service/Service Nav/Service'));
const CardNailArt = React.lazy(() => import('./components/Service/Service Card/CardNailArt'));
const CardHairCare = React.lazy(() => import('./components/Service/Service Card/CardHairCare'));
const CardManiPedi = React.lazy(() => import('./components/Service/Service Card/CardManiPedi'));
const CardWaxing = React.lazy(() => import('./components/Service/Service Card/CardWaxing'));
const CardBleach = React.lazy(() => import('./components/Service/Service Card/CardBleach'));
const CardWedding = React.lazy(() => import('./components/Service/Service Card/CardWedding'));
const CardBodyPolishing = React.lazy(() => import('./components/Service/Service Card/CardBodyPolishing'));
const CardThreading = React.lazy(() => import('./components/Service/Service Card/CardThreading'));
const CardFacial = React.lazy(() => import('./components/Service/Service Card/CardFacial'));
const ChatBotLayout = React.lazy(() => import('./components/FAQ/ChatBotLayout'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const AuthSuccess = React.lazy(() => import('./Store/AuthSuccess'));
const BookingPage = React.lazy(() => import('./components/Mehndi/BookingPage'));



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <Home />
          </Suspense>
        }
      />

      <Route element={<AdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
                <AdminOrdersPage />
              </Suspense>
            }
          />
          <Route
            path="users"
            element={
              <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
                <AdminUsersPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route
        path="review"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <Review />
          </Suspense>
        }
      />

      <Route
        path="book"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <BookingPage />
          </Suspense>
        }
      />

      <Route
        path="about"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <About />
          </Suspense>
        }
      />
      <Route
        path="auth-success"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <AuthSuccess />
          </Suspense>
        }
      />
      <Route
        path="track-order/:userId/:orderId"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <TrackOrder />
          </Suspense>
        }
      />
      <Route
        path="my-order"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <TrackOrderList />
          </Suspense>
        }
      />
      <Route
        path="order-history"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <OrderHistory />
          </Suspense>
        }
      />
      <Route
        path="profile"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="search-services"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <SearchServices />
          </Suspense>
        }
      />
      <Route path="contact" element={
        <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
          <ContactLayout />
        </Suspense>
      }>
        <Route
          index
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <Contact />
            </Suspense>
          }
        />
        <Route
          path="signup"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="logout"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <LogOut />
            </Suspense>
          }
        />
      </Route>

      <Route path="service" element={
        <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
          <ServiceLayout />
        </Suspense>
      }>
        <Route
          index
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <Service />
            </Suspense>
          }
        />
        <Route
          path="nailart"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardNailArt />
            </Suspense>
          }
        />
        <Route
          path="haircare"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardHairCare />
            </Suspense>
          }
        />
        <Route
          path="mani-pedi"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardManiPedi />
            </Suspense>
          }
        />
        <Route
          path="waxing"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardWaxing />
            </Suspense>
          }
        />
        <Route
          path="bleach-dtan"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardBleach />
            </Suspense>
          }
        />
        <Route
          path="weddingpackage"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardWedding />
            </Suspense>
          }
        />
        <Route
          path="body-polishing"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardBodyPolishing />
            </Suspense>
          }
        />
        <Route
          path="threading"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardThreading />
            </Suspense>
          }
        />
        <Route
          path="facial-cleanup"
          element={
            <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
              <CardFacial />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="blog"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <Blog />
          </Suspense>
        }
      />
      <Route
        path="faq"
        element={
          <Suspense fallback={<div className='bg-MainBGColorYellow h-screen w-full'></div>}>
            <ChatBotLayout />
          </Suspense>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router}>
        <TrackPageView />
      </RouterProvider>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        bodyClassName='Toastify__toast--custom'
        progressClassName='Toastify__progress-bar'
      />

    </CartProvider>
  </AuthProvider>
);
