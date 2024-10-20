import { Outlet } from 'react-router-dom';
import { CuponeroProvider } from './CuponeroContext';
import Cuponeros from "../components/Cuponero/Cuponeros";

export const CuponeroLayout = ({footer = true}) => {
    return (
        <CuponeroProvider>
            <Cuponeros footer={footer}>
                <Outlet />
            </Cuponeros>
        </CuponeroProvider>
    );
};