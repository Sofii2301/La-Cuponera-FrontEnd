import React from 'react';

const HorarioDisplay = ({ horarios }) => {
    
    return (
        <div className="container container-hd">
            <p>Horarios Guardados</p>
            <ul className="list-group">
                {Object.entries(horarios).map(([day, schedule]) => (
                    <li key={day} className="list-group-item fs-50">
                        <strong>{day}:</strong> {schedule}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HorarioDisplay;
