import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ProjectBlock.css';

class ProjectBlock extends Component {
    render() {
        const {
            content: { cms: { pages: { components: { project_block: cms } } } },
            number, completed, status, days, className = '',
        } = this.props;

        return <div className={"UI ProjectBlock " + className}>
            <div className={'content shadow bg-' + ['white', 'white border border-3 border-green', 'green-20'][status]} style={status === 0 ? { opacity: .5 } : {}}>
                <div className='d-flex'>
                    <div className='flex-fill'>
                        <div className={'title text-' + ['border', 'border', 'green'][status]}>{cms.project} {number}</div>

                        <div className={'line bg-' + ['border-75', 'border', 'green-50'][status]} />
                    </div>

                    <div>
                        <div className={'badger bg-' + ['border-50 text-border', 'green text-white', 'green text-white'][status]}>
                            {cms[['unavailable', 'available', 'completed'][status]]}<i className={'fas fa-' + ['lock', 'unlock', 'check'][status]} />
                        </div>
                    </div>
                </div>

                <div className='d-flex align-items-center'>
                    <div className='ratio'><span className={'completed text-' + ['border', 'green', 'green'][status]}>{completed}</span> / 1000</div>

                    <div>
                        {status === 2 ? <i className='text-42 text-green-40 fas fa-calendar-check' /> : <div className={'text-500 text-16 text-' + ['border', 'green'][status] + ' d-flex justify-content-center align-items-center border border-' + ['border', 'green'][status] + ' border-4 rounded-circle'} style={{ width: 50, height: 50 }}>
                            {Math.floor(completed / 10)} <span className={'text-400 text-12 text-' + ['border', 'green'][status] + '-40'}>%</span>
                        </div>}
                    </div>
                </div>

                <div className='comment'>
                    {cms[['starting', 'closes', 'verification'][status]]} <span className={'text-500 text-' + ['green', 'red', 'orange'][status]}>{days} {status === 2 ? <i className='fas fa-spinner fa-spin' /> : cms.days}</span>
                </div>
            </div>

            {status === 1 && <div className='check-circle'><i className='fas fa-check' /></div>}
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(ProjectBlock);