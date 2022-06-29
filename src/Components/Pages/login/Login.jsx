import $ from 'react'
import login from '../../../firebase/firebase' ;


let user = {} ;

const setLogin = (loggedUser) => {
    user = loggedUser ;
    console.log(user) ;
}

export const Login = () => {
    return(
        <>
            <div>
                <span>SIgn-in know with Google</span>
                <button onClick={(evt)=> login(setLogin)}>GOOGLE SIGN IN</button>
            </div>

        </>
    )
}