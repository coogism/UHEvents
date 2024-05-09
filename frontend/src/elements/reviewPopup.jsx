import { Rating } from '@mui/material';

import "./css/reviewPopup.css"
import { useState } from 'react';
import api from './api';

export default function ReviewPopUp({ selectedOrg, setSelectOrg }) {
    const [rating, setRating] = useState(null)

    const onRateClick = () => {
        const org_id = selectedOrg._id
        console.log(org_id)

        setSelectOrg(null)
        
        api.post("/rate/organization", {
            org_id : org_id,
            rating : rating
        })
    }

    if (selectedOrg) {
        console.log(selectedOrg)
        return (
            <div className='reviewScreen'>
                <div className="reviewPopUp">
                    <div className="reviewPadding">
                        <h1 className="reviewOrgName">{selectedOrg.name}</h1>
                        <Rating onChange={(event, newValue) => {
                            setRating(newValue);
                        }} />

                        <div className="buttons">
                            <button className='cancelBtn' onClick={() => setSelectOrg(null)}>
                                <span>Cancel</span>
                            </button>

                            <button className={rating !== null ? "submitBtn" : "submitBtn disabled"} onClick={onRateClick} disabled={rating == null}>
                                <span>Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}