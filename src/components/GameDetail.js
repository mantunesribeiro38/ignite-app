import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { smallImage } from '../utills';

import playstation from '../img/playstation.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
import nintendo from '../img/nintendo.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import starEmpty from '../img/star-empty.png';
import starFull from '../img/star-full.png';

export default function GameDetail({pathId}) {

    const { game, isLoading } = useSelector(state=>state.detail);
    const { short_screenshots } = game;
    const dispatch = useDispatch();
    const history = useHistory();



    const BackToHome = (e) =>{
        const element = e.target;
        
        if(element.classList.contains('shadow')){
            document.body.style.overflow = 'auto';
            history.push('/');

            dispatch({
                type: 'LOADING_DETAIL',
            });
        }
    }

    const getPlataform = (plataform) => {
        switch(plataform){
            case 'PlayStation 4':
                return playstation;
           case 'Xbox One':
                    return xbox;
           case 'PC':
                return steam;              
            case 'Nitendo Switch':
                return nintendo;
            case 'IOS':
                return apple;
            default:
                return gamepad;        
        }
    };

    const getStars= (plataform) => {
       const stars = [];
       const rating = Math.floor(game.rating);

        for(let i=1; i<=5; i++){
            if(i <= rating){
                stars.push(<img alt="start" key={i} src={starFull}></img>);
            }else{
                stars.push(<img alt="start" key={i} src={starEmpty}></img>);
            }
        }

        return stars
    };

    return (
       <>    {!isLoading && (
                <CardShadow className="shadow" onClick={BackToHome} >
                        <Details layoutId={pathId}>
                            <Stats>
                                <div className="rating">
                                    <h3 layoutId={`title ${pathId}`} >{game.name}</h3>
                                    <p>Rating:{game.rating}</p>
                                    {getStars(game.rating)}
                                </div>

                                <div className="info">
                                    <h3>Platforms</h3>
                                    <Platafoms>
                                        {game?.platforms && game?.platforms.map(data=>(
                                            <img 
                                                alt={data.platform.name}
                                                key={data.platform.id} 
                                                src={getPlataform(data.platform.name)} 
                                            />
                                        ))}
                                    </Platafoms>
                                </div>
                            </Stats>
                            <Media>
                                <motion.img layoutId={`image ${pathId}`} src={smallImage(game.background_image, 1280)} alt="image" />
                            </Media>
                            <Description>
                                <p>Teste</p>
                            </Description>
                            <div className="gallery">
                                {short_screenshots && short_screenshots.map(screen=>(
                                    <motion.img layoutId={`image ${pathId}`}  key={screen.id} src={smallImage(game.background_image, 1280)} alt="game" />
                                ))}
                            </div>                 
                        </Details>
                </CardShadow>
            )}
        
       </>                 
    )
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Details = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platafoms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;