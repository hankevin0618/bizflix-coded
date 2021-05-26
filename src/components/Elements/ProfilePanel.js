import React from 'react'

const panelStyle = {
    backgroundColor: '#f5f5f5',
    width: '15%'
}

const ProfilePanel = () => {
    return (
        <div style={panelStyle}>
            <ul>
                <li>resume</li>
                <li>personal info</li>
                <li>team</li>
                <li>applications</li>
                <li>upgrade</li>
            </ul>
        </div>
    )
}

export default ProfilePanel