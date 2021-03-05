import { Row, Col, Image } from 'react-bootstrap';
import headshot from "../static/headshot.jpg";
import whovaLogo from "../static/whova-logo-white.png";

function Header () {
    return (
        <Row xs={12} className="p-3"
        style={{color:'white'}}>
            <Col lg={{offset: 0}}
                md={{span: 9, offset: 3}}
                sm={{span: 10, offset: 2}}
                xs={{span: 12, offset: 0}}
                className=" mb-2">
                <Image src={whovaLogo}
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
                        <h5>Cole Dillinger</h5>
                        <h6>Principal Account Executive</h6>
                        <p className="mb-0">
                            <a href="mailto:cole.dillinger@whova.com"
                                style={{color:"white"}}>
                                ✉ cole.dillinger@whova.com
                            </a>
                        </p>
                        <p className="mb-0">
                            <a href="tel:831-238-0076"
                                style={{color:"white"}}>
                                ☏ 831-238-0076
                            </a>
                        </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default Header