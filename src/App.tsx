import './App.css';

import { RouterProvider } from 'react-router-dom';

import { router } from './routes/AppRoutes';

import { useAuthListener } from './hooks/useAuthListener';


function App() {

  useAuthListener();

  return <RouterProvider router={router} />;
}

export default App;