import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import Loading from "../../../app/layout/Loading";
import ActivityFilters from "./ActivityFilters";


export default observer (function  ActivityDashboard() {

   const {activityStore} = useStore()
   const {loadActivities, activityRegistry} = activityStore

   useEffect(() => {
    if( activityRegistry.size === 0) {

      loadActivities();
    }
   }, [loadActivities, activityRegistry.size]);


 
 if(activityStore.loadingInitial) return <Loading content="Loading App"/>

    return (
        <>
        <Container fluid="md">
        <Row>
          <Col md={8}>
            <ActivityList />
          </Col>

          <Col md={4}>
            <ActivityFilters />
          </Col>
        </Row>
      </Container>
      </>

    )
})