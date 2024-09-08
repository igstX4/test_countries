import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { TableComp } from './Components/Table/Table';
import { Detailed } from './Components/Detailed/Detailed';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '/', element: <TableComp />},
      {path: '/detailed/:code', element: <Detailed />}
    ]
  },
  // {
  //   path: '/detailed/:code',
  //   element: <About />,
  // },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router}/>
);

