import React from 'react'
import Select from 'react-select'

export interface CategoryOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const categoriesOptions: readonly CategoryOption[] = [
  { value: 'parati', label: 'Para ti', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/parati.png"*/ },
  { value: 'peludos', label: 'Para los peludos', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/peludos.png"*/  },
  { value: 'paradisfrutar', label: 'Para disfrutar', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paradisfrutar.png"*/ },
  { value: 'paratupaladar', label: 'Para tu paladar', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratupaladar.png"*/ },
  { value: 'paradisfrutar', label: 'Para quien amas', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paraquienamas.png"*/ },
  { value: 'paratuhogar', label: 'Para tu hogar', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratuhogar.png"*/ },
  { value: 'paratubienestar', label: 'Para tu bienestar', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratubienestar.png"*/ },
  { value: 'paratumente', label: 'Para tu mente', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratumente.png"*/ },
  { value: 'inmobiliaria', label: 'Inmobiliaria & Automotriz', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/inmobiliaria.png"*/ },
  { value: 'tecnologia', label: 'Tecnología', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/tecnologia.png"*/ },
  { value: 'paratumesa', label: 'Para tu mesa', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratumesa.png"*/ },
  { value: 'gobernantes', label: 'Para los gobernantes', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/gobernantes.png"*/ },
  { value: 'serviciosprofesionales', label: 'Servicios Profesionales', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/serviciosprofesionales.png"*/ },
  { value: 'reciclaygana', label: 'Reciclá & Ganá', color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/reciclaygana.png" */}
]

/*import parati from "../../assets/categorias/parati.png";
import peludos from "../../assets/categorias/peludos.png";
import disfrutar from "../../assets/categorias/paradisfrutar.png";
import paladar from "../../assets/categorias/paratupaladar.png";
import quienamas from "../../assets/categorias/paraquienamas.png";
import hogar from "../../assets/categorias/paratuhogar.png";
import bienestar from "../../assets/categorias/paratubienestar.png";
import mente from "../../assets/categorias/paratumente.png";
import inmobiliariayautomotriz from "../../assets/categorias/inmobiliaria.png";
import tecnologia from "../../assets/categorias/tecnologia.png";
import mesa from "../../assets/categorias/paratumesa.png";
import gobernantes from "../../assets/categorias/gobernantes.png";
import serviciosprofesionales from "../../assets/categorias/serviciosprofesionales.png";
import reciclaygana from "../../assets/categorias/reciclaygana.png";*/