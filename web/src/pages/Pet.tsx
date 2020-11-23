import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import {useParams}  from "react-router-dom";
import mapMarkerImg  from '../images/dogMarker.svg';
import '../styles/pages/pet.css';
import api from "../services/api";


const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Pets {
  catdog:string;
  latitude: number;
  longitude: number;
  name:string;
  instructions: string;
  about:string;
  opening_hours: string;
  open_on_weekends: string;
  images:{
    url:string;
    id:number;
  }[];
}

interface PetParams {
  id: string;

}

export default function Pet() {
  const [pet,setPet] = useState<Pets>();
  const params = useParams<PetParams>();
  const [activeImageIndex, setActiveImageIndex] = useState(0); 

  useEffect(() => {
      api.get(`/pets/${params.id}`).then(response => {
          setPet(response.data);
      })
  }, [params.id]);


  if(!pet){
    return <p>Carregando...</p>
  }


  return (
    <div id="page-pet">
  

      <main>
        <div className="pet-details">
          <img src={pet?.images[activeImageIndex].url} alt={pet.name} />

          <div className="images">
            {pet.images.map((image,index) => {
              return (
              <button 
              key={image.id} 
              className={ activeImageIndex === index ? "active" : ''} 
              type="button"
              onClick={() => {
                  setActiveImageIndex(index);
              }}>
                <img src={image.url} alt={pet.name} />
              </button>)
            })}
          </div>
          
          <div className="pet-details-content">
            <h1>{pet?.name}</h1>
            <p>{pet.about}</p>
            <p>{pet.catdog}</p>

            <div className="map-container">
              <Map 
                center={[pet.latitude,pet.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker interactive={false} icon={happyMapIcon} position={[pet.latitude,pet.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${pet.latitude},${pet.longitude}`}>Ver no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <h3>{pet.instructions}</h3>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {pet.opening_hours}
              </div>
              {pet.open_on_weekends ? 
                  (<div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>)
                  :
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#ff669d" />
                    Não atendemos <br />
                    fim de semana
                  </div>
              }
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
}