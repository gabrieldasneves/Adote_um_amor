import React from 'react';
import logoImg from "../images/logo.png";
import "../styles/global.css";
import "../styles/pages/petsMap.css";
import dogHead from "../images/dog-head(1).png";
import catHead from "../images/iberian-lynx(1).png";
import {MapContainer,TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function PetsMap() {
    return(
        <div id="page-map">
            <aside>
                <header>
                    <div className="titulo_logo" >
                        <img src={logoImg} alt=""/>
                        <h1>Adote um amor</h1>
                    </div>
                    <h2>Escolha o tipo de pet que você está buscando</h2>
                    
                </header>
                <div className='buttonClass'>
                        <button><img src={dogHead} alt=""/></button>
                        <button><img src={catHead} alt=""/></button>
                </div>
                <footer> 
                    <strong>Fortaleza</strong>
                    <span>CE</span>
                </footer>
            </aside>

           <MapContainer 
           center={[-3.7276223,-38.4896183]}
           zoom={15}
           style={{width: '100%',height: '100%'}}>

                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

           </MapContainer>
        </div>
    );
} 

export default PetsMap;