import React, { useContext, useState } from 'react';
import './homemain.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../contexts/geminiContext';
import image from '../assets/images/logo.png';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from "../firebase/auth";
import profileImage from '../assets/images/default-profile.jpg';

export const HomeMain = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input, userConversation } = useContext(Context);
    const [openProfile, setOpenProfile] = useState(false);
    const { currentUser, logout } = useAuth();

  return (
    <div className='main'>
        <div className='nav'>
            <a href='/home'><img alt="Logo" className="h-10 inline" src={image} style={{width: 40, height: 'auto'}}></img></a>
            <p>RecipeAI</p>
            <img 
                src={currentUser.photoURL || profileImage} 
                alt="Profile" 
                className="profile-image" 
                style={{ width: 30, height: 30, borderRadius: '50%', cursor: 'pointer' }} 
                onClick={() => setOpenProfile((prev) => !prev)}
            />
            {openProfile && <div className='flex flex-col dropdownProfile'>
                <ul className='flex flex-col gap-4'>
                    <li style={{cursor: 'pointer'}} onClick={logout}>Logout</li>
                </ul>
            </div>
            }

        </div>
        <div className='main-container'>

            {!showResult
            ?<>
                <div className='greet'>
                    <p><span>Hello,</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className='cards'>
                    <div className='card' onClick={() => setInput('Suggest something very spicy')}>
                        <p>Suggest something very spicy</p>
                        {/* <span><FontAwesomeIcon icon={faCompass} size='1x' /></span> */}
                    </div>
                    <div className='card' onClick={() => setInput("I'm extremely hungry. Give me recipes to never feel hungry again!!")}>
                        <p>I'm extremely hungry. Give me recipes to never feel hungry again!!</p>
                        {/* <span><FontAwesomeIcon icon={faLightbulb} size='1x' /></span> */}
                    </div>
                    <div className='card' onClick={() => setInput("Need a late night snack")}>
                        <p>Need a late night snack</p>
                        {/* <span><FontAwesomeIcon icon={faMessage} size='1x' /></span> */}
                    </div>
                    <div className='card' onClick={() => setInput("Heading to the gym soon. Need protein!!")}>
                        <p>Heading to the gym soon. Need protein!!</p>
                        {/* <span><FontAwesomeIcon icon={faCode} size='1x' /></span> */}
                    </div>
                </div>
            </>
            :<div className='result'>
                <div className='result-title'>
                    <img 
                        src={currentUser.photoURL || profileImage} 
                        alt="Profile" 
                        className="profile-image" 
                        style={{ width: 30, height: 30, borderRadius: '50%', cursor: 'pointer' }} 
                    />
                    <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    <img alt="Logo" className="h-10 inline" src={image} style={{minWidth: 30, maxWidth: 30, height: 'auto'}}></img>
                    {loading
                    ?<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html: resultData}}></p>
                    }
                    
                </div>
            </div>
            }

            

            <div className='main-bottom'>
                <div className='search-box'>
                    <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here' />
                    <div>
                        {input?<span><FontAwesomeIcon onClick={() => onSent()} icon={faArrowCircleUp} size='2x' /></span>:null}
                    </div>
                </div>
                <p className='bottom-info'>
                    This AI may display iccacurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    </div>
)
}
