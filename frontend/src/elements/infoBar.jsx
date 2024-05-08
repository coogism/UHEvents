import "./css/infobar.css"
import { getImage } from "../utils/imagePath"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { Rating } from '@mui/material';

import moment from "moment";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import api from "./api";

const OrgItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    width: "100%",
    // height: 100,
    maxWidth: 500,
    borderRadius: 0,
    marginTop: 5
}));


export default function InfoBar({ selectedEvent, selectedOrg, setCurrentOrg }) {
    const imagePath = getImage(selectedEvent)

    const momentStart = moment(selectedEvent?.startsOn).utcOffset("-06:00")
    const momentEnd = moment(selectedEvent?.endsOn).utcOffset("-06:00")

    const dayStart = momentStart.format('dddd, MMM Do h:mmA')
    const dayEnd = momentEnd.format('dddd, MMM Do h:mmA')

    console.log(selectedEvent)

    if (selectedOrg) {
        const OrganizerPfpLink = `https://se-images.campuslabs.com/clink/images/${selectedOrg?.profilePicture}?preset=small-sq`

        return (
            <div className="infoBar orgInfo">
                <div className="basicInfo">
                    <img className="orgPfp" src={OrganizerPfpLink} />
                    <h1>{selectedOrg.name}</h1>
                </div>
            </div>
        )
    }

    return (
        (selectedEvent &&
            <div className="infoBar">
                <div className="thumbnail">
                    <img src={imagePath} />
                </div>

                <div className="basicInfo">
                    <h1>{selectedEvent.name}</h1>
                </div>

                <div className="divider" />

                <div className="dateRange">
                    <CalendarMonthIcon className="calender-icon" />
                    <strong>Date and Time</strong>
                    <div className="rangeText">
                        <p>{dayStart} to</p>
                        <p>{dayEnd}</p>
                    </div>
                </div>

                <div className="divider" />

                <div className="location">
                    <LocationOnIcon className="location-icon" />
                    <strong>Location</strong>
                    <p>{selectedEvent.location}</p>
                </div>

                <div className="divider" />

                <div className="description">
                    <div dangerouslySetInnerHTML={{ __html: selectedEvent.description }} />
                </div>

                <a href="https://getinvolved.uh.edu/account/login?returnUrl=/event/10142455" target="_blank" className="signUpButton">
                    <div>
                        <span>Sign In (RSVP)</span>
                    </div>
                </a>

                <div className="divider" />

                <div className="organizers">
                    <strong>Host Organizations</strong>

                    <div className="hostList">
                        {
                            (selectedEvent.organizerInfos?.map((orgData) => {
                                const OrganizerPfpLink = `https://se-images.campuslabs.com/clink/images/${orgData?.profilePicture}?preset=small-sq`

                                return (
                                    <a onClick={() => { setCurrentOrg(orgData) }}>
                                        <OrgItem className="orgItem">
                                            <img className="orgPfp" src={OrganizerPfpLink} />
                                            <div className="orgCompact">
                                                <span>{orgData.name}</span>
                                                <Rating name="read-only" value={5} readOnly />
                                            </div>
                                        </OrgItem>
                                    </a>
                                )
                            }))
                        }
                    </div>
                </div>
            </div>
        )
    )
}