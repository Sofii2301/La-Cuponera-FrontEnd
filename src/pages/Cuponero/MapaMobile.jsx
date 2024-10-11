import { useState } from 'react';
import MapStores from '../../components/MapStores'
import Cuponeros from '../../components/Cuponero/Cuponeros'

export default function MapaMobile () {
    const [userPosition, setUserPosition] = useState(null);

    return (
        <Cuponeros footer={false}>
            <MapStores setUserPosition={setUserPosition} type='cuponero'/>
        </Cuponeros>
    )
}
