import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const daysOfWeek = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
];

const HorarioSelector = ({ horarios, setHorarios }) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [timeRange, setTimeRange] = useState({ start1: '', end1: '', start2: '', end2: '' });

    const handleDaySelection = (day) => {
        setSelectedDays(prevSelectedDays =>
        prevSelectedDays.includes(day)
            ? prevSelectedDays.filter(d => d !== day)
            : [...prevSelectedDays, day]
        );
    };

    const handleTimeChange = (period, value) => {
        setTimeRange(prevTimeRange => ({ ...prevTimeRange, [period]: value }));
    };

    const applyTimeRange = () => {
        const newHorarios = { ...horarios };
        selectedDays.forEach(day => {
        if (timeRange.start2 && timeRange.end2) {
            newHorarios[day] = `${timeRange.start1}-${timeRange.end1} y ${timeRange.start2}-${timeRange.end2}`;
        } else {
            newHorarios[day] = `${timeRange.start1}-${timeRange.end1}`;
        }
        });
        setHorarios(newHorarios);
        setSelectedDays([]);
        setTimeRange({ start1: '', end1: '', start2: '', end2: '' });
    };

    const handleSave = () => {
        setHorarios(prevHorarios => ({ ...prevHorarios, ...horarios }));
    };

    return (
        <div className="container">
            <p>Selecciona los días:</p>
            <div className="btn-group mb-3 contenedor-dias-hs" role="group" aria-label="Basic checkbox toggle button group">
                {daysOfWeek.map(day => (
                <div key={day} className="form-check form-check-inline">
                    <input
                        type="checkbox"
                        className="btn-check"
                        id={day}
                        checked={selectedDays.includes(day)}
                        onChange={() => handleDaySelection(day)}
                    />
                    <label className="btn btn-outline-primary btn-dia-hs" htmlFor={day}>{day}</label>
                </div>
                ))}
            </div>

            <p>Horario</p>
            <div className="mb-0 p-3 pt-0">
                <label htmlFor="start1" className="form-label">Horario Corrido:</label>
                <div className="d-flex">
                <input
                    type="time"
                    className="form-control me-2"
                    id="start1"
                    value={timeRange.start1}
                    onChange={(e) => handleTimeChange('start1', e.target.value)}
                />
                <input
                    type="time"
                    className="form-control"
                    id="end1"
                    value={timeRange.end1}
                    onChange={(e) => handleTimeChange('end1', e.target.value)}
                />
                </div>
            </div>

            <div className="mb-3 p-3 pt-0">
                <label htmlFor="start2" className="form-label">Horario Partido (opcional):</label>
                <div className="d-flex">
                <input
                    type="time"
                    className="form-control me-2"
                    id="start2"
                    value={timeRange.start2}
                    onChange={(e) => handleTimeChange('start2', e.target.value)}
                />
                <input
                    type="time"
                    className="form-control"
                    id="end2"
                    value={timeRange.end2}
                    onChange={(e) => handleTimeChange('end2', e.target.value)}
                />
                </div>
            </div>

            <button type="button" className="btn btn-azul me-2" onClick={applyTimeRange}>Aplicar Horario a Días Seleccionados</button>
            <button type="button" className="btn btn-amarillo" onClick={handleSave}>Guardar Horarios</button>
        </div>
    );
};

export default HorarioSelector;
