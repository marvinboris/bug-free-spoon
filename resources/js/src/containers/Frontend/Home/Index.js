import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import Carousel from './Carousel';

import Input from '../../../components/UI/Input';
import ElderBlock from '../../../components/UI/ElderBlock';
import Feedback from '../../../components/Feedback/Feedback';
import SectionTitle from '../../../components/UI/SectionTitle';
import RemainingTime from '../../../components/UI/RemainingTime';
import ActivityBlock from '../../../components/UI/ActivityBlock';
import PublicationBlock from '../../../components/UI/PublicationBlock';

import { convertDate } from '../../../shared/utility';
import { getHome, postSubscribe, resetHome } from '../../../store/actions/frontend/home';

import './Home.scss';

const Stat = ({ icon, value, text }) => <div className='Stat'>
    <div className='icon'>
        <i className={'fas fa-' + icon} />
    </div>

    <div>
        <div className='value'>{value}</div>

        <div className='text'>{text}</div>
    </div>
</div>;

class Home extends Component {
    state = {
        name: '',
        email: '',
    }



    // Component methods
    saveHandler = e => {
        e.preventDefault();
        this.props.subscribe(e.target);
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    // Lifecycle methods
    componentDidMount() {
        this.props.get();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            content: { cms: {
                pages: { frontend: { pages: { home: cms } } }
            } },
            frontend: { home: { loading, message, events = [], activities = [], stats = [], elders = [], publications = [] } }
        } = this.props;
        const { name, email } = this.state;
        const lang = localStorage.getItem('lang');

        const eventsContent = events.map(event => <div key={JSON.stringify(event)}>
            <div className='row'>
                <div className='col-4'>
                    <div className='img'>
                        <img src={event.photo} className='img-fluid' />

                        <div className='date'>{convertDate(event.date)}</div>
                    </div>
                </div>

                <div className='col-8'>
                    <RemainingTime time={event.date} />

                    <Link to={event.link} className="title">{event.title[lang]}</Link>

                    <p dangerouslySetInnerHTML={{ __html: event.description[lang] }} />

                    <Link to={event.link} className='join btn btn-white'>{cms.events.join}<i className='fas fa-sign-in-alt' /></Link>
                </div>
            </div>
        </div>);
        const activitiesContent = activities.map(activity => <ActivityBlock key={JSON.stringify(activity)} {...activity} />);
        const statsContent = stats.map(stat => <div key={JSON.stringify(stat)} className='col'><Stat {...{ ...stat, ...cms.stats[stat.ref] }} /></div>);
        const eldersContent = elders.map(elder => <ElderBlock key={JSON.stringify(elder)} {...elder} />);
        const publicationsContent = publications.map(publication => <PublicationBlock key={JSON.stringify(publication)} {...publication} />);

        return <div className="Home">
            <div className='banner'>
                <div className="banner__container">
                    <div className="banner__text container">
                        <div className='title'>{cms.banner.title}</div>

                        <div className='subtitle'>{cms.banner.carousel[0].altText}</div>

                        <div>
                            <Link to={'/alumni-call'} className="alumni-call btn btn-blue">{cms.banner.alumni_call}</Link>
                            <Link to={'/opportunities'} className="btn btn-white">{cms.banner.opportunities}</Link>
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

                            <a href='mailto:contact@fiducac.org?subject=Je fais un don' target='_blank' className="donate btn btn-blue">{cms.about.donate}<i className='fas fa-donate' /></a>
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

                    <form className='row' onSubmit={this.saveHandler}>
                        <div className='col-lg-7'>
                            <Feedback message={message} />
                        </div>

                        <Input type='text' name='name' className='col-lg-7' onChange={this.inputChangeHandler} value={name} placeholder={cms.newsletter.name} required validation={{ required: true }} />
                        <Input type='email' name='email' className='col-lg-7' onChange={this.inputChangeHandler} value={email} placeholder={cms.newsletter.email} required validation={{ required: true }} />

                        <div className='submit col-12'>
                            <button className='btn btn-blue'>{cms.newsletter.submit}<i className='fas fa-paper-plane' /></button>
                        </div>
                    </form>
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