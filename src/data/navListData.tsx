import 'bootstrap-icons/font/bootstrap-icons.css';

interface NavItem {
    id: number;
    target: string;
    name: string;
    icon: string;
    active: boolean;
    url: string;
}


const navListData: NavItem[] = [
    {
        id: 1,
        target: 'Home',
        name: 'Home',
        icon: 'bi bi-house-door',
        active: true,
        url: '#',
    },
    {
        id: 2,
        target: 'Championships',
        name: 'Championships',
        icon: 'bi bi-trophy',
        active: false,
        url: 'championship',
    },
    {
        id: 3,
        target: 'Team',
        name: 'Team',
        icon: 'bi bi-people',
        active: false,
        url: 'team',
    },
    {
        id: 4,
        target: 'Perfil',
        name: 'Perfil',
        icon: 'bi bi-person-badge',
        active: false,
        url: 'profiles/edit',
    },
];

export default navListData;
