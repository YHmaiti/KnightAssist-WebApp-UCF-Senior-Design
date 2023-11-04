const express = require('express');
const router = express.Router();

const Event = require('../../models/events'); 
const UserStudent = require('../../models/userStudent');
router.post('/rsvp', async (req, res) => {
        const { eventID, eventName, userID, userEmail } = req.body;

        if (!eventID || !userID || !eventName || !userEmail) {
                return res.status(400).send("Missing credentials to RSVP for event");
        }

        try {
                const query = {
                        $or: [
                                { eventID: eventID },
                                { name: eventName }
                        ]
                };
                const selectedEvent = await Event.findOne(query);


                if (!selectedEvent) {
                        return res.status(404).send("Event not found with neither the ID nor the name (potentially not in the DB)");
                }

                // Check if the user already registered
                if (selectedEvent.attendees.includes(userID)
                || selectedEvent.registeredVolunteers.includes(userID)
                || selectedEvent.registeredVolunteers.includes(userEmail)
                || selectedEvent.attendees.includes(userEmail)) 
                {
                        return res.status(400).send("User already RSVP'd to this event");
                }

                // check if the event is already at max length
                // if it has a max num of attendees (which is not always the case)
                if (selectedEvent.maxAttendees && selectedEvent.attendees.length >= selectedEvent.maxAttendees) {
                        return res.status(400).send("Event is at full capacity");
                }

                // register the user to the event
                selectedEvent.attendees.push(userID);

                await selectedEvent.save();

                const userRegistered = await userStudent.findOne({ email: userEmail });

                if (!userRegistered) {
                        return res.status(404).send("User not found in the DB - cannot add to their event history/RSVP");
                }

                userRegistered.eventsRSVP.push(eventID);
                await userRegistered.save();

                res.status(200).send("RSVP successful for user " + userID + " to event " + eventID);
        } catch (err) {
                res.status(503).send("Internal server error: " + err.message);
        }
});

module.exports = router;
