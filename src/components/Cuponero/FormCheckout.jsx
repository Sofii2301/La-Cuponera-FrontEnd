import * as React from 'react';
import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const paises = {
    Colombia: ["Chia", "Bogotá", "Medellín"],
    // Añadir más países y ciudades según sea necesario
};

export default function FormCheckout({ cuponero, formData, setFormData, errors, setErrors }) {
    const [cities, setCities] = useState(paises['Colombia']);

    useEffect(() => {
        if (cuponero) {
            setFormData({
                nombre: cuponero.nombre || '',
                apellido: cuponero.apellido || '',
                email: cuponero.email || '',
                telefono: cuponero.telefono || '',
                ciudad: cuponero.ciudad || 'Chia',
                pais: cuponero.pais || 'Colombia'
            });
        }
    }, [cuponero, setFormData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCountryChange = (e) => {
        const pais = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            pais,
            ciudad: ''
        }));
        setCities(paises[pais]);
    };

    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    Nombre
                </FormLabel>
                <OutlinedInput
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    error={!!errors.nombre}
                />
                {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                    Apellido
                </FormLabel>
                <OutlinedInput
                    id="apellido"
                    name="apellido"
                    type="text"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    error={!!errors.apellido}
                />
                {errors.apellido && <div style={{ color: 'red' }}>{errors.apellido}</div>}
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="email" required>
                    Email
                </FormLabel>
                <OutlinedInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                />
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                <OutlinedInput
                    id="telefono"
                    name="telefono"
                    type="text"
                    placeholder="Celular/WhatsApp"
                    value={formData.telefono}
                    onChange={handleInputChange}
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="ciudad" required>
                    Ciudad
                </FormLabel>
                <Select
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    error={!!errors.ciudad}
                >
                    {cities.map((ciudad) => (
                        <MenuItem key={ciudad} value={ciudad}>
                            {ciudad}
                        </MenuItem>
                    ))}
                </Select>
                {errors.ciudad && <div style={{ color: 'red' }}>{errors.ciudad}</div>}
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="pais" required>
                    País
                </FormLabel>
                <Select
                    id="pais"
                    name="pais"
                    value={formData.pais}
                    onChange={handleCountryChange}
                    error={!!errors.pais}
                >
                    {Object.keys(paises).map((pais) => (
                        <MenuItem key={pais} value={pais}>
                            {pais}
                        </MenuItem>
                    ))}
                </Select>
                {errors.pais && <div style={{ color: 'red' }}>{errors.pais}</div>}
            </FormGrid>
        </Grid>
    );
}
