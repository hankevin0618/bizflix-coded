import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const GoogleButton = (type) => {
    const onClick = (event) => {
        event.preventDefault()
        switch (type.type) {
            case 'signIn':
                alert('signInButton')
                break;

            case 'signUp':
                alert('signUpButton')
                break;
            default:
                break;
        }
        if (type.type === "signIn") {
            console.log('signIn')
        }
    }
    return (
        <button name="google" onClick={onClick} className="snsBtn"><FontAwesomeIcon icon={['fab', 'google']} size="3x" /></button>

    )
}

export const FacebookButton = (type) => {
    const onClick = (event) => {
        event.preventDefault()
        switch (type.type) {
            case 'signIn':
                alert('signInButton')
                break;

            case 'signUp':
                alert('signUpButton')
                break;
            default:
                break;
        }
        if (type.type === "signIn") {
            console.log('signIn')
        }
    }
    return (
        <button name="facebook" onClick={onClick} className="snsBtn"><FontAwesomeIcon icon={['fab', 'facebook']} size="3x" /></button>

    )
}

export const GithubButton = (type) => {
    const onClick = (event) => {
        event.preventDefault()
        switch (type.type) {
            case 'signIn':
                alert('signInButton')
                break;

            case 'signUp':
                alert('signUpButton')
                break;
            default:
                break;
        }
        if (type.type === "signIn") {
            console.log('signIn')
        }
    }
    return (
        <button name="github" onClick={onClick} className="snsBtn"><FontAwesomeIcon icon={['fab', 'github']} size="3x" /></button>

    )
}
