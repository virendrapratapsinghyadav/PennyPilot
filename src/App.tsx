import './App.css'
import Landing from './pages/Landing'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Hero from './pages/Hero'
import Help from './pages/Help'
import AIInsights from './pages/AIInsights'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from './firebase/auth'
import { useUserStore } from './store/store'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase/config'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
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
      },
    ]
  },
])


function App() {

  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(
          doc(db, "users", currentUser.uid)
        );
        const profile = userDoc.exists()? userDoc.data(): null;

        setUser({
          id: currentUser.uid,
          name: profile?.name ?? "",
          email: currentUser.email ?? "",
          profileURL: profile?.profileURL ?? ""
        });
      } else {
        console.log("ERROR: listener user not found");
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
