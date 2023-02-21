import React from "react";
import { Container, Nav, Navbar, NavDropdown, Row, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import "./home.css"

import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.jpg";
const Homepage = (props) => {
    return (
        <>
            

            <Container fluid>
                <Row className="mx-3">
                    <Col md={2}>
                        Category List
                    </Col>
                    <Col md={10}>
                        <Carousel showThumbs={false} show showIndicators={true}>
                            <div class="home_banner">
                                <img src={image1} />
                            </div>
                            <div class="home_banner">
                                <img src={image2} />
                            </div>
                            <div class="home_banner">
                                <img src={image3} />
                            </div>
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Homepage;