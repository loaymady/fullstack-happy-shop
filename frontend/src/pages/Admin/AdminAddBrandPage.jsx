import { Container, Row, Col } from 'react-bootstrap'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminAddBrand from '../../Components/Admin/AdminAddBrand'
const AdminAddBrandPage = () => {
    return (
        <Container >
            <Row className='py-3'>
                <Col sm="3" xs="3" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="9" md="10">
                     <AdminAddBrand />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddBrandPage
