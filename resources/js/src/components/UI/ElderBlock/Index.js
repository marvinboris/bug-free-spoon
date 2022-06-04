import React from 'react';
import { Card, CardBody } from 'reactstrap';

import './ElderBlock.scss';

export default ({ name, title, animation = "fade-up", photo }) => {
    const lang = localStorage.getItem('lang');

    return <div className="ElderBlock pb-3 pb-xl-0">
        <Card className="border-0 bg-transparent shadow-sm overflow-hidden position-relative">
            <div className="position-absolute w-100 h-100" style={{ background: `url('${photo}') no-repeat center`, backgroundSize: 'cover' }} />
            <div className="card-img-top embed-responsive embed-responsive-1by1 bg-black" style={{ opacity: .3 }} />
            <CardBody className="bg-blue-80 text-white position-relative">
                <div className="bg-white rounded-right position-absolute" style={{ width: 10, height: 40, top: '50%', left: 0, transform: 'translateY(-50%)' }} />
                <div className="ml-5 ml-xl-4">
                    <div className="font-weight-normal text-montserrat-alt h4 position-relative d-flex align-items-center">
                        <span className="pr-2">{name}</span>

                        <div className="position-absolute border-bottom border-white-20" style={{ top: 13, left: -66, width: 61 }}>
                            <i className="fas fa-circle text-xx-small position-absolute" style={{ right: 0, top: 0, transform: 'translateY(-50%)' }} />
                        </div>

                        <div className="position-relative border-bottom border-white-20 flex-fill" style={{ marginRight: -20 }}>
                            <i className="fas fa-play text-xx-small text-white position-absolute" style={{ left: 0, top: 0, transform: 'translateY(-50%)' }} />
                        </div>
                    </div>

                    <div className="card-text text-white text-montserrat-alt pb-1 mb-3">
                        {title[lang]}
                    </div>

                    <div className='social-networks'>
                        <i className="fab fa-facebook-square" />
                        <i className="fab fa-twitter-square" />
                        <i className="fab fa-instagram" />
                        <i className="fab fa-whatsapp" />
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>;
}