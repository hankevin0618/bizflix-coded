import React from "react";


// Admin SDK를 이용하면 authentication에 직접 데이터를 입력가능

const Auth = () => {

    return (
        <div>
            Auth
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