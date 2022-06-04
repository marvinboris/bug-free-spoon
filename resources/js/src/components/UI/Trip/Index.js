import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Trip.css';

class Trip extends Component {
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { trip } }
                }
            },
            time, category, branch, duration, price
        } = this.props;

        return <div className="UI Trip">
            <div className="shadow-sm rounded-30 bg-white overflow-hidden">
                <div className="py-4 px-3 row align-items-end border-bottom border-border-50">
                    <div className="col-4">
                        <div className="text-9 text-300">{trip.from}</div>

                        <div className="text-13 text-500">{category.branch.city.name}</div>
                    </div>

                    <div className="col-4">
                        <div className="position-relative d-flex justify-content-center">
                            <div className="p-1 bg-gold text-white text-300 text-7">
                                <i className="fas fa-clock mr-1" /><span>{duration.value}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="text-9 text-300">{trip.to}</div>

                        <div className="text-13 text-500">{branch.city.name}</div>
                    </div>
                </div>

                <div className="px-3 py-2">
                    <div className="row justify-content-between mb-4">
                        <div className="col-5 text-11">
                            <span className="text-300">{trip.available_seats} :</span>
                        </div>

                        <div className="col-5 text-11">
                            <span className="text-300">{trip.departure_in} :</span>
                        </div>
                    </div>

                    <div className="row justify-content-center mb-4 pb-2">
                        <div className="col-8 position-relative">
                            <div className="rounded-6 border border-border-50 p-3">
                                <div className="text-center rounded-3 bg-gold-10 text-gold text-700 py-2 px-3 position-relative mb-2">
                                    <i className="fas fa-location mr-2" />{category.branch.name}
                                </div>

                                <div className="px-1">
                                    <div>
                                        <div className="text-11 text-300">{trip.departure_time} :</div>

                                        <div>
                                            <span className="text-montserrat text-28 text-700">{time.value}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute category bg-white shadow-sm rounded-10 px-3 py-2">
                                <div className="d-flex align-items-center">
                                    <div className="text-11 text-300 pr-1">{trip.bus_type} :</div>

                                    <div>
                                        <div className="rounded-3 bg-gold-30 px-1 text-9 text-500">{category.name}</div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-700 text-gold text-montserrat text-17">{price.value}</span>{' '}<span className="text-11 text-300">{trip.xaf}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gold px-3 pt-5 pb-4">
                    <div className="row justify-content-between text-white text-700 text-11">
                        <div className="col-5">
                            <span>{trip.bus_plate_no} :</span>
                        </div>

                        <div className="col-5">
                            <span>{trip.bus_status} :</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Trip);