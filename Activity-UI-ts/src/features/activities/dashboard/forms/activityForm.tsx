import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import { useStore } from "../../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IActivity } from "../../../../app/models/activity";
import Loading from "../../../../app/layout/Loading";
import { v4 as uuid } from "uuid";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { FormField, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../../../app/common/form/myTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../../app/common/options/categoryOptions";
import MyDateInput from "../../../../app/common/form/myDateInput";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();

  const {
    selectedActivity,
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  // yup library with formik

  const validationRules = Yup.object({
    title: Yup.string().required('The Title is required'),
    description: Yup.string().required("The activity Description is required"),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  })

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: IActivity) { // handle submission on submit (create and edit)
      //e.preventDefault()
      if(!activity.id) {
          activity.id = uuid();
          createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      } else {
          updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      }
  }

  // function handleChange(e : ChangeEvent<HTMLInputElement>) {
  //     const {name, value} = e.target;

  //     setActivity({...activity, [name]: value})
  // }

  if (loadingInitial) return <Loading />;

  return (
    <>
      <Formik
        validationSchema={validationRules}
        enableReinitialize
        initialValues={activity}
        onSubmit={( values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form
          className="bg-light p-2 mt-2 form ui"
          onSubmit={handleSubmit}
          autoComplete="off"
          >
          <Header content='Activity Details' sub color='teal' />
            <MyTextInput name='title' placeholder="Title" />

            <MyTextArea
              rows={3}
              placeholder="description"
              
              name="description"
            />

            <MySelectInput options={categoryOptions} placeholder="Category" name="category" />

            <MyDateInput showTimeSelect timeCaption="time" dateFormat={'MMMM d, yyyy h:mm aa'}   placeholderText="Date" name="date" />

            <Header content='Location Details' sub color='teal' />

            <MyTextInput  placeholder="City" name="city" />

            <MyTextInput  placeholder="Venue" name="venue" />

            <Button variant="success" type="submit" disabled={isSubmitting || !dirty || !isValid}>
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {!loading && <span>submit</span>}
            </Button>

            <ButtonGroup
              as={Link}
              to={"/activities"}
              type="submit"
              className="float-end btn btn-danger"
            >
              Cancel
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
});
