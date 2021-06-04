import React, { useEffect, useState } from 'react'
import ProfilePanel from '../components/Profile/ProfilePanel';
import { ResumeForm } from '../components/Profile/ResumeForm';


const Profile = () => {

    const [currentTab, setCurrentTab] = useState("resume")
    const getRightPanelComponent = () => {
        switch (currentTab) {
            case "resume":
                return (
                    <ResumeForm currentTab={currentTab} />
                )

            default:
                break;
        }
    }
    useEffect(() => {
        let activeTab = document.querySelectorAll("button.profile-leftPanel-button");
        activeTab.forEach((element) => {
            element.classList.remove("active")
            if (element.id === currentTab) {
                element.classList.add("active")
            }
        })



    }, [currentTab])

    return (

        <div className="d-flex" style={{ background: '#2286E2', minHeight: '800px' }}>
            <ProfilePanel setCurrentTab={setCurrentTab} />
            <div className="d-block m-auto">
                {getRightPanelComponent()}
            </div>
        </div>

    )
}

export default Profile;

