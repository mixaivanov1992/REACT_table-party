export enum LinkLocation{
    header = 'header',
    content = 'content',
    footer = 'footer',
    navbar = 'navbar',
    separately = 'separately'
}
export enum PageRoute{
    home = '/',
    rules = '/rules',
    about = '/about',
    login = '/login',
    registration = '/registration',
    forgotPassword = '/forgot-password',
    passwordRecovery = '/password-recovery/:link',
    newRule = '/new-rule',
    profile = '/profile',
    ruleEdit = '/rule-edit/:id',
    runRule = '/run-rule/:id',
    searchRules = '/search-rules/:name',
    googleAuthError = '/google-auth-error/:error',
    page404 = '*',
}
export enum PageAlias{
    home = 'home',
    rules = 'rules',
    about = 'about',
    login = 'login',
    registration = 'registration',
    forgotPassword = 'forgotPassword',
    passwordRecovery = 'passwordRecovery',
    newRule = 'newRule',
    profile = 'profile',
    ruleEdit = 'ruleEdit',
    runRule = 'runRule',
    searchRules = 'searchRules',
    googleAuthError = 'googleAuthError',
    page404 = 'page404',
}

export interface AccessiblePage {
    readonly linkLocation: Array<LinkLocation>,
    readonly pageRoute: PageRoute,
    readonly pageAlias: PageAlias,
    readonly exact: boolean,
    readonly component: string,
    readonly isContentComponent: boolean,
    readonly linkIcon?: IconData,
    readonly sort: number
}
type IconData = {
    path: string,
    name: string
}

export type AccessiblePages = Array<AccessiblePage>;
