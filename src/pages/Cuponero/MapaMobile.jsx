import { useState } from 'react';
import MapStores from '../../components/MapStores'

export default function MapaMobile () {
    const [userPosition, setUserPosition] = useState(null);

    return (
        <MapStores setUserPosition={setUserPosition} type='cuponero'/>
    )
}
