import React from 'react'
import ProfilePanel from '../components/Elements/ProfilePanel';
import { ResumeForm } from '../components/Profile/ResumeForm';


const Profile = () => {

    return (

        <div className="d-flex" style={{ background: '#2286E2' }}>
            <ProfilePanel />
            <div className="d-block m-auto">
                <div style={{ backgroundColor: 'white', padding: '100px', margin: '100px auto', display: 'block' }}>
                    <h1>Resume</h1>
                    <h4>This resume will be shown to your clients and teams.</h4>
                    <ResumeForm />
                </div>

            </div>
        </div>

    )
}

export default Profile;

