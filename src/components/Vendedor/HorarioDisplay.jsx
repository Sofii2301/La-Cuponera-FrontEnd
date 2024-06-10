import React from 'react';

const HorarioDisplay = ({ horarios }) => {
    console.log('horarios: ',horarios)
    
    return (
        <div className="container container-hd">
            <p>Horarios Guardados</p>
            <ul className="list-group">
                {Object.entries(horarios).map(([day, schedule]) => (
                    <li key={day} className="list-group-item fs-50">
                        {console.log('day: ',day)}
                        {console.log('schedule: ',schedule)}
                        <strong>{day}:</strong> {schedule}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HorarioDisplay;
