import React  from "react";
import {
  Card,
} from "react-bootstrap";
import { IActivity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import {
  ClockFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import { format } from "date-fns";


interface Props {
  activity: IActivity;
}

export default function ActivityListItem({ activity }: Props) {
  //const [target, setTarget] = useState("");

  //const { activityStore } = useStore();
  //const { deleteActivity, deleteSubmitting } = activityStore;

  // function handleActivityDelete(
  //   e: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) {
  //   setTarget(e.currentTarget.name);
  //   deleteActivity(id);
  // }

  return (
    <Card style={{ width: "50rem" }} key={activity.id}>
      <Card.Body>
        <Card.Img
          style={{ width: "6rem" }}
          className="rounded-circle"
          variant="left"
          sizes="sm"
          src="/assets/user.png"
        ></Card.Img>
        <Card.Body className="d-inline-block">
          <Card.Title style={{fontSize: "18px", fontWeight: 600, textDecoration: "none"}} as={Link} to={`/activities/${activity.id}`}>{activity.title}</Card.Title>
          <Card.Text style={{fontSize: "14px", fontWeight: 500}}>Hosted By Mohamed</Card.Text>
        </Card.Body>
      </Card.Body>
      <Card.Body>
        <Card.Body className="border-top">
          <Card.Subtitle className="d-inline ">
            <ClockFill size={13} style={{ marginBottom: "2px" }} />{" "}
            {format(activity.date!, 'dd MMM yyyy h:mm aa')}
          </Card.Subtitle>
          <Card.Text className="d-inline">
            <GeoAltFill
              size={13}
              style={{ marginBottom: "2px", marginLeft: "7px" }}
            />{" "}
            {activity.city}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="border-bottom border-light">Attendance to here</Card.Footer>
        <Card.Body>
        <Card.Text className="mb-0 d-inline-block" style={{marginTop: "5px", fontWeight: 600}}>{activity.description}</Card.Text>
        <Card.Link
          className="float-end btn btn-success text-white"
          as={Link}
          to={`/activities/${activity.id}`}
        >
          View
        </Card.Link>
        </Card.Body>
      </Card.Body>
    </Card>
  );
}
