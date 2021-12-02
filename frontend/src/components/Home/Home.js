import React, {useContext, useEffect, useState} from 'react';

import { MapContainer, TileLayer, Circle, Marker, CircleMarker, Polyline, Polygon, Rectangle, Popup } from 'react-leaflet'

import NavBar from "../Navbar/CustomNavBar";
import homeBackground from '../../static/home_background.png'
import './Home.css'

export default function Home(props) {
    const imageUrl = homeBackground;

    function handleScroll() {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    }

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
            <MapContainer style={{height : '400px', width: "60vw",
                position: "relative",
                marginTop: "100vh", marginLeft: "5%"}} center={[60.03, 31.45]} zoom={8} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    )
}