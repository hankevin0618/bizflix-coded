import React, { useState } from 'react'
import { BlackInput } from '../../components/Elements/Buttons'
import logoImage from "../../images/logo_b.png"
import { GoogleButton, FacebookButton, GithubButton } from '../../components/Elements/SNSButtons'
import { authService, realtimeDB } from "../../myBase";
import { Redirect } from 'react-router-dom'

const logoStyle = {
    display: 'block',
    margin: 'auto',
    marginTop: '20px',
    width: '210px'
}

const formStyle = {
    display: 'grid',
    gridGap: ' 13px'
}

const RightPanel = ({ type, userType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "phoneNumber") {
            setPhoneNumber(value)
        } else if (name === "username") {
            setUserName(value)
        }
    };

    if (type === 'signIn') {
        const onSubmit = async (event) => {

            event.preventDefault()
            let data;
            data = await authService.signInWithEmailAndPassword(email, password);
            console.log(data);


            // 페이먼트 시작하면 넣기
            // const checkVerification = async () => {
            //     try {
            //         await realtimeDB.ref('users/' + authService.currentUser.uid + '/verified').on("value", function (snapshot) {
            //             // setVerified(snapshot.val())
            //         })
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
            // checkVerification()
        }

        return (
            <>
                {/* Right Panel */}
                <div className="bg-white" style={{ width: '35%' }}>
                    <img src={logoImage} style={logoStyle} alt="Logo" />
                    <form onSubmit={onSubmit} style={formStyle} className="px-3">
                        <input onChange={onChange} required type="text" name="email" placeholder="Email" />
                        <input onChange={onChange} required type="password" name="password" placeholder="Password" />
                        <div>
                            <p className="text-center font-weight-bold" style={{ color: 'dimgray' }}>
                                Sign In Options
                    </p>
                            <div className="d-flex p-3">
                                <GoogleButton type="signIn" />
                                <FacebookButton type="signIn" />
                                <GithubButton type="signIn" />

                            </div>
                            <div className="text-center mt-4" >
                                <BlackInput value="Sign In" />
                            </div>
                        </div>

                    </form>
                </div>
            </>
        )
    } else if (type === 'signUp') {
        const onSubmit = async (event) => {
            event.preventDefault()
            try {
                let data;

                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password,

                );

                authService.currentUser.updateProfile({
                    displayName: username
                })

                realtimeDB.ref('users/' + authService.currentUser.uid).set({
                    email,
                    displayName: username,
                    phoneNumber,
                    userType

                });

                console.log(data);
            } catch (error) {
                setError(error.message);
            }
        }

        return (
            <>
                {/* Right Panel */}
                <div className="bg-white" style={{ width: '35%' }}>
                    <img src={logoImage} style={logoStyle} alt="Logo" />
                    <form onSubmit={onSubmit} style={formStyle} className="px-3">
                        <input onChange={onChange} required type="text" name="email" placeholder="Email" />
                        <input onChange={onChange} required type="text" name="username" placeholder="Username" />
                        <input onChange={onChange} required type="password" name="password" placeholder="Password" />
                        <input onChange={onChange} required type="number" name="phoneNumber" placeholder="Phone Number" />
                        <p style={{ color: 'red', textAlign: 'center' }}> {error} </p>
                        <div>
                            <p className="text-center font-weight-bold" style={{ color: 'dimgray' }}>
                                Sign Up Options
                    </p>
                            <div className="d-flex p-3">
                                <GoogleButton type="signIn" />
                                <FacebookButton type="signIn" />
                                <GithubButton type="signIn" />

                            </div>
                            <div className="text-center mt-4" >
                                <BlackInput value="Sign Up" />
                            </div>
                        </div>

                    </form>
                </div>
            </>
        )
    } else {
        return null;
    }


}

export default RightPanel
