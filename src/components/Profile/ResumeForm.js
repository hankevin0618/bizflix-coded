import React, { useState } from 'react'
import { FormGroup } from "reactstrap"

export const ResumeForm = () => {
    const [numWorkExperiences, setNumWorkExperiences] = useState(1)
    let workExperiences = []


    for (let index = 0; index < numWorkExperiences; index++) {
        workExperiences.push(<input key={index} type="text" />)

    }
    const onPlusClick = (e) => {
        e.preventDefault();
        setNumWorkExperiences(numWorkExperiences + 1)
    }
    const onMinusClick = (e) => {
        e.preventDefault();
        if (numWorkExperiences > 1) {
            setNumWorkExperiences(numWorkExperiences - 1)
        }
    }


    return (
        <form style={{ display: 'inline-grid' }}>
            <label>Job Role: </label>
            <input type="text" />
            <label>Industry: </label>
            <input type="text" />
            <FormGroup className="mt-4">
                <label>Work Experience: </label>
                <button onClick={onPlusClick}>Plus</button>
                <button onClick={onMinusClick}>Minus</button>
                <div className="d-grid">
                    {
                        workExperiences
                    }

                </div>


            </FormGroup>
            <label>Skills & Qualifications: </label>
            <input type="text" />
            <label>Portfolio Links: </label>
            <input type="text" />
            <label>Messages: </label>
            <input type="text" />

            <input className="black-input mt-5" type="submit" value="Submit" />
        </form>
    )
}

