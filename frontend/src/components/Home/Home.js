import React, {useContext, useEffect, useState} from 'react';
import NavBar from "../Navbar/CustomNavBar";
import homeBackground from '../../static/home_background.png'
import './Home.css'

export default function Home(props) {
    const imageUrl = homeBackground;

    return (
        <div className="background" style={{backgroundImage: `url(${imageUrl})` }} >
            <NavBar> </NavBar>
            <div class="brand-name">
                РОС
                <div class="brand-name-light"> АТОМ </div>
            </div>
        </div>
    )
}