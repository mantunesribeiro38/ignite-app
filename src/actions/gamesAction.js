import axios from 'axios';
import { popularGamesURL, upcomingGamesURL, newGamesURL, searchGameURL } from '../api';


//ACTION CREATOR
export const loadGames = () => async(dispatch) => {
    //FETCH AXIOS
    const popularData = await axios.get(popularGamesURL());
    const newGamesData = await axios.get(newGamesURL());
    const upcomingGamesData = await axios.get(upcomingGamesURL());
    
    dispatch({
        type: 'FETCH_GAMES',
        payload:{
            popular: popularData.data.results,
            newGames: newGamesData.data.results,
            upcoming: upcomingGamesData.data.results
        }
    })
}

export const fetchSearch = (game_name) => async(dispatch)=>{
    const searchGames = await axios.get(searchGameURL(game_name));

    dispatch({
        type: 'FETCH_SEARCHED',
        payload:{
            searched: searchGames.data.results
        }
    })
}


/*
Usando axios sem asynca, é necessário usar o then.
Com a sintaxe async na arrow function não é preciso 
adicionar then
export const loadGames = () => (dispatch) => {

    const popularData = axios.get(popularData()).then(data=>{
        return data;
    });
}*/