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
import Chatbot from './pages/RibbonPage/Chatbot.jsx';
import BlogPage from './pages/User/Blogpage.jsx';
import BlogSubmitForm from './pages/User/Blogsubmit.jsx';
import Community from './pages/User/CommunityPage.jsx';
import FAQ from './pages/User/faq.jsx';
import MentorList from './pages/User/Mentorlist.jsx';
import VideoCall from './pages/User/VideoCall.jsx';
import MentorCal from './pages/MentorCal/MentorCall.jsx';
import Chat from './Chat/index.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
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
    element:<App/>
  },
  {
    path:"/signup",
    element:<UserSignUp/>
  },
  {
    path:"/chat",
    element:<Chatbot/>
  }
  ,{
    path:"/blogpage",
    element:<BlogPage/>
  }
  ,{
    path:"/blogsubmit",
    element:<BlogSubmitForm/>
  }
  ,{
    path:"/communitypage",
    element:<Community/>
  }
  ,{
    path:"/faq",
    element:<FAQ/>
  }
  ,{
    path:"/mentorlist",
    element:<MentorList/>
  }
  ,{
    path:"/videocall",
    element:<VideoCall/>
  },{
    path:"/mentorcal",
    element:<MentorCal/>
  },
  {
    path:"/userchat",
    element:<Chat/>
  }
]);


createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
)
