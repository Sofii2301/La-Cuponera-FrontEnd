import React from 'react';

const Sidebar = ({ stores, onSelectStore }) => {
    return (
        <div className="sidebar-map bg-light">
            <h2 className="p-3">Tiendas</h2>
            <ul className="list-group list-group-flush">
                {stores.map((store) => (
                <li
                    key={store.id}
                    className="list-group-item"
                    onClick={() => onSelectStore(store)}
                    style={{ cursor: 'pointer' }}
                >
                    <h5>{store.name}</h5>
                    <p>{store.description}</p>
                    <p>Rating: {store.rating}</p>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;