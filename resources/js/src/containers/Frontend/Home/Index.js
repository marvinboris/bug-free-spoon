import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Carousel from './Carousel';
import Join from './Join';
import Pay from './Pay';

import Error from '../../../components/Messages/Error';
import Feedback from '../../../components/Messages/Feedback';

import RemainingTime from '../../../components/Frontend/UI/RemainingTime';
import SectionTitle from '../../../components/Frontend/UI/Title/SectionTitle';
import ActivityBlock from '../../../components/Frontend/UI/Blocks/ActivityBlock';
import ElderBlock from '../../../components/Frontend/UI/Blocks/ElderBlock';
import PublicationBlock from '../../../components/Frontend/UI/Blocks/PublicationBlock';

import View from '../../../components/UI/View';
import Input from '../../../components/UI/Input';
import OwlCarousel from '../../../components/UI/OwlCarousel';

import { convertDate } from '../../../shared/utility';
import { getHome, postSubscribe, resetHome } from '../../../store/actions/frontend/home';

import './Home.scss';

const Stat = ({ icon, value, text }) => <div className='Stat'>
    <div>
        <div className='icon'>
            <i className={'fas fa-fw fa-' + icon} />
        </div>
    </div>

    <div>
        <div className='value'>{value}</div>

        <div className='text'>{text}</div>
    </div>
</div>;

const initialState = {
    name: '',
    email: '',
};

class Home extends Component {
    state = { ...initialState }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        if (!this.props.frontend.home.loading) this.props.subscribe(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.get();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.frontend.home.message && this.props.frontend.home.message && this.props.frontend.home.message.type === 'success') this.setState({ ...initialState });
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { home: cms } } }
            } },
            frontend: { home: { loading, error, message, events = [], activities = [], stats = [], elders = [], publications = [] } }
        } = this.props;
        const { name, email } = this.state;
        const lang = localStorage.getItem('lang');

        const eventsContent = events.map(event => <div key={JSON.stringify(event)}>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='img'>
                        <img src={event.photo} className='img-fluid' />

                        <div className='date'>{convertDate(event.date)}</div>
                    </div>
                </div>

                <div className='col-md-8'>
                    <RemainingTime time={event.date} />

                    <Link to={event.link} className="title">{event.title[lang]}</Link>

                    <p dangerouslySetInnerHTML={{ __html: event.description[lang] }} />

                    <Link to={event.link} className='join btn btn-white'>{cms.events.join}<i className='fas fa-sign-in-alt' /></Link>
                </div>
            </div>
        </div>);
        const activitiesContent = activities.map(activity => <ActivityBlock key={JSON.stringify(activity)} {...activity} />);
        const statsContent = stats.map(stat => <div key={JSON.stringify(stat)} className='col'><Stat {...{ ...stat, ...cms.stats[stat.key] }} /></div>);
        const eldersContent = elders.map(elder => <ElderBlock key={JSON.stringify(elder)} {...elder} />);
        const publicationsContent = publications.map(publication => <PublicationBlock key={JSON.stringify(publication)} {...publication} />);

        return <div className="Home">
            <div className='banner'>
                <div className="banner__container">
                    <div className="banner__text container">
                        <div className='row'>
                            <div className='title text-24 text-md-28 text-xl-32 col-10 col-md-8 col-xl-6'>{cms.banner.title}</div>

                            <div className='subtitle text-14 text-md-16 text-xl-18 col-10 col-md-9 col-xl-8'>{cms.banner.carousel[0].altText}</div>

                            <div className='col-12'>
                                <Link to={'/alumni-call'} className="alumni-call btn btn-blue">{cms.banner.alumni_call}</Link>
                                <Link to={'/opportunities'} className="btn btn-white">{cms.banner.opportunities}</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Carousel items={cms.banner.carousel} />
            </div>

            {events.length > 0 && <div className='events'>
                <div className='events__container container'>
                    <div className='events__wrapper'>
                        <div className='events__title shadow-sm'>{cms.events.title}</div>

                        <OwlCarousel options={{ items: 1, dots: false }}>{eventsContent}</OwlCarousel>
                    </div>
                </div>
            </div>}

            <section className='about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <img src={cms.about.photo} className='img-fluid' />
                        </div>

                        <div className='col-lg-6'>
                            <SectionTitle {...cms.about} />

                            <p>{cms.about.description}</p>

                            <div className='actions text-center text-md-left'>
                                <a href='mailto:contact@fiducac.org?subject=Je fais un don' target='_blank' className="donate btn btn-blue">{cms.about.donate}<i className='fas fa-donate' /></a>
                                <View title={cms.about.join.title} content={<Join />}><button className='join btn btn-white'>{cms.about.join.title}<i className='fas fa-sign-in-alt' /></button></View>
                                <View title={cms.about.pay.title} content={<Pay />}><button className='pay btn btn-border'>{cms.about.pay.title}<i className='fas fa-wallet' /></button></View>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='activities'>
                <div className='container'>
                    <SectionTitle {...cms.activities} />

                    <p>{cms.activities.description}</p>

                    {activities.length > 0 && <OwlCarousel options={{ responsive: { 0: { items: 1 }, 600: { items: 2 }, 900: { items: 3 } }, dots: false, margin: 20 }}>{activitiesContent}</OwlCarousel>}

                    <div className='view-all'>
                        <Link to={'/activities'} className='btn btn-blue'>{cms.activities.view_all}<i className={'fas fa-' + cms.activities.icon} /></Link>
                    </div>
                </div>
            </section>

            <section className='stats'>
                <div className='container'>
                    <div className='row'>
                        {statsContent}
                    </div>
                </div>
            </section>

            <section className='elders'>
                <div className='container'>
                    <SectionTitle {...cms.elders} />

                    <p>{cms.elders.description}</p>

                    {elders.length > 0 && <OwlCarousel options={{ responsive: { 0: { items: 1 }, 600: { items: 2 }, 900: { items: 3 } }, dots: false, margin: 20 }}>{eldersContent}</OwlCarousel>}

                    <div className='view-all'>
                        <Link to={'/alumni-call'} className='btn btn-blue'>{cms.elders.view_all}<i className={'fas fa-' + cms.elders.icon} /></Link>
                    </div>
                </div>
            </section>

            <section className='publications'>
                <div className='container'>
                    <SectionTitle {...cms.publications} />

                    <p>{cms.publications.description}</p>

                    {publications.length > 0 && <OwlCarousel options={{ responsive: { 0: { items: 1 }, 600: { items: 2 }, 900: { items: 3 } }, dots: false, margin: 20 }}>{publicationsContent}</OwlCarousel>}

                    <div className='view-all'>
                        <Link to={'/publications'} className='btn btn-blue'>{cms.publications.view_all}<i className={'fas fa-' + cms.publications.icon} /></Link>
                    </div>
                </div>
            </section>

            <section className='newsletter'>
                <div className='container'>
                    <SectionTitle {...cms.newsletter} centered />

                    <p>{cms.newsletter.description}</p>

                    <div className='row justify-content-center'>
                        <div className='col-lg-7'>
                            <Error err={error} />
                            <Feedback message={message} />

                            <form onSubmit={this.saveHandler}>
                                <Input type='text' name='name' onChange={this.inputChangeHandler} value={name} placeholder={cms.newsletter.name} required disabled={loading} />
                                <Input type='email' name='email' onChange={this.inputChangeHandler} value={email} placeholder={cms.newsletter.email} required disabled={loading} />

                                <div className='submit'>
                                    <button className={'btn btn-blue' + (loading ? ' btn-disabled' : '')}>{cms.newsletter.submit}<i className='fas fa-paper-plane' /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: () => dispatch(getHome()),
    subscribe: data => dispatch(postSubscribe(data)),
    reset: () => dispatch(resetHome()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));