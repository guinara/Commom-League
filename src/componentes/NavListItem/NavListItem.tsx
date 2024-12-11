import React from 'react';

interface NavListItemProps {
    item: {
        icon: string;
        name: string;
        target: string;
    };
    onClick: () => void; 
}

const NavListItem: React.FC<NavListItemProps> = ({ item, onClick }) => {
    return (
        <li onClick={onClick}>
            <a href="#" onClick={(e) => e.preventDefault()}> {}
                <i className={`bi ${item.icon}`}></i>
                <span className="navName">{item.name}</span>
            </a>
        </li>
    );
};

export default NavListItem;
