import Row from './Row';
import Column from './Column';


//api requests imports:
import * as personalProfileDetails from '../api/requests/personalProfileDetails';

function LoginScreen() {
const email = document.getElementById("first-name-text-input-sign-up");

    return <>
        <Row id="" className='sign-up-login-screen' style={{}}>
            <img src={"img/mailGraphic.png"} width="300" height="270" className="mailGraphic"/>
            <img src={"img/visualDivider.png"} width="50" height="500" className="visualDivider"/>
            <form className="gap-4" style={{display: 'flex', flexDirection: 'column'}}>
                <h5> Login, your friends missed you </h5>
                <input type="text" id="email-text-input-login" className="text-input-sign-up-login" placeholder="email .."/>
                <Row id="" className="justify-content-center" style={{}}>
                    <p> OR </p>
                </Row>
                <input type="text" id="phone-num-text-input-login" className="text-input-sign-up-login" placeholder="phone number .."/>
                <input type="text" id="password-text-input-login" className="text-input-sign-up-login" placeholder="password .."/>
                <Row id="" className="justify-content-center" style={{}}>
                    <button type="button" className="btn btn-secondary submit-btn-sign-up-login" onClick={() => {window.location.href='/chats'}}> Login </button>
                </Row>
            </form>
        </Row>
        
    </>
}

export default LoginScreen;