import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const [region, setReion] = useState("");
  const API_KEY = "RGAPI-61d01e57-ffb3-4c2a-b18f-728b9bab6498";

  function searchForPlayer(event) {
    var APICallString = "https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
    axios.get(APICallString).then(function (response) {
      setPlayerData(response.data)
    }).catch(function (error) {
      console.log(error)
    });
  }

  return (
    <div className="App">
      <div className="container">

        <h5>Encuentra el jugador de LAS</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForPlayer(e)}> Buscar jugador</button>
      </div>

      {JSON.stringify(playerData) != '{}' ?
        <>
          <p>{playerData.name}</p>
          <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/" + playerData.profileIconId + ".png"} />
          <p>Nivel de Invocador: {playerData.summonerLevel}</p>
        </>
        :
        <><p>No se a encontrado el jugador</p></>
      }
    </div>
  );
}

export default App;
