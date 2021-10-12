import { useEffect, useState } from "react";
import { authService, realtimeDB } from "../../myBase";

const SignupPopup = ({signupPopup,
    setSignupPopupOn, email: _email}) => {      

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const [fullName, setFullName] = useState("")
        const [error, setError] = useState("");
        
        
        const onChange = (e) => {
            const {target:{name, value}} = e

            switch (name) {
                case 'email':
                    setEmail(value)
                    break;

                case 'password':
                    setPassword(value)
                    break;
                    
                case 'username':
                    setUsername(value)
                    break;
                
                case 'fullName':
                    setFullName(value)
                    break;
                
                default:
                    break;
            }
        }

        const onSubmit = async (event) => {
            event.preventDefault();

            try {            
                let data = await authService.createUserWithEmailAndPassword(
                email,
                password,
                );

                if(data){
                    authService.currentUser.updateProfile({
                        displayName: username
                    })
    
                    realtimeDB.ref('users/' + authService.currentUser.uid).set({
                        email,
                        displayName: username,
                        fullName
                    });
                }
                

                
            } catch (error) {
                setError(error.message);
            }
        };

        useEffect(() => {
            if(signupPopup){
                setEmail(_email)
            }
        }, [signupPopup])
        
        
        return(
            <>
                    {
                        signupPopup
    
                        ?
                    <div id="login-popup">
                        <div id="login-popup-content" className="text-dark p-3">
                            <div style={{position:'absolute', right: '20px'}}>
                                <button onClick={() => setSignupPopupOn(false)}>Close</button>
                            </div>
                            <h3 className="text-center">Sign Up</h3>

                            <form onSubmit={onSubmit} className="d-grid w-50 mx-auto mt-5">
                                <label>Email</label>
                                <input name="email" type="email" onChange={onChange} placeholder="" value={email} />
                                <label>Password</label>
                                <input name="password" type="password" onChange={onChange} placeholder="" value={password} />
                                <label>Username</label>
                                <input name="username" type="text" onChange={onChange} placeholder="" value={username} />
                                <label>Full Name</label>
                                <input name="fullName" type="text" onChange={onChange} placeholder="" value={fullName} />
                                <button className="main-button">Create Account</button>
                            </form>
                            <div className="text-center mt-2">
                                <p style={{color:'red'}}>{error}</p>
                            </div>
                        </div>
                    </div>
    
                    :
                    <>
                        
                    </>
                    }
            </>
        )
}

export default SignupPopup