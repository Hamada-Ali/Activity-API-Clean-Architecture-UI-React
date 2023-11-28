import { useStore } from "../../../app/stores/store";
import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import {  Card } from "react-bootstrap";


export default observer(function ActivityList() {


  const {activityStore}  = useStore()
  const  {groupedActivities} = activityStore
  

 return (
<>
  {groupedActivities &&  groupedActivities.map(([group, activities]) => (
    <Fragment key={group}>
      <Card.Title className="h6 text-success mb-4 mt-4">{group}</Card.Title>
      <Fragment>
            {activities.map((activity) => (
                
              <ActivityListItem key={activity.id} activity={activity}/>
            ))}
        </Fragment>
    </Fragment>
  ))}
</>
    )
})