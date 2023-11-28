import React from 'react';
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import   './app/layout/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreContext, store } from './app/stores/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/router';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css'

const root: HTMLElement  = document.getElementById('root');

ReactDOM.createRoot(root).render(
 
    <StoreContext.Provider value={store}>
     <RouterProvider router={router}/>
    </StoreContext.Provider>
,
)
