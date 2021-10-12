import React, { useState } from "react";
import LoginPopup from "../components/Login/LoginPopup";
import SignupPopup from "../components/Login/SignupPopup";

const Auth = () => {

    const [loginPopup, setLoginPopupOn] = useState(false)
    const [signupPopup, setSignupPopupOn] = useState(false)

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')



    // const onSocialClick = async (e) => {
    //     e.preventDefault()

    //     const { target: { dataset: { icon } } } = e;
    //     let provider;
    //     let data;

    //     // 나중에 provider 다 들어가서 URL 을 바꿔줘야함. 일단은 localhost로 해뒀음
    //     try {
    //         switch (icon) {
    //             case 'google':
    //                 provider = new firebaseInstance.auth.GoogleAuthProvider()
    //                 data = await authService.signInWithPopup(provider)

    //                 break;

    //             case 'facebook':
    //                 alert("Setup is not done. Need a Navig8Biz Facebook Account - Kevin")
    //                 // provider = new firebaseInstance.auth.FacebookAuthProvider()
    //                 // data = await authService.signInWithPopup(provider)
    //                 break;

    //             default:
    //                 break;
    //         }
    //         if (data !== null && newAccount) {
    //             let process = await realtimeDB.ref('users/' + authService.currentUser.uid).set({
    //                 email: authService.currentUser.email,
    //                 displayName: authService.currentUser.displayName,
    //                 phoneNumber: authService.currentUser.phoneNumber,

    //             });
    //             setShowSubscription(true)

    //         }

    //     } catch (error) {
    //         console.error(error.message)
    //         setError(error.message)
    //         return;
    //     }

    // }

    const onChange = (e) => {
        const {target: {name, value}} = e

        if(name === 'email'){
            setEmail(value)
        }
    }


    const onLogin = (e) => {
        e.preventDefault();
        setLoginPopupOn(true)
    }

    const onTrialSubmit = async (e) => {
        e.preventDefault();
        setSignupPopupOn(true)
    }

    return (
                <section className="container-fluid">
                        <div className="row  text-white" id="sliderBanner" style={{backgroundColor:'#303030'}}>

                            <div className="col-12">
                                <nav id="landing-page-nav" className="d-flex p-3">
                                    <h2 style={{fontWeight:'bold'}}>BizFlix</h2>
                                    <div className="align-self-center" style={{marginLeft:'70%'}}>
                                        <button className="transparent-button text-white" onClick={onLogin}>Login</button>
                                        <button>Start Free Trial</button>
                                    </div>                                
                                </nav>                            
                            </div>
                            <div className="" style={{minHeight:'700px'}}>
                                <div className="col-md-6 text-center mt-5" style={{float:'right'}}>
                                    <h1 className="text-center mt-4" style={{fontSize:'100px'}}>BizFlix.</h1>
                                    <form onSubmit={onTrialSubmit} className="d-grid w-50 mx-auto">
                                        <input required type="email" name="email" placeholder="Enter Your Email" onChange={onChange} />
                                        <button className="main-button">Let's get started</button>
                                        <p style={{color:'red'}}>{error}</p>
                                    </form>
                                </div>
                            </div>
                    </div>
                    <LoginPopup loginPopup={loginPopup} setLoginPopupOn={setLoginPopupOn} />
                    <SignupPopup signupPopup={signupPopup}
                        setSignupPopupOn={setSignupPopupOn}
                        email={email} 
                    />
                    <div className="row">
                        asdsad
                    </div>
                </section>
    );
};
export default Auth;

        // 데이터베이스 쓰는방법
        // realtimeDB.ref('users/' + userId).set({
        //     email: email + "Hello",
        //     verified: verified

        // });

        // 데이터베이스 읽는방법
        // realtimeDB.ref('users/' + userId).on('value', (snapshot) => {
        //     console.log(snapshot)
        //     const data = snapshot.val();
        //     console.log(data)
        // })

        // 데이터베이스 지우는방법
        // const DeleteDB = async () => {
        //     await realtimeDB.ref('users/' + userObj.uid).remove()
        //         .then(function () {
        //             console.log("Remove succeeded.")
        //         })
        //         .catch(function (error) {
        //             console.log("Remove failed: " + error.message)
        //         });
        // }