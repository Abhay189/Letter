import Row from './Row';
import Column from './Column';


//api requests imports:
import * as personalProfileDetails from '../api/requests/personalProfileDetails';



function SignUpScreen() {
    return <>
        <img src={"img/mailGraphic.png"} width="200" height="170"/>
        <img src={"img/visualDivider.png"} width="50" height="500"/>
        <h5> Signup to send your first letter </h5>
        <form>
            <input type="text" id="email-text-input-sign-up" className="text-input-sign-up-login" placeholder="email .."/>
            <input type="text" id="phone-num-text-input-sign-up" className="text-input-sign-up-login" placeholder="phone number .."/>
            <input type="text" id="first-name-text-input-sign-up" className="text-input-sign-up-login" placeholder="first name .."/>
            <input type="text" id="last-name-text-input-sign-up" className="text-input-sign-up-login" placeholder="last name .."/>
            <input type="text" id="password-text-input-sign-up" className="text-input-sign-up-login" placeholder="password .."/>
            <input type="submit" onClick={() => { personalProfileDetails.userSignUp(); } }/>
        </form>
        
    </>
}

export default SignUpScreen;