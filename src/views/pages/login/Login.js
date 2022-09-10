import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { ServiceContext, IncreaseCount } from '../../../service';
import { useUserInfoState } from 'src/context/UserContext';
import { useNavigate } from 'react-router-dom';
// import * as TAFFY from 'taffy';

async function loginUser(credentials) {
    const url = 'https://api.voipbin.net/auth/login';
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const usernameTF = useRef();
    const passwordTF = useRef();

    const userInfoState = useUserInfoState();

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('click login');
        var response = await loginUser({
            username,
            password,
        });
        if ('token' in response) {
            userInfoState.username = response['username'];
            userInfoState.token = response['token'];
            navigate(`/dashboard`);
        }
    };

    let test = IncreaseCount();
    console.log(`test: ${test}`);

    const service = useContext(ServiceContext);
    console.log(`count: ${service.count}`);

    service.count++;

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">
                                            Sign In to your account
                                        </p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete="username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                ref={usernameTF}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                ref={passwordTF}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                    onClick={(e) => handleSubmit(e)}
                                                >
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit, sed do eiusmod tempor incididunt ut labore et
                                            dolore magna aliqua.
                                        </p>
                                        <Link to="/register">
                                            <CButton
                                                color="primary"
                                                className="mt-3"
                                                active
                                                tabIndex={-1}
                                            >
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
}

export default React.memo(Login);
