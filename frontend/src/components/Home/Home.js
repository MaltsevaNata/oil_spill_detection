import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { MapContainer, TileLayer, Circle, Marker, useMapEvents, CircleMarker, Polyline, Polygon, Rectangle, Popup } from 'react-leaflet'

import NavBar from "../Navbar/CustomNavBar";
import homeBackground from '../../static/home_background.png'
import './Home.css'

export default function Home(props) {
    const imageUrl = homeBackground;
    const httpClient = axios.create();
    const [showLogin, setShowLogin] = useState(false);
    const [northEast, setNoarthEast] = useState([]);
    const [southWest, setSouthWest] = useState([]);
    const [toDisplay, setToDisplay] = useState(false);
    const [rectangle, setRectangle] = useState([[0,0], [0,0]]);
    const redOptions = { color: 'red' }
    function handleScroll() {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    }

    function makeACall(bounds, zoom, zoomThreshold = 8) {
        console.log(bounds);
        setNoarthEast(bounds._northEast);
        setSouthWest(bounds._southWest);
        httpClient.post("http://127.0.0.1:8000/api/bbox", {"north_east": bounds._northEast, "south_west": bounds._southWest},{
        }).then(response => {
            console.log(response);
            setRectangle([
                    response.data[0][0],
                    response.data[0][1],
                ]
            )
            setToDisplay(true);
        })
    }

    const MapEvents = () => {
        const map = useMapEvents({
            moveend: () => makeACall(map.getBounds(), map.getZoom()),
            zoomend: () => makeACall(map.getBounds(), map.getZoom())
        });
        return null;
    };



    /*useEffect(() => {
        httpClient.post("http://127.0.0.1:8000/api/bbox", {"north_east": northEast, "south_west": southWest},{
        }).then(response => {
            console.log(response);
        })
    }, [])*/

    return (
        <div className="background" style={{backgroundImage: `url(${imageUrl})` }} >
            <NavBar> </NavBar>
            <div class="brand-name">
                РОС
                <div class="brand-name-light"> АТОМ </div>
            </div>
            <div class="description">
                Система онлайн-мониторинга
                нефтеразливов
            </div>
            <div class="button-container">
                <button type="button" class="scroll-button" onClick={handleScroll}>мониторинг</button>
            </div>
            <div style={{display: "inline"}}>
            <MapContainer style={{height : '400px', width: "60vw",
                position: "relative",
                marginTop: "100vh", marginLeft: "5%"}} center={[61.00368, 69.01836]} zoom={8} scrollWheelZoom={false}>
                <MapEvents />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Rectangle bounds={rectangle} pathOptions={redOptions} />
            </MapContainer>
                {toDisplay ?
                <div class="details">

                Ханты-Мансийский АО
                    <div style={{fontSize: "15px"}}>
                    Координаты разлива: ([{rectangle[0][0].toFixed(2)}, {rectangle[0][1].toFixed(2)}], [{rectangle[1][0].toFixed(2)}, {rectangle[1][1].toFixed(2)}])
                    Площадь разлива: 45м2
                        <div>
                    Возможные причины: Нефтепровод по координатам ()
                        </div>
                        <div className="button-container">
                            <button type="button" class="buttonDetails">Подробнее</button>
                        </div>
                    </div>
                </div>
                    : <> </>}
            </div>
        </div>
    )
}