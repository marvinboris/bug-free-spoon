import React from 'react';

import './Spinner.scss';

import ImgLogo from '../../../../assets/images/logo-192x192.png';

export default () => <div className="UI Spinner">
    <div className="position-relative">
        <div className="loader" />

        <div className='content'>
            <img src={ImgLogo} />
        </div>
    </div>
</div>;