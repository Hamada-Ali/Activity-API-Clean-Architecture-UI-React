import { Col, Container, Row } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../app/layout/Loading";
import { observer } from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";



export default observer(function ActivityDetails() {
  const {activityStore} = useStore()
  
  const {selectedActivity, loadActivity, loadingInitial} = activityStore;

  const {id} = useParams()

  useEffect(( ) => {
    if(id) loadActivity(id)
  }, [id, loadActivity])

//   const params  = useParams();

//   console.log(params.id);

//   useEffect(() => {
//     activityStore.loadActivity(params.id);
// }, [activityStore]);

if (loadingInitial ||  !selectedActivity) return <Loading />

    return (

      <Container>
        <Row>
          <Col xs={8}>
            <ActivityDetailedHeader activity={selectedActivity}/>
            <ActivityDetailedInfo activity={selectedActivity}/>
            <ActivityDetailedChat />
          </Col>
          <Col xs={4}>
            <ActivityDetailedSidebar />
          </Col>
        </Row>
      </Container>

    )
}) 