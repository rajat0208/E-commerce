import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ButtonComponent from '../../../components/common/buttons.component';
import { EmailInputComponent } from '../../../components/common/input.component';

const LoginPage = () => {
    let [data, setData] = useState({
        email: null,
        password: null
    })
    let [err, setErr] = useState();

    const handleChamge = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        validateField(e.target.name, e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Object.keys(data).map((key) => {
            validateField(key, data[key])
        })
    }
    const validateField = (field, value) => {
        let msg = null;
        switch (field) {
            case "email":
                msg = !value ? "Email Field Is Required" : null;
                break;
            case "password":
                msg = !value ? "Password Field Is Required" : null;
                break;
            default:
                break;
        }
        setErr({
            ...err,
            [field]: msg
        })
    }
    // const validateData = () => {
    //     if (!data.email) {
    //         setErr({
    //             ...err,
    //             email: "Email address is required"
    //         })
    //     } else {
    //         setErr({
    //             ...err,
    //             email: null
    //         })
    //     }
    //     if (!data.password) {
    //         setErr({
    //             ...err,
    //             password: "Password is required"
    //         })
    //     } else {
    //         setErr({
    //             ...err,
    //             password: null
    //         })
    //     }
    // }
    return (<>
        <Container>
            <Col>
                <h1 className='text-center'>Login Page</h1>
                <hr />
            </Col>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <EmailInputComponent label={"Email"} name="email" required={true} setChange={handleChamge}  />
                        <Form.Group className="row mb-3">
                            <Form.Label className='col-sm-3'>Password: </Form.Label>
                            <Col sm={9}>
                                <Form.Control onChange={handleChamge} size="sm" type='password' name="password"></Form.Control>
                                <span className="text-danger">{console.log(err)}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row mb-3">
                            <Col sm={{ offset: 3, span: 9 }}>
                                <ButtonComponent showCancel={true} cancelText="Reset" submitText="Login" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}
export default LoginPage;