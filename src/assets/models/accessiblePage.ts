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
    newRule = '/new-rule',
    profile = '/profile',
    ruleEdit = '/rule-edit/:id',
    runRule = '/run-rule/:url',
    searchRules = '/search-rules/:name',
    page404 = '*',
}
export enum PageAlias{
    home = 'home',
    rules = 'rules',
    about = 'about',
    login = 'login',
    registration = 'registration',
    forgotPassword = 'forgotPassword',
    newRule = 'newRule',
    profile = 'profile',
    ruleEdit = 'ruleEdit',
    runRule = 'runRule',
    searchRules = 'searchRules',
    page404 = 'page404',
}

export interface AccessiblePage {
    readonly linkLocation: Array<LinkLocation>,
    readonly pageRoute: PageRoute,
    readonly pageAlias: PageAlias,
    readonly exact: boolean,
    readonly component: string,
    readonly isContentComponent: boolean,
    readonly fullScreenAccessible: boolean,
    readonly linkIcon?: IconData,
    readonly sort: number
}
type IconData = {
    path: string,
    name: string
}

export type AccessiblePages = Array<AccessiblePage>;
