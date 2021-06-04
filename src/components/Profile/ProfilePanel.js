import React from 'react'

const panelStyle = {
    backgroundColor: '#f5f5f5',
    width: '15%'
}

const ProfilePanel = ({ setCurrentTab }) => {
    const onClick = (e) => {
        e.preventDefault();
        const { target: { name } } = e
        switch (name) {
            case "resume":
                window.location.reload()
                setCurrentTab("resume")
                break;
            case "personal-info":
                setCurrentTab("personal-info")
                break;
            case "team":
                setCurrentTab("team")
                break;
            case "applications":
                setCurrentTab("applications")
                break;
            case "upgrade":
                setCurrentTab("upgrade")
                break;
            default:
                break;
        }
    }

    return (
        <div style={panelStyle}>
            <div className="d-grid">

                <button id="resume" name="resume" className="profile-leftPanel-button" onClick={onClick}>Resume</button>
                <button id="personal-info" name="personal-info" className="profile-leftPanel-button" onClick={onClick}>Personal Info</button>
                <button id="team" name="team" className="profile-leftPanel-button" onClick={onClick}>Team</button>
                <button id="applications" name="applications" className="profile-leftPanel-button" onClick={onClick}>Applications</button>
                <button id="upgrade" name="upgrade" className="profile-leftPanel-button" onClick={onClick}>Upgrade</button>
            </div>

        </div>
    )
}

export default ProfilePanel