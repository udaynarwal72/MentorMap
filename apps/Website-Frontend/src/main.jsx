import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css'
import UserLogin from './pages/User/Login.jsx';
import { RecoilRoot } from 'recoil';
import UserProfile from "./pages/User/UserProfile.jsx"
import About from './pages/RibbonPage/About.jsx';
import ContactUs from './pages/RibbonPage/ContactUs.jsx';
import Home from './pages/RibbonPage/Home.jsx';
import UserSignUp from './pages/User/SignUp.jsx';
import CommunityPage from './pages/User/communityPage.jsx';
import VideoCall from './pages/User/videoCall.jsx';
import FAQ from './pages/User/faq.jsx';
import MentorList from './pages/User/mentorlist.jsx';
import BlogPage from './pages/User/blogpage.jsx';
import BlogSubmitForm from './pages/User/blogsubmit.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <UserLogin />
  },
  {
    path: '/user/:userId',
    element: <UserProfile />
  },{
    path:"/about",
    element:<About/>
  },{
    path:"/contact",
    element:<ContactUs/>
  },{
    path:"/home",
    element:<Home/>
  },
  {
    path:"/signup",
    element:<UserSignUp/>
  },
  {
    path:"/communitypage",
    element:<CommunityPage/>
  },
  {
    path:"/videocall",
    element:<VideoCall/>
  },
  {
    path:"/faq",
    element:<FAQ/>
  },
  {
    path:"/mentorlist",
    element:<MentorList/>
  },
  {
    path:"blogpage",
    element:<BlogPage/>
  },
  {
    path:"blogsubmit",
    element:<BlogSubmitForm/>
  },
]);


createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
)
