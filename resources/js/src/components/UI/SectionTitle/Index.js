import React from 'react';

import './SectionTitle.scss';

export default ({ title, subtitle, icon, centered }) => <div className={'SectionTitle' + (centered ? " centered" : "")}>
    {icon && <div className='icon'>
        <div className='wrapper'>
            <i className={'fas fa-' + icon} />
        </div>
    </div>}

    <div className='text'>
        <div className='title'>{title}</div>

        <div className='subtitle'>{subtitle}</div>
    </div>
</div>;