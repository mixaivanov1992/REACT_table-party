import {
    // eslint-disable-next-line
    HashRouter, Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { LinkLocation } from '@models/accessiblePage';
import { useTypedSelector } from '@hooks/useTypedSelector';
import { v4 as uuidv4 } from 'uuid';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import Content from '@components/Content/Content';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Navbar from '@components/Navbar/Navbar';
import React from 'react';

const Routes: React.FC = () => {
    console.info('Routes');
    const { accessiblePages } = useTypedSelector((state) => state.personalDataReducer);
    const headerFilter = accessiblePages.filter((item) => item.linkLocation.includes(LinkLocation.header));
    const navbarFilter = accessiblePages.filter((item) => item.linkLocation.includes(LinkLocation.navbar));
    const footerFilter = accessiblePages.filter((item) => item.linkLocation.includes(LinkLocation.footer));

    const routes = accessiblePages.map((accessiblePage) => {
        const {
            pageRoute, isContentComponent, component, exact,
        } = accessiblePage;

        if (isContentComponent) {
            return (
                <Route key={uuidv4()} exact={exact} path={pageRoute}>
                    <Header accessiblePages={headerFilter} />
                    <Breadcrumbs accessiblePages={accessiblePages} />
                    <div className="content">
                        <Navbar accessiblePages={navbarFilter} />
                        <Content accessiblePage={accessiblePage} />
                    </div>
                    <Footer accessiblePages={footerFilter} />
                </Route>
            );
        }
        const Component = require(`./components/${component}`).default;
        return (
            <Route key={uuidv4()} exact path={pageRoute}>
                <Component />
            </Route>
        );
    });

    return (
        // github pages use HashRouter // Router
        <HashRouter>
            <Switch>
                {routes}
            </Switch>
        </HashRouter>
    );
};

export default Routes;
