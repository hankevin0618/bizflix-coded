import React, { useEffect, useState } from 'react'
import { FormGroup } from "reactstrap"
import { authService, realtimeDB } from '../../myBase'

export const ResumeForm = () => {
    const [numWorkExperiences, setNumWorkExperiences] = useState(1)
    const [numSkillsQualifications, setNumSkillsQualifications] = useState(1)
    const [numPortfolios, setPortfolios] = useState(1)

    const [jobRole, setJobRole] = useState("")
    const [industry, setIndustry] = useState("")
    const [message, setMessage] = useState("")

    const workExperiences = []
    const skillsQualifications = []
    const portfolios = []

    let workExperiences_Submission = []
    let skillsQualifications_Submission = []
    let portfolios_Submission = []

    const onChange = (e) => {
        let { target: { name } } = e;
        let { target: { value } } = e;

        switch (name) {
            case "jobRole":
                setJobRole(value)
                break;
            case "industry":
                setIndustry(value)
                break;
            case "message":
                setMessage(value)
                break;

            default:
                break;
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            jobRole,
            industry,
            workExperiences_Submission,
            skillsQualifications_Submission,
            portfolios_Submission,
            message

        }

        let getWorkExperiences = document.getElementsByClassName('work-experience');
        let getSkillsQualifications = document.getElementsByClassName('skill-qualification');
        let getPortfolios = document.getElementsByClassName('portfolio');

        if (getWorkExperiences.length > 0) {
            for (let index = 0; index < getWorkExperiences.length; index++) {
                workExperiences_Submission.push({
                    id: getWorkExperiences[index].id,
                    value: getWorkExperiences[index].value
                })
            }
        }

        if (getSkillsQualifications.length > 0) {
            for (let index = 0; index < getSkillsQualifications.length; index++) {
                skillsQualifications_Submission.push({
                    id: getSkillsQualifications[index].id,
                    value: getSkillsQualifications[index].value
                })
            }
        }

        if (getPortfolios.length > 0) {
            for (let index = 0; index < getPortfolios.length; index++) {
                portfolios_Submission.push({
                    id: getPortfolios[index].id,
                    value: getPortfolios[index].value
                })
            }
        }


        console.log(data)

        realtimeDB.ref('users/' + authService.currentUser.uid + "/resume/").set({
            data
        });

    }

    for (let index = 0; index < numWorkExperiences; index++) {
        workExperiences.push(<input key={index} id={index} type="text" className="work-experience" />)
    }

    for (let index = 0; index < numSkillsQualifications; index++) {
        skillsQualifications.push(<input key={index} className="skill-qualification" type="text" />)
    }
    for (let index = 0; index < numPortfolios; index++) {
        portfolios.push(<input key={index} className="portfolio" type="text" />)
    }


    const onPlusClick = (e) => {
        e.preventDefault();
        const { target: { name } } = e;
        switch (name) {
            case "workExperiences":
                setNumWorkExperiences(numWorkExperiences + 1)
                break;
            case "skillsQualifications":
                setNumSkillsQualifications(numSkillsQualifications + 1)
                break;
            case "portfolios":
                setPortfolios(numPortfolios + 1)
                break;
            default:
                break;
        }
    }
    const onMinusClick = (e) => {
        e.preventDefault();
        const { target: { name } } = e;
        switch (name) {
            case "workExperiences":
                if (numWorkExperiences > 1) {
                    setNumWorkExperiences(numWorkExperiences - 1)
                }
                break;
            case "skillsQualifications":
                if (numSkillsQualifications > 1) {
                    setNumSkillsQualifications(numSkillsQualifications - 1)
                }
                break;
            case "portfolios":
                if (numPortfolios > 1) {
                    setPortfolios(numPortfolios - 1)
                }
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const getResume = async () => {
            // await setTimeout(() => {

            // }, 5000)
            await realtimeDB.ref('users/' + authService.currentUser.uid + "/resume/data/").on('value', (snapshot) => {
                const data = snapshot.val();
                Object.keys(data).map((key, index) => {
                    switch (key) {
                        case "industry":
                            if (data[key]) {
                                document.getElementById("industry_input").value = data[key]
                            }
                            break;
                        case "jobRole":
                            if (data[key]) {
                                document.getElementById("jobRole_input").value = data[key]
                            }
                            break;

                        case "message":
                            if (data[key]) {
                                document.getElementById("message_input").value = data[key]
                            }
                            break;
                        case "portfolios_Submission":
                            break;
                        case "skillsQualifications_Submission":
                            break;
                        case "workExperiences_Submission":
                            break;

                        default:
                            break;
                    }
                })


            })
            // console.log('hey')
        }

        try {
            getResume()
        } catch (error) {
            throw new Error(error)
        }
    }, [])



    return (
        <form onSubmit={onSubmit} style={{ display: 'inline-grid', width: '70%' }}>
            <label>Job Role: </label>
            <input id="jobRole_input" name="jobRole" onChange={onChange} type="text" />
            <label>Industry: </label>
            <input id="industry_input" name="industry" onChange={onChange} type="text" />
            <FormGroup className="mt-4">
                <label>Work Experience: </label>
                <button name="workExperiences" onClick={onPlusClick}>Plus</button>
                <button name="workExperiences" onClick={onMinusClick}>Minus</button>
                <div className="d-grid">
                    {
                        workExperiences
                    }
                </div>
            </FormGroup>
            <FormGroup className="mt-4">
                <label>Skills & Qualifications: </label>
                <button name="skillsQualifications" onClick={onPlusClick}>Plus</button>
                <button name="skillsQualifications" onClick={onMinusClick}>Minus</button>
                <div className="d-grid">
                    {
                        skillsQualifications
                    }
                </div>
            </FormGroup>
            <FormGroup className="mt-4">
                <label>Portfolio Links: </label>
                <button name="portfolios" onClick={onPlusClick}>Plus</button>
                <button name="portfolios" onClick={onMinusClick}>Minus</button>
                <div className="d-grid">
                    {
                        portfolios
                    }
                </div>
            </FormGroup>
            <label>Message: </label>
            <textarea id="message_input" name="message" onChange={onChange} placeholder="enter your message here"></textarea>

            <input type="submit" className="mt-4 black-input" value="Update" />
        </form>
    )
}

