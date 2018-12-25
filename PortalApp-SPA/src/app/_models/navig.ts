export class Navig {
    id: string;
    title: string;
    type: string;
    icon: string;
    url: string;
    children?: Navig[];

    constructor(navig?) {
        navig = navig || {};
        this.id = 'nav_' + navig.id || '';
        this.title = navig.title || '';
        this.type = navig.type || '';
        this.icon = navig.icon || '';
        this.url = navig.url || '';
        this.children = navig.children || [];
    }
}
