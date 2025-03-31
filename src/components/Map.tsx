import React from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@/styles/components/Map.scss';

function Map(): React.ReactElement {
    const [center, setCenter] = React.useState<[number, number]>([-97.7041, 30.3985]);
    const [zoom, setZoom] = React.useState(13);

    const mapContainerRef = React.useRef(null);
    const mapRef = React.useRef<mapboxgl.Map>(null);

    React.useEffect(() => {
        mapboxgl.accessToken = import.meta.env.PUBLIC_TOKEN;

        mapRef.current = new mapboxgl.Map({
            center,
            container: mapContainerRef.current as unknown as HTMLElement,
            zoom,
        });

        mapRef.current.on('move', () => {
            if (mapRef.current) {
                const mapCenter = mapRef.current.getCenter();
                const mapZoom = mapRef.current.getZoom();
                setCenter([mapCenter.lng, mapCenter.lat]);
                setZoom(mapZoom);
            }
        });

        return () => {
            mapRef.current?.remove();
        };
    }, []);

    function handleClick(): void {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [-97.7041, 30.3985],
                zoom: 13,
            });
        }
    }

    return (
        <>
            <div ref={mapContainerRef} className="map-container" />

            <div className="map-position-bar">
                Latitude: {center[1].toFixed(4)}
                | Longitude: {center[0].toFixed(4)}
                | Zoom: {zoom.toFixed(2)}
            </div>

            <button className="map-reset-button" type="button" onClick={() => handleClick}>
                Reset
            </button>
        </>
    );
}

export default Map;
