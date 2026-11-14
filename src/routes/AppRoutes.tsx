import {
  createBrowserRouter
} from 'react-router-dom';

import Landing from '@/pages/Landing';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';

import Dashboard from '@/pages/Dashboard';
import Hero from '@/pages/Hero';
import Help from '@/pages/Help';
import AIInsights from '@/pages/AIInsights';
import Analytics from '@/pages/Analytics';
import Profile from '@/pages/Profile';

import ProtectedRoute from '@/components/ProtectedRoute';


export const router = createBrowserRouter([

  {
    path: '/',
    element: <Landing />
  },

  {
    path: '/signup',
    element: <Signup />
  },

  {
    path: '/login',
    element: <Login />
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,

        children: [
          {
            index: true,
            element: <Hero />
          },
          {
            path: 'analytics',
            element: <Analytics />
          },
          {
            path: 'aiinsights',
            element: <AIInsights />
          },
          {
            path: 'help',
            element: <Help />
          },
          {
            path: 'profile',
            element: <Profile />
          }
        ]
      }
    ]
  }

]);