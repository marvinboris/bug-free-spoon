import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

import SideDrawerItem from './SideDrawerItem/Index';
import Logo from '../../../../../components/UI/Logo/Logo';

import './SideDrawer.scss';

export default ({ data, logoutHandler, toggle, selectItem, selectedItem, cms }) => {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    let { role: role_ } = data;

    let sideDrawerItems = null;
    const {
        pages: {
            backend: {
                header: { logout, close: close_, sure_logout },
                sidebar: {
                    menu: {
                        dashboard, users, roles, features, languages, cms: cms_, notifications, settings,
                        events, activities, elders, publications, subscribers,
                    }
                }
            }
        }
    } = cms;

    const logoutContent = <>
        <ModalHeader toggle={modalToggle}>{logout}</ModalHeader>
        <ModalBody className="text-center">
            <p>{sure_logout}?</p>
            <div>
                <Button color="blue" onClick={logoutHandler}>{logout} <i className='fas fa-power-off fa-fw' /></Button>{' '}
                <Button color="red" onClick={modalToggle}>{close_} <i className='fas fa-times fa-fw' /></Button>
            </div>
        </ModalBody>
    </>;

    const sideDrawerItem = (fixed = false, id = null, dropdown = null, icon, path, custom = false, addon = []) => {
        if (id && fixed) return <SideDrawerItem id={id} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} href={path}>{id}</SideDrawerItem>;

        if (fixed) {
            let items = [];

            if (!custom) {
                items.push({ link: '/add', text: dropdown.add });
                items.push({ link: '/', text: dropdown.index });
                items = items.concat(addon);
            }
            else items = custom;

            return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
        }

        if (id) {
            const feature = role_ && role_.features.find(f => path.includes('/user/' + f.prefix));
            if (!feature) return null;

            return <SideDrawerItem id={id} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} href={path}>{id}</SideDrawerItem>;
        }

        let items = [];

        if (!custom) {
            const feature = role_ && role_.features.find(f => path.includes('/user/' + f.prefix));
            if (!feature) return null;

            let { permissions } = feature;

            if (permissions && permissions.includes('c')) items.push({ link: '/add', text: dropdown.add });
            items.push({ link: '/', text: dropdown.index });
            items = items.concat(addon);
        }
        else items = custom;

        return <SideDrawerItem id={dropdown.title} sideDrawerToggle={toggle} select={selectItem} selected={selectedItem} icon={icon} dropdown path={path} items={items}>{dropdown.title}</SideDrawerItem>;
    };

    sideDrawerItems = <>
        {sideDrawerItem(true, dashboard.title, null, dashboard.icon, "/user/dashboard")}
        {sideDrawerItem(false, users.title, null, users.icon, "/user/users")}
        {sideDrawerItem(false, roles.title, null, roles.icon, "/user/roles")}
        {sideDrawerItem(false, features.title, null, features.icon, "/user/features")}
        {sideDrawerItem(false, languages.title, null, languages.icon, "/user/languages")}
        {sideDrawerItem(false, events.title, null, events.icon, "/user/events")}
        {sideDrawerItem(false, activities.title, null, activities.icon, "/user/activities")}
        {sideDrawerItem(false, elders.title, null, elders.icon, "/user/elders")}
        {sideDrawerItem(false, publications.title, null, publications.icon, "/user/publications")}
        {sideDrawerItem(false, subscribers.title, null, subscribers.icon, "/user/subscribers")}
        {sideDrawerItem(true, notifications.title, null, notifications.icon, "/user/notifications")}
        {sideDrawerItem(false, null, cms_, cms_.icon, "/user/cms", [
            { link: '/global', text: cms_.global },
            { link: '/general', text: cms_.general },
            { link: '/messages', text: cms_.messages },
            { link: '/components', text: cms_.components },
            { link: '/auth', text: cms_.auth },
            { link: '/backend', text: cms_.backend },
            { link: '/frontend', text: cms_.frontend },
        ])}
        {sideDrawerItem(true, settings.title, null, settings.icon, "/user/settings")}

        <div className='mt-auto'>
            <div className="py-2 px-3 text-300 rounded-4 cursor-pointer" onClick={modalToggle}>
                <i className="fas fa-fw fa-power-off text-blue mr-3" />

                <span className="text-border text-700">{logout}</span>
            </div>
        </div>

        <Modal isOpen={modal} toggle={modalToggle}>
            {logoutContent}
        </Modal>
    </>;



    return (
        <div className={`SideDrawer nav-left-sidebar`}>
            <div className={`content vh-100 d-flex flex-column`}>
                <div className='d-flex align-items-stretch mb-5 pb-2'>
                    <Logo type="named" />
                </div>

                <div className="flex-fill">
                    <ul className="navbar-nav scrollbar-blue flex-column pr-3">
                        {sideDrawerItems}
                    </ul>
                </div>
            </div>

            <div className="backdrop d-md-none" onClick={toggle} />
        </div>
    )
};