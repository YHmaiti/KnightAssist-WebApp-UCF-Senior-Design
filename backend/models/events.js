const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserStudent = require('./userStudent.js').schema;
// const Organization = require('./organization.js').schema;

const eventSchema = new Schema({
    eventID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    location: String,
    date: Date,
    sponsoringOrganization: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
    }],
    registeredVolunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
    }],
    startTime: Date,
    endTime: Date,
    eventLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        website: String
    },
    eventTags: [String],
    semester: String,
    maxAttendees: {
        type: Number,
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
}, {collection: 'event', timestamps: true});

module.exports = mongoose.model('event', eventSchema);