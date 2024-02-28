import { useState, useEffect } from 'react';
import { Alert, Dialog, Box, Button, Typography, CardContent } from '@mui/material';
import { Scheduler } from "@aldabil/react-scheduler";
import { buildPath } from '../../path';
import Snackbar from '@mui/joy/Snackbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function Calendar() {
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [rsvpEvents, setRSVPEvents] = useState([]);
//   const [message, setMessage] = useState("");
//   const [open, setOpen] = useState(false);

const [upcomingEvents, setUpcomingEvents] = useState([]);

async function getStudentInfo() {
    upcomingEvents.push({
        _id: '1',
        title: 'Name',
        start: new Date(),
        end: new Date(),
        editable: false,
        deletable: false,
        draggable: false,
        description: 'fsdlf',
        location: 'sdfd',
        maxAttendees: 5,
        numRegistered: 9,
        rsvpStatus: false
    });
}


useEffect(() => {
    getStudentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// _id: event._id,
// title: event.name,
// start: new Date(event.startTime),
// end: new Date(event.endTime),
// editable: false,
// deletable: false,
// draggable: false,
// description: event.description,
// location: event.location,
// maxAttendees: event.maxAttendees,
// numRegistered: event.registeredVolunteers.length,
// rsvpStatus: hasRSVP,

const customViewer = (event, close) => {
    const formatDateTimeRange = (start, end) => {
      const optionsDate = {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
      };
  
      const optionsTime = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
  
      const formattedDate = start.toLocaleString(undefined, optionsDate);
      const formattedStartTime = start.toLocaleString(undefined, optionsTime);
      const formattedEndTime = end.toLocaleString(undefined, optionsTime);
  
      return (
        <div>
          <p style={{ margin: '0', lineHeight: '0.7' }}>{formattedDate}</p>
          <p style={{ marginTop: '8px' }}>
            {formattedStartTime} - {formattedEndTime}
          </p>
        </div>
      );
    };
  
    async function unrsvpEvent(event){
      try {
        // var url = buildPath(`api/cancelRSVP`);
        // var studentID = sessionStorage.getItem("ID");
        // var json = {
        //   eventID: event._id,
        //   eventName: event.title,
        //   userID: studentID
        // }
        // console.log(json);
        // var response = await fetch(url, {
        //   body: JSON.stringify(json),
        //   method: "DELETE",
        //   headers: {"Content-Type": "application/json"},
        // });
        
        // var res = await response.text();
        // console.log(res);
        // setRSVPEvents(prevRSVPEvents => prevRSVPEvents.filter(e => e._id !== event._id));
      } catch(e) {
        console.log("unrsvp failed");
      }
    }
  
    async function rsvpEvent(event){
      console.log(event);
      try {
        // var url = buildPath(`api/RSVPForEvent`);
  
        // var studentID = sessionStorage.getItem("ID");
        // console.log("rsvp Event try");
        // var json = {
        //   eventID: event._id,
        //   eventName: event.title,
        //   userID: studentID,
        //   check: 0
        // }
        // console.log(json);
        // var response = await fetch(url, {
        //   body: JSON.stringify(json),
        //   method: "POST",
        //   headers: {"Content-Type": "application/json"},
        // });
        
        // var res = await response.text();
  
        // console.log(res);
        // setRSVPEvents(prevRSVPEvents => [...prevRSVPEvents, event]);
      } catch(e) {
        console.log("rsvp API call failed: " + e);
      }
    }
  
    const handleButtonClick = (event) => {
    //   if (event.rsvpStatus === "Full Capacity") {
    //     console.log("Full");
    //   } else if (event.rsvpStatus === "RSVP") {
    //     rsvpEvent(event);
    //     setMessage("RSVP Successful")
    //     setOpen(true);
    //   } else if (event.rsvpStatus === "Undo RSVP") {
    //     unrsvpEvent(event);
    //     setMessage("Cancelled RSVP")
    //     setOpen(true);
    //   }
  
      close();
    };
    return (
      <Box sx={{maxWidth: '500px'}}>
        <Box sx={{ margin: "20px" }}>
          <div>
          <p>{`${event._id}`}</p>
            <h3>{event.title}</h3>
            <p>{formatDateTimeRange(event.start, event.end)}</p>
            <p style={{ margin: '0', lineHeight: '0.7' }}>{"Capacity: " + event.numRegistered + '/' + event.maxAttendees}</p>
            <p style={{marginTop: '8px'}}>{"Location: "+event.location}</p>
            <p>{`${event.rsvpStatus}`}</p>
            <p>{`${event.description}`}</p>
          </div>
          <div>
            <Box sx={{display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={close} variant="outlined" sx={{marginRight: "5px" }}>
              Close
            </Button>
            <Button onClick={() => handleButtonClick(event)} disabled={event.rsvpStatus === "Full Capacity"} variant="contained">
              {event.rsvpStatus === "Full Capacity" ? "Full Capacity" : event.rsvpStatus}
            </Button>
            </Box>
          </div>
        </Box>
      </Box>
    );
  };



  return (
    <div style={{color: 'black', marginBottom: '20px'}}>
        <Scheduler
          view="month"
          height={450}
          //width={400}
          editable={false}
          events={upcomingEvents}
          customViewer={customViewer}
        />
    </div>
  );
}

export default Calendar;