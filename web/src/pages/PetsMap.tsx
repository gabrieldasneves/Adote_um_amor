import React from 'react';
import logoImg from "../images/logo.png";
import "../styles/global.css";
import "../styles/pages/petsMap.css";
import dogHead from "../images/dog-head(1).png";
import catHead from "../images/iberian-lynx(1).png";
import {Map,TileLayer,Marker,Popup} from "react-leaflet";
import Leaflet from 'leaflet';
import dogMarker from '../images/dogMarker.svg';
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import api from '../services/api';
import "../styles/pages/petsMap.css";

const mapIcon = Leaflet.icon({
    iconUrl: dogMarker,
    iconSize: [58,68],
    iconAnchor:[29,68],

});

interface pet {
    id: number;
    latitude: number;
    longitude: number;
    name:string;
    catdog:string;
}

function PetsMap() {

    const [pets,setPets] = useState<pet[]>([]);

    useEffect(() => {
        api.get('/pets').then(response => {
            setPets(response.data);
        })
    }, []);

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

           <Map 
           center={[-3.7276223,-38.4896183]}
           zoom={15}
           style={{width: '100%',height: '100%'}}>

                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {pets.map(pet => {
                    return (
                        <Marker position={[pet.latitude,pet.longitude]} icon={mapIcon} key={pet.id}>
                        
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                                {pet.name}
                                <Link to={`/pets/${pet.id}`} href="">
                                    <FiArrowRight size={20} color='#fff ' />
                                </Link>
                            </Popup>
                        
                        </Marker>
                    )
                })}
           </Map>
        </div>
    );
} 

export default PetsMap;