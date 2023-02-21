import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { EmailInputComponent } from '../../../components/common/input.component';
import { useFormik } from 'formik'
import * as Yup from "yup"


const RegisterPage = () => {

    const schema = Yup.object({
        name: Yup.string().required("Name is compulsory.").min(3, "Name must be of 3 characters"),
        email: Yup.string().email().required("Please enter a valid email."),
        password: Yup.string().required().matches(/[a-zA-Z0-9]/).min(8),
        role: Yup.string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "Customer"
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    return (<>
        <Container>
            <Row>
                <Col>
                    <h1 className='text-center'>Register</h1>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={formik.handleSubmit} >
                        <Form.Group className='row mb-3'>
                            <Form.Label className="col-sm-3">Name:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    size="sm"
                                    name="name"
                                    required
                                    value={formik.values.name}
                                    placeholder='Enter your name.'
                                    onChange={formik.handleChange}
                                />
                                <span className="text-danger">{
                                    formik.errors.name
                                }</span>

                            </Col>
                        </Form.Group>

                        <EmailInputComponent
                            label="Email"
                            name="email"
                            required={true}
                            setChange={(e) => {
                                formik.setValues({
                                    ...formik.values,
                                    email: e.target.value
                                })
                            }}
                            errmsg={formik.errors.email} />

                        <Form.Group className='row mb-3'>
                            <Form.Label className="col-sm-3">Password:</Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    size="sm"
                                    name="password"
                                    required
                                    type='password'
                                    onChange={formik.handleChange}
                                    placeholder='Enter your password.' />
                            </Col>
                        </Form.Group>

                        <Form.Group className='row mb-3'>
                            <Form.Label className="col-sm-3">Role:</Form.Label>
                            <Col sm={9}>
                                <Form.Select size="sm" name="role" defaultValue={formik.values.status} onChange={formik.handleChange}>
                                    <option value="Customer">Customer</option>
                                    <option value="Seller">Seller</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group className='row mb-3'>
                            <Col sm={{ offset: 3, span: 9 }}>
                                <Button type="reset" variant='danger' className='me-3'>
                                    Cancel
                                </Button>
                                <Button type="submit" variant='success'>
                                    Register
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>)
}
export default RegisterPage;