import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import LoginPage from './login/login.pages'
import RegisterPage from './register/register.pages'

const AuthPage =()=>{
    return(<>
    <Container>
        <Row>
            <Col sm={12} md={6}>
                <RegisterPage/>
            </Col>
            <Col sm={12} md={6}>
                <LoginPage/>
            </Col>
        </Row>
    </Container>
    </>)
}
export default AuthPage