import { useTranslation } from 'react-i18next';
const { t } = useTranslation();

export interface CategoryOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const categoriesOptions: readonly CategoryOption[] = [
  { value: "parati", label: t('for_you'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/parati.png"*/ },
  { value: "paratubienestar", label: t('for_your_wellbeing'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratubienestar.png"*/ },
  { value: "paratuhogar", label: t('for_your_home'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratubienestar.png"*/ },
  { value: "paradisfrutar", label: t('to_enjoy'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paradisfrutar.png"*/ },
  { value: "paratumente", label: t('for_your_mind'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratumente.png"*/ },
  { value: "paraquienamas", label: t('for_who_you_love'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paraquienamas.png"*/ },
  { value: "paratumesa", label: t('for_your_table'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratumesa.png"*/ },
  { value: "paratupaladar", label: t('for_your_palate'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/paratupaladar.png"*/ },
  { value: "paralospeludos", label: t('pets'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/peludos.png"*/ },
  { value: "tecnologia", label: t('technology'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/tecnologia.png"*/ },
  { value: "servicos", label: t('services'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/serviciosprofesionales.png"*/ },
  { value: "inmobiliaria", label: t('real_estate'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/inmobiliaria.png"*/ },
  { value: "gobernantes", label: t('rulers'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/gobernantes.png"*/ },
  { value: "reciclaygana", label: t('recycle_and_earn'), color: '#00B8D9', isFixed: true/*, icon: "../assets/categorias/reciclaygana.png"*/ },
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