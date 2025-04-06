import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import React from 'react';
import mapboxgl from 'mapbox-gl';

import icon from '@/assets/center.png';

import '@/styles/Map.scss';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const defaultLocation: [number, number] = [-97.7400, 30.2672];
const defaultZoom = 14;

function Map(): React.ReactElement {
    const [center, setCenter] = React.useState<[number, number]>(defaultLocation);
    const [mapInstance, setMapInstance] = React.useState<mapboxgl.Map | null>(null);
    const [userLocation, setUserLocation] = React.useState<[number, number] | null>(null);
    const [userMarker, setUserMarker] = React.useState<mapboxgl.Marker | null>(null);
    const [zoom, setZoom] = React.useState(defaultZoom);

    const handleClick = () => {
        if (mapInstance) {
            mapInstance.flyTo({
                center: userLocation ?? defaultLocation,
                zoom: defaultZoom,
            });
        }
    };

    React.useEffect(() => {
        mapboxgl.accessToken = import.meta.env.PUBLIC_TOKEN;

        const watchId = navigator.geolocation.watchPosition(
            pos => {
                setUserLocation([pos.coords.longitude, pos.coords.latitude]);
            },
            () => {
                setUserLocation(null);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            },
        );

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken!,
            mapboxgl: mapboxgl as any,
            marker: { color: 'orange' } as any,
        });

        const map = new mapboxgl.Map({
            center,
            container: 'map-container',
            zoom,
        });

        geocoder.on('result', e => {
            if (e.result.center.lng) {
                setCenter([e.result.center.lng, e.result.center.lat]);
                setZoom(defaultZoom);
            }
        });

        map.on('move', () => {
            setCenter([map.getCenter().lng, map.getCenter().lat]);
            setZoom(map.getZoom());
        });

        map.addControl(geocoder);
        setMapInstance(map);

        return () => {
            navigator.geolocation.clearWatch(watchId);
            map.remove();
        };
    }, []);

    React.useEffect(() => {
        if (mapInstance && userLocation && !userMarker) {
            const div = document.createElement('div');
            div.className = 'marker';

            const marker = new mapboxgl.Marker(div)
                .setLngLat(userLocation)
                .addTo(mapInstance);

            setUserMarker(marker);
            mapInstance.flyTo({ center: userLocation, zoom: defaultZoom });
        }
    }, [mapInstance, userLocation]);

    return (
        <>
            <div className="map-container" id="map-container" />

            <div className="map-position">
                <p className="map-position__tablet">Latitude: {center[1].toFixed(4)}</p>
                <p className="map-position__tablet">Longitude: {center[0].toFixed(4)}</p>
                <p className="map-position__tablet">Zoom: {zoom.toFixed(2)}</p>

                <p className="map-position__desktop">
                    Latitude: {center[1].toFixed(4)} |
                    Longitude: {center[0].toFixed(4)} |
                    Zoom: {zoom.toFixed(2)}
                </p>
            </div>

            <button
                aria-label="Center map."
                className="map-center"
                type="button"
                onClick={handleClick}
            >
                <img alt="" src={icon.src} />
            </button>
        </>
    );
}

export default Map;
