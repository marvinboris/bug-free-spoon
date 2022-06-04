import React, { Component } from 'react';
import { connect } from 'react-redux';

import { convertDate } from '../../../../shared/utility';

import './FormBlock.css';

class FormBlock extends Component {
    render() {
        const {
            content: { cms: { pages: { components: { form_block: cms } } } },
            number, status = 0, body, customer, errors, updated_at, className = '',
        } = this.props;

        const formattedBody = body && <>
            <div className='group'>
                <div className='title'>
                    {cms.body.group} 1 <i className='fas fa-circle' />
                </div>

                <div className='body'>
                    {Object.keys(body[0]).map(param => <div key={body[0][param]}>
                        {cms.body[param]} : {body[0][param]}
                    </div>)}
                </div>
            </div>
        </>;

        const formStatus = customer ? body ? ['pending', 'rejected', 'approved'][status] : 'reserved' : 'available';
        const formBadger = {
            bg: { available: 'primary', reserved: 'darkgreen', pending: 'orange', rejected: 'red', approved: 'green' }[formStatus],
            icon: { available: 'check-circle', reserved: 'check-circle', pending: 'spinner fa-spin', rejected: 'times-circle', approved: 'check-circle' }[formStatus],
        };
        const formCircleButton = {
            bg: { available: 'transparent', reserved: 'transparent', pending: 'primary', rejected: 'red', approved: 'lightgreen' }[formStatus],
            icon: { available: '', reserved: '', pending: 'edit', rejected: 'edit', approved: 'check' }[formStatus],
        };

        return <div className={'UI FormBlock ' + className}>
            <div className='content shadow'>
                <div className='d-flex'>
                    <div className='flex-fill'>
                        <div className='d-flex mb-3'>
                            <div className='icon'><i className='far fa-copy text-border-30' /></div>

                            <div className='text-20 text-500'>{cms.form} <span className='text-700'>{number}</span></div>
                        </div>

                        <div className='green-line' />
                    </div>

                    <div>
                        <div className={'badger bg-' + formBadger.bg}>
                            <div className='text'>{cms[formStatus]}</div>

                            <div><i className={'fas fa-' + formBadger.icon} /></div>
                        </div>

                        {status === 1 && <div className='text-red text-12 text-right'>{errors} {errors > 1 ? cms.errors_found : cms.error_found}</div>}
                    </div>
                </div>

                <div className='paper'>{formattedBody}</div>

                <div className='d-flex align-items-center'>
                    <div className='flex-fill'>
                        <div className='border-line' />
                    </div>

                    <div>
                        <div className={'circle-button shadow' + (status < 2 ? " cursor-pointer " : " ") + "bg-" + formCircleButton.bg} style={!body ? { opacity: 0 } : {}}>
                            <i className={'fas fa-' + formCircleButton.icon} />
                        </div>
                    </div>
                </div>

                <div className='by'>
                    <div><i className='fas fa-user' /></div>

                    <div className='label'>{cms.by} :</div>

                    <div className='customer'>{customer || cms.not_available}</div>
                </div>

                <div className='edited'>
                    <div><i className='fas fa-calendar-check' /></div>

                    <div className='label'>{body ? cms.edited : cms.published} :</div>

                    <div className='updated text-truncate'>{convertDate(updated_at)}</div>
                </div>
            </div>

            {status === 2 && <>
                <div className='approved-big-line' />

                <div className='approved-little-line' />
            </>}
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(FormBlock);