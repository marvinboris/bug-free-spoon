import React from 'react';

import './Card.css';

export default ({ title, addon, value, color }) => <div className="col">
    <div className='Card shadow-lg'>
        <div className='title text-truncate'>{title}</div>

        <div className={'line bg-' + color} />

        <div className='d-flex align-items-end'>
            <div>
                {value}
            </div>

            <div className='ml-auto'>
                {addon}
            </div>
        </div>
    </div>
</div>;