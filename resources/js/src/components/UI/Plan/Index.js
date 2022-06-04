import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight, faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import './Plan.css';

const Item = ({ condition = true, children }) => condition ? <div className="pb-2"><FontAwesomeIcon icon={faCheckCircle} className="mr-2" fixedWidth />{children}</div> : null;

export default ({ id, name, meals, months, actions, banners, price, premium = false, standard = false, basic = false }) => <div className="Plan text-left bg-white rounded-15 shadow-sm">
    <div className={`rounded-15 bg-${premium ? 'green' : 'orange-20'} text-${premium ? 'white' : ''} px-2`}>
        <div style={{ borderStyle: 'dashed', borderWidth: '0 0 .25px 0' }} className={`py-3 ${premium ? "border-white-50" : "border-orange-50"}`}>
            <div className={`d-flex align-items-center ${premium ? "" : "text-orange"}`}>
                <div className={`bg-white py-1 px-3 text-14 position-relative shadow-sm rounded-left-0 rounded-pill ${premium ? "text-green text-500" : ""}`} style={{ left: -8 }}>
                    <div className="mx-1">{name}</div>

                    {premium && <FontAwesomeIcon icon={faStar} className="text-orange text-9 position-absolute" style={{ top: 5, right: 11 }} />}
                </div>

                <div className="ml-auto d-flex align-items-center text-montserrat pr-2">
                    <div className="text-700 text-16 mr-1">{price}</div>

                    <div className="text-10 text-300 mr-1">USD</div>
                </div>
            </div>
        </div>

        <div className="py-4 px-3 text-14 text-300">
            <Item condition={premium || standard}>Basic Plan features</Item>
            <Item condition={premium}>Standard Plan features</Item>
            <Item>{meals > 0 ? meals : <>Unlimited</>} meals</Item>
            <Item>{actions} action button{actions > 1 && 's'}</Item>
            <Item condition={premium}>Available Reviews report</Item>
            <Item condition={premium || standard}>{banners} Ads banners</Item>
            <Item condition={basic}>System configuration</Item>
            <Item condition={premium}>30 days premium support</Item>
            <Item condition={basic}>30 days support</Item>
        </div>

        <div style={{ borderStyle: 'dashed', borderWidth: '.25px 0 0 0' }} className={`py-3 px-4 text-center ${premium ? "border-white-50" : "border-orange-50"}`}>
            <Link to={`/restaurant/plans/purchase?type=${months}&plan_id=${id}`} className={"btn text-decoration-none rounded-pill position-relative text-12 px-3 py-2 d-inline-flex align-items-center " + (premium ? "btn-white text-green" : "btn-orange")}>
                <div className="mr-3">Select</div>

                <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </Link>
        </div>
    </div>
</div>