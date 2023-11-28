import {  Container} from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {

  const location = useLocation();
  /*

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancleSelectedActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id? : string) {
    id ? handleSelectActivity(id) : handleCancleSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }
  */

  return (
    <>
<ToastContainer  position="bottom-right" hideProgressBar theme="colored"/>
    {
      location.pathname === '/' ? <HomePage /> : (
        <>
            <NavBar />
            <Container fluid="sm" className="mt-4">
                <Outlet />
            </Container>
        </>
      )
    }

    </>
  );
}

export default observer(App);
