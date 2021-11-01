import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import { format } from "date-fns";
import { dateFormat } from "../../utils/DateUtils";

import { REMOVE_BOOKING } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import { QUERY_ALL_BOOKINGS_BY_USER_ID } from "../../gql/queries";
import Booking from "../../pages/Booking";
import { useQuery } from "@apollo/client";

const containerStyle = {
  overflowY: "scroll",
  width: "100%",
};

export default (props) => {
  console.log("EVENTLIST...........props received-------------", props);

  const [removeBooking] = useMutation(REMOVE_BOOKING);


  const handleRemoveBooking = (bookingId) => 
  {
    console.log("To Cancel Booking - " , bookingId);
    try {
      console.log("bookResponsebookingId%%%%%%%%% ", bookingId);
     // console.log("IN DELETEEEEEEEEEEEEEEEEEEEE", props.hasSelectedEvent ? props.selectedEvent.uid : null);
       removeThisBooking(bookingId);
     } catch (e) {
       console.log(e);
     }
   
  }

  async function removeThisBooking(bookingId) {
    let result = await removeBooking({
      variables: {
        bookingId: bookingId,
      },
    });
    return result;
  }

  //Load Doctors
  const { loading, data } = useQuery(QUERY_ALL_BOOKINGS_BY_USER_ID);
  const userBookings = data?.userBookings || {};

  console.log("data", data);
  console.log("bookings", userBookings);

  async function isValidNode(node) {
    console.log("Node Value", node.uid.value);
    return node.uid.value != "";
  }

  //Construct a new Event with the map and formatted data from DB
  function constructNewEvent(userBooking) {
    const newEvent = {
      dtstart: userBooking.dtstartVal,
      dtend: userBooking.dtendVal,
      title: userBooking.titleVal,
      location: userBooking.locationVal,
      description: userBooking.descriptionVal,
      doctorName: userBooking.doctorName,
      // uid: props.hasSelectedEvent ? props.selectedEvent.uid : +new Date(),
      uid: userBooking.uid,
    };
    return newEvent;
  }

  //Map and format data from DB to construct an array
  function constructNewFormattedUserBooking(userBooking) {
    const formattedUserBooking = {
      dtstartVal: new Date(userBooking.dob),
      dtendVal: new Date(userBooking.apptDateTime),
      titleVal: userBooking.patientName,
      locationVal: userBooking.email,
      descriptionVal: userBooking.contactNumber,
      doctorName: userBooking.doctorId,
      uid: userBooking.bookingId,
    };
    return formattedUserBooking;
  }

  function clearEvents() {
    const emptyEvents = [];
    this.setState({ events: emptyEvents });
  }
  //Form OnLoad
  loadFromDB();

  function loadFromDB() {
    console.log("userBookings.length", userBookings.length);

  if (userBookings && userBookings.length && userBookings.length > 0) {
    console.log("userBookings.length###########", userBookings.length);
    //const bookingArray = Array.from(userBookings.map, ([name, value]) => ({ name, value }));

    //  console.log("ÄRRAY...........", bookingArray);
    //Populate Events with Bookings data
    // clearEvents();

    for (let j = 0; j < userBookings.length; j++) {
      let userBooking = userBookings[j];

      const eventIndex = props.events.findIndex((obj) => {
        return obj.uid === userBooking.bookingId;
      });

      const formattedDBUserBooking =
        constructNewFormattedUserBooking(userBooking);

      console.log("userBooking bookingId is ", userBooking.bookingId);

      if (eventIndex === -1) {
        //Create a new Event record and push to existing props.events
        const newEvent = constructNewEvent(formattedDBUserBooking);
        props.events.push(newEvent);
      } else {
        //Update the existing props.events
        const existingEvent = props.events[eventIndex];
        existingEvent.dtstart = formattedDBUserBooking.dtstartVal;
        existingEvent.dtend = formattedDBUserBooking.dtendVal;
        existingEvent.title = formattedDBUserBooking.titleVal;
        existingEvent.location = formattedDBUserBooking.locationVal;
        existingEvent.description = formattedDBUserBooking.descriptionVal;
        existingEvent.doctorName = formattedDBUserBooking.doctorName;
      }
    }
  }
  console.log("PROPS EVENTS...........", props.events);

  }
    const events = props.events
    // .sort((a, b) => {
    //   return new Date(a.dtstart) > new Date(b.dtend) ? 1 : -1;
    // })
    .map((node, index) => {
      console.log("node.............", node);
      if (node.uid) {
        const fmtDTStart =
          node.dtstart != null
            ? format(new Date(node.dtstart), dateFormat)
            : null;
        const fmtDTEnd =
          node.dtstart != null
            ? format(new Date(node.dtend), dateFormat)
            : null;
        // console.log("fmtDTEnd.............", fmtDTEnd);
        return (
          <div key={index}>
            <ListItem button alignItems="flex-start">
              <ListItemIcon>
                <EventIcon style={{ color: "#FFFF00", fontSize: "3em" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="p"
                      //variant="body2"
                      style={{ color: "#FFFFFF" }}
                    >
                      <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                        Patient Date of Birth:
                      </span>
                      {fmtDTStart}
                    </Typography>
                    <Typography
                      component="p"
                      //variant="body2"
                      style={{ color: "#FFFFFF" }}
                    >
                      <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                        Appointment Date / Time :
                      </span>
                      {fmtDTEnd}
                    </Typography>
                    <Typography
                      component="p"
                      //variant="body2"
                      style={{ color: "#FFFFFF", fontWeight: "bold" }}
                    >
                     Patient Name : {node.title}
                    </Typography>
                    <Typography
                      component="p"
                      //variant="body2"
                      style={{ color: "#FFFFFF" }}
                    >
                      <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                        Doctor's Name:
                      </span>
                      {node.doctorName}
                    </Typography>
                    <Typography
                      component="p"
                      //variant="body2"
                      style={{ color: "#FFFFFF" }}
                    >
                      <span style={{ fontWeight: "bold", marginRight: ".5em" }}>
                        Patient EMail :
                      </span>
                      {node.location}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      //variant="body2"
                      style={{ color: "#FFFFFF", fontSize: "1em" }}
                    >
                      Patient Contact Number : {node.description}
                    </Typography>
                  </React.Fragment>
                }
              />
              <div
                style={{
                  position: "absolute",
                  right: "2em",
                  top: "1em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Button
                variant="contained"
                color="primary"
                startIcon={<RemoveIcon />}
                onClick={() => { handleRemoveBooking(node.uid) }}
                title="Cancel (Delete) Appointment"
                disabled={props.formVisible}
                className="deletebutton"
                style={{ marginBottom: "1em" }}
              >
                <span className="buttontext">Cancel (Delete)</span>
              </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => props.onEditItem(node)}
                  title="Edit Appointment"
                  disabled={props.formVisible}
                  className="editbutton"
                >
                  <span className="buttontext">Edit</span>
                </Button>
              </div>
            </ListItem>
          </div>
        );
      }
    });

  return (
    <div style={containerStyle}>
      <List>{events}</List>
    </div>
  );
};
