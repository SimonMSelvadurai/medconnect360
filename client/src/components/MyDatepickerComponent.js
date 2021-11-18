import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// class MyDatepickerComponent extends Component {

function MyDatepickerComponent(props) {


    const [startDate,setStartDate] = useState(new Date());

// state = {
//         startDate: new Date()
//     };

    const handleChange = date => {
        console.log("DatePicker getMinutes Value   : ",date.getMinutes());
        console.log("DatePicker getTime Value   : ",date.getTime());
        console.log("DatePicker Value   : ",date);
    
        setStartDate({
            startDate: date
        });
    };

    // const handleChange = (event) => {
    //     setDoctorName(event.target.value);
    //   };
    const excludeDatesArray = [new Date('11-08-2021'), new Date('11-09-2021')]
    const excludeTimeArray = [new Date('11-08-2021'), new Date('11-09-2021')]
 
    return(
        
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={handleChange}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy  EE hh:mm a"
                    excludeDates={excludeDatesArray}
                />
            </div>
        );
    
}

export default MyDatepickerComponent;