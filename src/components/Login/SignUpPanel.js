import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RightPanel from './RightPanel';
import BuilderImg from '../../images/builder_img.png'
import ClientImg from '../../images/client_img.png'

const leftPanelStyle = {
    backgroundColor: '#8AC9AF',
    width: '65%',
    minHeight: '620px',

}

const builderImageStyle = {
    width: 'auto',
    display: 'block',
    marginTop: '40px',
    height: '300px'
}

const clientImageStyle = {
    width: 'auto',
    display: 'block',
    marginTop: '40px',
    height: '300px'
}

const userTypeContainer = {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
}


const SignUpPanel = ({ setIsSignInPage, newAccount }) => {
    const [isBuilderClicked, setIsBuilderClicked] = useState(true)
    const [userType, setUserType] = useState('builder')
    const onClick = () => {
        setIsSignInPage(true)
    }
    const onTypeClick = (event) => {
        const builderElement = document.getElementById('builder-signup-image');
        const clientElement = document.getElementById('client-signup-image')
        const { target: { name } } = event
        if (name === 'builder') {
            builderElement.classList.add('active')
            clientElement.classList.remove('active')
            setIsBuilderClicked(true)
            setUserType('builder')
        } else if (name === 'client') {
            clientElement.classList.add('active')
            builderElement.classList.remove('active')
            setIsBuilderClicked(false)
            setUserType('client')
        }
    }

    useEffect(() => {

    }, [isBuilderClicked, userType])

    return (
        <>
            {/* Left Panel */}
            <div style={leftPanelStyle}>
                <div className="mt-3 ml-4">
                    <FontAwesomeIcon onClick={onClick} icon="arrow-left" color='white' size='lg' style={{ cursor: 'pointer' }} />
                </div>
                <h1 style={{
                    color: 'white',
                    textAlign: 'center',
                    paddingTop: '20px',
                    fontFamily: 'Anton'
                }}>What Type Are You?</h1>
                <div style={userTypeContainer}>
                    <img id="builder-signup-image" onClick={onTypeClick} name="builder" className="signup-type-images active" src={BuilderImg} alt="placeholderIMG"
                        style={builderImageStyle}
                    />
                    <img id="client-signup-image" onClick={onTypeClick} name="client" className="signup-type-images" src={ClientImg} alt="placeholderIMG"
                        style={clientImageStyle}
                    />
                </div>
                <div>
                    {
                        isBuilderClicked
                            ?
                            <div className="signup-user-type-info">
                                <p>Builder user can set the job role and apply to the projects that clients posted on the Board. Successful rates will get you more credibility for clients to choose you.</p>
                                <p>*Only 1 application at a time for Free Plan</p>
                            </div>
                            :
                            <div className="signup-user-type-info">
                                <p>Client user can post projects on the Board page. You can set the cost budget or you can leave it as "Quote Me" so the applicants quote you. Remember, more budget gets you better outcomes.</p>
                                <p>*Client user is free.</p>
                            </div>
                    }
                </div>

            </div>
            <RightPanel type="signUp" userType={userType} newAccount={newAccount} />
        </>

    )
}

export default SignUpPanel;