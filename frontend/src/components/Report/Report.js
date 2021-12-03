import NavBar from "../Navbar/CustomNavBar";
import React, {useState} from "react";
import homeBackground from "../../static/report_background.png";
import { Printer, Envelope, Save } from 'react-bootstrap-icons';
import { print } from 'react-pdf-print'
import "./Report.css"
import circle from "../../static/circle.png"
import triangle from "../../static/triangle.png"
import spill from "../../static/spill.png";

export default function Report(props) {
    const imageUrl = homeBackground;
    const [report, setReport] = useState(["Координаты нефтеразлива: 123.12.45",
        "Площадь разлива: 45км2",
        "Оценка экологического ущерба: 60 из 100 (распространение на воде)",
        "Причины возможного нефтеразлива: аввария на нефтепроводе",
        "Время появления: 02.12.2021, 21:00"]);

    return (
        <div className="background-report" style={{backgroundImage: `url(${imageUrl})` }} >
            <NavBar> </NavBar>
            <div style={{top: "10%", marginLeft: "2%"}}>
                <Envelope class="icon"/>
                <Printer class="icon"/>

                <Save class="icon"/>
            </div>
            <div class="title">
                <img style={{marginRight: "2%", marginLeft: "5%"}}
                     src={circle}
                     width="20px"
                     className="d-inline-block "
                     alt=""
                />
                Ханты-Мансийский АО
                <img style={{marginRight: "5%", marginLeft: "2%"}}
                     src={triangle}
                     width="20px"
                     className="d-inline-block "
                     alt=""
                />

                <div class="report">
                    <ul>
                        <li> <div class="parameter"> Координаты нефтеразлива: </div> [60.84837464970738, 68.58131469923769]</li>
                        <li>
                            <div className="parameter">Площадь разлива:  </div>45км2</li>
                        <li>
                            <div className="parameter">Оценка экологического ущерба: </div> 60 из 100</li>
                        <li>
                            <div className="parameter">Причины возможного нефтеразлива: </div> авария на нефтепроводе</li>
                        <li>
                            <div className="parameter">Координаты нефтепровода: </div></li>
                        <li>
                            <div className="parameter">Время появления:  </div> 02.12.2021, 21:00</li>
                    </ul>
                    <figure>
                        <img style={{marginLeft: "5%"}}
                            src={spill}
                            width="408px"
                            height="258px"
                            className="d-inline-block align-top"
                            alt=""
                        />
                        <figcaption class="figcapt"><a href={spill} download class="download">Скачать исходное изображение</a></figcaption>
                    </figure>
                </div>

            </div>

        </div>
    )
}