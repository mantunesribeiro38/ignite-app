import axios from 'axios';
import { gameDetailsURL, gameScreeShotURL } from '../api';

export const loadDetail = (id, listGames) => (dispatch)=>{
    
    const detailData = gameDetailsURL(id, listGames) ; 
    
    dispatch({
        type: 'LOADING_DETAIL',
    });

    dispatch({
        type: 'GET_DETAIL',
        payload: {
            game: detailData[0]
        }
    });
}
