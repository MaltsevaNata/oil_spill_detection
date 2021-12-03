import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import { MapContainer,SVGOverlay, TileLayer, Circle, Marker, useMapEvents, CircleMarker, Polyline, Polygon, Rectangle, Popup } from 'react-leaflet'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import NavBar from "../Navbar/CustomNavBar";
import homeBackground from '../../static/home_background.png'
import './Home.css'
import spill from '../../static/spill.png'
import { Link } from 'react-router-dom';
import MyVerticallyCenteredModal from '../Login.js'


export default function Home(props) {
    const imageUrl = homeBackground;
    const httpClient = axios.create();
    const [showLogin, setShowLogin] = useState(false);
    const [northEast, setNoarthEast] = useState([]);
    const [southWest, setSouthWest] = useState([]);
    const [toDisplay, setToDisplay] = useState(false);
    const [rectangle, setRectangle] = useState([[0,0], [0,0]]);
    const [radius, setRadius] = useState(0);
    const [circle, setCircle] = useState([0,0]);


    const fillRedOptions = { fillColor: 'red', stroke: 'red', color: 'red' }
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
            let max_left = Math.max.apply(Math, response.data[0][0]);
            let max_right = Math.max.apply(Math, response.data[0][1]);
            let new_arr = [max_left, max_right];
            let absolute_max = Math.abs(response.data[0][1][0] - response.data[0][0][0]);
            setRadius(1);
            let center_x = (response.data[0][1][0] + response.data[0][0][0])/2;
            let center_y = (response.data[0][0][1] + response.data[0][1][1])/2;
            setCircle([center_x, center_y]);
            console.log(center_x);
            console.log(center_y);
            console.log(absolute_max)
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
                    <CircleMarker center={circle} pathOptions={fillRedOptions} radius={20} >
                        <Popup> <img
                            src={spill}
                            width="200px"
                            className="d-inline-block align-top"
                            alt=""
                        />
                        </Popup>
                    </CircleMarker>

                </MapContainer>
                {toDisplay ?
                    <div class="details">
                        Ханты-Мансийский АО
                        <br/>
                        <div style={{fontSize: "15px", fontFamily: "RosatomReg"}}>
                            Координаты разлива: ([{rectangle[0][0].toFixed(2)}, {rectangle[0][1].toFixed(2)}], [{rectangle[1][0].toFixed(2)}, {rectangle[1][1].toFixed(2)}])
                            <br/><br/>
                            Площадь разлива: 45км2
                            <div>
                                <br/>
                                Возможные причины: Нефтепровод по координатам ()
                            </div>
                            <br/>
                            <div className="button-container">
                                <Link to="/report">
                                    <button type="button" class="buttonDetails">Открыть отчет</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    : <> </>}
            </div>

        </div>
    )
}