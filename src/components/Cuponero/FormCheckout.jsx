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
            [name]: name === 'telefono' ? Number(value) : value
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
            <FormGrid item xs={12}>
                <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                <OutlinedInput
                    id="telefono"
                    name="telefono"
                    type="number"
                    placeholder="Celular/WhatsApp"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                />
                {errors.telefono && <div style={{ color: 'red' }}>{errors.telefono}</div>}
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
                    required
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
                    required
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
