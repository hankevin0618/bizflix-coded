import { useState } from "react";
import { authService } from "../../myBase";

const LoginPopup = ({loginPopup, setLoginPopupOn}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;              
            data = await authService.signInWithEmailAndPassword(email, password);
            
        } catch (error) {
            setError(error.message);
        }
    };

    
    return(
        <>
                {
                    loginPopup

                    ?
                <div id="login-popup">
                    <div id="login-popup-content" className="text-dark p-3">
                        <div style={{position:'absolute', right: '20px'}}>
                            <button onClick={() => setLoginPopupOn(false)}>Close</button>
                        </div>
                        <h3 className="text-center">LOGIN</h3>
                        <form className="d-grid w-50 mx-auto p-3" onSubmit={onSubmit}>
                            <input type="email" name="email" onChange={onChange} placeholder="Enter your email" />
                            <input type="password" name="password" onChange={onChange} placeholder="Enter your password" />
                            <button className="main-button">Login</button>
                            <p className="text-center" style={{color:'red'}}>{error}</p>
                        </form>
                    </div>
                </div>

                :
                <div>
                    
                </div>
                }
        </>
    )
}

export default LoginPopup;