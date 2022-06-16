import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormGroup } from 'reactstrap';

// Components
import Save from '../../../../components/Backend/UI/Form/Save';
import Editor from '../../../../components/Backend/UI/Form/Editor';

import Input from '../../../../components/UI/Input';
import Preloader from '../../../../components/UI/Preloaders/Preloader';

import actions from '../../../../store/actions/backend/activities';
import * as utility from '../utility';

const initialState = {
    title: {},
    body: {},
    photo: null,
    is_active: '1',

    translate: process.env.MIX_DEFAULT_LANG,

    add: false,
}

class Add extends Component {
    state = { ...initialState }

    // Component methods
    resetState = () => this.setState({ ...initialState, title: {}, body: {} })
    saveAddHandler = () => utility.add.component.saveAddHandler(this.setState.bind(this), this.props)
    inputChangeHandler = e => utility.add.component.inputChangeHandler(this.state, this.setState.bind(this))(e)
    fileUpload = id => utility.add.component.fileUpload(id)

    // Lifecycle methods
    componentDidMount() { utility.add.lifecycle.componentDidMount(this.props) }
    componentDidUpdate(prevProps) { utility.add.lifecycle.componentDidUpdate('activities', 'activity')(prevProps, this.props, this.state, this.setState.bind(this), this.resetState) }
    componentWillUnmount() { this.props.reset() }
    render() {
        const {
            content: {
                cms: {
                    pages: { components: { form: { active, inactive } }, backend: { pages: { activities: { form } } } }
                }, languages
            },
            backend: { activities: { loading, activity = {} } },
        } = this.props;
        const { title, body, photo, is_active, translate } = this.state;
        let content;

        const languagesOptions = languages.map(language => <option key={JSON.stringify(language)} value={language.abbr}>{language.name}</option>);

        if (loading) content = <div className='col-12'>
            <Preloader />
        </div>;
        else content = <>
            {this.props.edit && <input type="hidden" name="_method" defaultValue="PATCH" />}

            <div className='row'>
                <div className="col-lg-9">
                    <div className="row">
                        {languages.map(l => <Fragment key={'language-' + l.abbr}>
                            <Input type="text" id={"title-" + l.abbr} className={"col-lg-12" + (l.abbr === translate ? "" : " d-none")} onChange={this.inputChangeHandler} value={title[l.abbr]} name={"title[" + l.abbr + "]"} required label={form.title} />
                            <FormGroup id={"body-" + l.abbr} className={"col-lg-12" + (l.abbr === translate ? "" : " d-none")}>
                                {this.props.edit && activity.body && activity.body[l.abbr] === body[l.abbr] && <Editor defaultValue={activity.body[l.abbr]} name={"body[" + l.abbr + "]"} placeholder={form.body} />}
                                {!this.props.edit && <Editor name={"body[" + l.abbr + "]"} placeholder={form.body} />}
                            </FormGroup>
                        </Fragment>)}
                    </div>
                </div>

                <div className="col-lg-3">
                    <Input type="select" name="translate" label={form.language} onChange={this.inputChangeHandler} value={translate}>
                        {languagesOptions}
                    </Input>
                </div>

                <div className="col-12 mb-3">
                    <hr />
                </div>

                <div className="col-lg-9">
                    <Input type="image" name="photo" label={form.photo} onClick={() => this.fileUpload('photo')} cms={form} defaultValue={activity.photo} value={photo} dimensions='21by9' />
                </div>

                <div className="col-lg-3">
                    <Input type="select" label={form.is_active} onChange={this.inputChangeHandler} value={is_active} name="is_active" required>
                        <option>{form.select_status}</option>
                        <option value={1}>{active}</option>
                        <option value={0}>{inactive}</option>
                    </Input>
                </div>
            </div>


            <Save edit={this.props.edit} saveAddHandler={this.saveAddHandler} />
        </>;

        return <utility.add.lifecycle.render className='Activities' props={this.props} resource={'activities'}>
            <input type="file" id="photo" name="photo" className="d-none" onChange={this.inputChangeHandler} accept=".png,.jpg,.jpeg" />
            {content}
        </utility.add.lifecycle.render>;
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    get: id => dispatch(actions.show(id)),
    post: data => dispatch(actions.post(data)),
    patch: (id, data) => dispatch(actions.patch(id, data)),
    reset: () => dispatch(actions.reset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add));