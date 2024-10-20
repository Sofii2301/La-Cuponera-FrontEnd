import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import hombreReciclando from '../../assets/HumanBeing/human-being-hombre-reciclando.png'

const ComingSoonAnnouncement = () => {
    return (
        <>
            <Card className="announcement-card">
                <Card.Body>
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <Card.Title className="announcement-title">¡Próximamente en La Cuponera!</Card.Title>
                            <Card.Text className="announcement-text">
                                Estamos emocionados de anunciar el próximo lanzamiento de nuestro sistema de puntos en la sección de reciclaje "Human Being". 
                                Este nuevo sistema te permitirá acumular puntos por cada kilo de material reciclado que recolectes. 
                                Podrás comercializar estos puntos por cupones exclusivos en nuestra plataforma.
                            </Card.Text>
                            <Card.Text className="announcement-text">
                                ¡Prepárate para hacer del mundo un lugar mejor mientras ganas recompensas increíbles!
                            </Card.Text>
                            </div>
                        <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center imagen-reciclando-hb">
                            <img src={hombreReciclando} alt="Reciclando" />
                        </div>
                    </div>
                    <Link to='https://humanbeing-rec.com/'><Button variant="success" className="announcement-button">Saber más</Button></Link>
                </Card.Body>
            </Card>
        </>
    );
};

export default ComingSoonAnnouncement;
