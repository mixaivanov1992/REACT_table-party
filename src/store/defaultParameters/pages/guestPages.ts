import {
    AccessiblePages,
    LinkLocation,
    PageAlias,
    PageRoute,
} from '@models/accessiblePage';

export const GuestPages: AccessiblePages = [{
    linkLocation: [LinkLocation.header],
    pageRoute: PageRoute.login,
    pageAlias: PageAlias.login,
    exact: true,
    component: 'Login/Login',
    isContentComponent: false,
    linkIcon: {
        path: 'io5',
        name: 'IoPersonCircle',
    },
    sort: 0,
}, {
    linkLocation: [],
    pageRoute: PageRoute.registration,
    pageAlias: PageAlias.registration,
    exact: true,
    component: 'Login/Registration/Registration',
    isContentComponent: false,
    sort: 0,
}, {
    linkLocation: [],
    pageRoute: PageRoute.forgotPassword,
    pageAlias: PageAlias.forgotPassword,
    exact: true,
    component: 'Login/ForgotPassword/ForgotPassword',
    isContentComponent: false,
    sort: 0,
}];
