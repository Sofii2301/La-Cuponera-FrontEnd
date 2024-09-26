import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Vendedor from '../../components/Vendedor/Vendedor';
import hombreReciclando from '../../assets/HumanBeing/human-being-hombre-reciclando.png'
import logoH from '../../assets/HumanBeing/logo-horizontal.png'

const VendorAnnouncement = () => {
    return (
        <Vendedor>
            <Card className="vendor-announcement-card">
                <Card.Body>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <Card.Title className="vendor-announcement-title">¡Próximamente: Human Being!</Card.Title>
                            <Card.Text className="vendor-announcement-text">
                                Nos complace anunciar que muy pronto lanzaremos un nuevo sistema de puntos en la sección "Human Being" de nuestra plataforma. 
                                Este sistema permitirá a los cuponeros acumular puntos por cada kilo de material reciclado que recolecten, 
                                los cuales podrán ser canjeados por cupones exclusivos de sus tiendas.
                            </Card.Text>
                            <Card.Text className="vendor-announcement-text">
                                Como vendedor, esta es una gran oportunidad para atraer a clientes eco-conscientes y recompensar su compromiso con el medio ambiente. 
                                Únete a nosotros para fomentar un futuro más sostenible mientras aumentas la visibilidad y las ventas de tus productos!
                            </Card.Text>
                        </div>
                        <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center imagen-reciclando-hb">
                            <img src={hombreReciclando} alt="Reciclando" />
                        </div>
                    </div>
                    <Link to='https://humanbeing-rec.com/'><Button variant="success" className="vendor-announcement-button">Más información</Button></Link>
                </Card.Body>
            </Card>
        </Vendedor>
        
    );
};

export default VendorAnnouncement;
