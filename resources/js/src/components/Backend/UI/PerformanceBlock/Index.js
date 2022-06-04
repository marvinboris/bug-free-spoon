import React from 'react';

import './PerformanceBlock.css';

export default ({ author, total, approved, pending, rejected, rank, className = '', }) => <div className={'UI PerformanceBlock ' + className}>
    <div className='content'>
        <div>
            <div className='author-photo' style={{ backgroundImage: 'url("' + author.photo + '")' }} />
        </div>

        <div>
            <div className='author-at'>{author.at}</div>

            <div className='performances'>
                <div><i className='far text-green fa-check-circle' />{approved}</div>
                <div><i className='fas text-orange fa-spinner fa-spin' />{pending}</div>
                <div><i className='far text-red fa-times-circle' />{rejected}</div>
            </div>
        </div>

        <div className='rank'>
            #{rank}
        </div>
    </div>

    <div className='total shadow'>
        <i className='far fa-copy' />{total}
    </div>
</div>;