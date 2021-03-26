import React, { useState } from "react";
import { authService, realtimeDB } from "../myBase";

const Auth = ({ setVerified }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("")
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "username") {
            setUserName(value)
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
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
                    verified: false

                });


            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
                const checkVerification = async () => {
                    try {
                        await realtimeDB.ref('users/' + authService.currentUser.uid + '/verified').on("value", function (snapshot) {
                            setVerified(snapshot.val())
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
                checkVerification()
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />

                {newAccount &&

                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={onChange}
                    />

                }
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "Sign In"}
                />
                {error}
            </form>
            <button onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </button>
        </div>
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