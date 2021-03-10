import { Row, Col, Image } from 'react-bootstrap';
import headshot from "../static/headshot.jpg";
import companyLogo from "../static/logo.png";

const contactName = "Your Name"
const contactTitle = "Account Manager"
const contactEmail = "example@email.com"
const contactPhone = "800-123-4567"

function Header () {
    return (
        <Row xs={12} className="p-3"
        style={{color:'white'}}>
            <Col lg={{offset: 0}}
                md={{span: 9, offset: 3}}
                sm={{span: 10, offset: 2}}
                xs={{span: 12, offset: 0}}
                className=" mb-2">
                <Image src={companyLogo}
                    style={{height:"105px", width:"315px"}}/>
            </Col>
            <Col lg={{offset: 0}} 
                md={{span: 9, offset: 3}} 
                sm={{span: 10, offset: 2}}
                xs={{span: 12, offset: 0}}
                className="pl-4 mb-2">
                <Row>
                    <Image src={headshot}
                        className="mt-1"
                        roundedCircle thumbnail
                        style={{width:"100px", height:"100px"}}/>
                    <Col
                        className="mb-2">
                        <h5>{contactName}</h5>
                        <h6>{contactTitle}</h6>
                        <p className="mb-0">
                            <a href={"mailto:" + contactEmail}
                                style={{color:"white"}}>
                                ✉ {contactEmail}
                            </a>
                        </p>
                        <p className="mb-0">
                            <a href={"tel:" + contactPhone}
                                style={{color:"white"}}>
                                ☏ {contactPhone}
                            </a>
                        </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default Header