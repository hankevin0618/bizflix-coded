import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { authService, firebaseInstance, realtimeDB } from '../../myBase'


export const SNSLoginButton = ({ userType }) => {

    const onSocialClick = async (event) => {
        event.preventDefault()
        const { target: { dataset: { icon } } } = event;
        let provider;
        let data;

        // 나중에 provider 다 들어가서 URL 을 바꿔줘야함. 일단은 localhost로 해뒀음
        try {
            switch (icon) {
                case 'google':
                    provider = new firebaseInstance.auth.GoogleAuthProvider()
                    data = await authService.signInWithPopup(provider)
                    break;

                case 'facebook':
                    provider = new firebaseInstance.auth.FacebookAuthProvider()
                    data = await authService.signInWithPopup(provider)
                    break;
                case 'github':
                    provider = new firebaseInstance.auth.GithubAuthProvider()
                    data = await authService.signInWithPopup(provider)
                    break;
                default:
                    break;
            }
            if (data !== null) {
                let process = await realtimeDB.ref('users/' + authService.currentUser.uid).set({
                    email: authService.currentUser.email,
                    displayName: authService.currentUser.displayName,
                    phoneNumber: authService.currentUser.phoneNumber,
                    userType
                });
                console.log(process)

            }


        } catch (error) {
            console.error(error)
            return;
        }

        console.log(data)



    }
    return (
        <>
            <button name="google" onClick={onSocialClick} className="snsBtn"><FontAwesomeIcon name="google" icon={['fab', 'google']} size="3x" /></button>
            <button name="facebook" onClick={onSocialClick} className="snsBtn"><FontAwesomeIcon icon={['fab', 'facebook']} size="3x" /></button>
            <button name="github" onClick={onSocialClick} className="snsBtn"><FontAwesomeIcon icon={['fab', 'github']} size="3x" /></button>
        </>
    )
}