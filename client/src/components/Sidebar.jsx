import React, { useContext, useEffect, useState } from "react";
import './sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faCloud, faCloudArrowDown, faCloudUploadAlt, faCross, faGear, faHistory, faMessage, faPlus, faQuestion, faQuestionCircle, faTimesSquare } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../contexts/geminiContext";
import Select from "react-select";
import { useAuth } from "../contexts/authContext";

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts, setRecentPrompt, newChat, preferences, fetchPreferences} = useContext(Context);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const email = useAuth().currentUser.email;


    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const handleChange = (selectedOption, questionKey) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionKey]: selectedOption
        }));
    };


    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

    const handleSave = async () => {
        setIsLoading(true);
    
        const updatedPreferences = {};
    
        questions.forEach((question) => {
            const selected = selectedOptions[question.stateKey];
            if (selected) {
                updatedPreferences[question.stateKey] = question.multiSelect
                    ? selected.map(option => option.value)
                    : selected.value;
            }
        });
    
        try {
            const encodedEmail = encodeURIComponent(email);
            const response = await fetch(`/record/${encodedEmail}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPreferences),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Preferences updated successfully');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        await fetchPreferences(email);
        setIsLoading(false);
        toggleSettings();
    };

    useEffect(() => {
        if (preferences) {
            const formattedPreferences = {};
    
            questions.forEach((question) => {
                const pref = preferences[question.stateKey];
                if (pref) {
                    formattedPreferences[question.stateKey] = question.multiSelect
                        ? Array.isArray(pref) ? pref.map(option => ({ value: option, label: option })) : []
                        : { value: pref, label: pref };
                }
            });
    
            setSelectedOptions(formattedPreferences);
 
        console.log(preferences);
        console.log(email);
    }}, [fetchPreferences]);

    const questions = [
    {
      title: 'What are your favorite cuisines?',
      options: ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'Greek', 'French'],
      multiSelect: true,
      stateKey: 'favoriteCuisines',
    },
    {
      title: 'Do you have any food allergies?',
      options: ['Wheat-Free', 'Dairy-Free', 'Peanut-Free', 'Tree Nut-Free', 'Sulfite-Free', 'Soy-Free', 'Sesame-Free', 'Seafood-Free', 'Egg-Free', 'Gluten-Free'],
      multiSelect: true,
      stateKey: 'foodAllergies',
    },
    {
      title: 'Do you follow any of these diets?',
      options: ['Vegetarian', 'Low FODMAP', 'Vegetarian (no dairy)', 'Vegan', 'Paleo', 'Pescetarian', 'Ketogenic'],
      multiSelect: true,
      stateKey: 'diets',
    },
    {
      title: 'Any ingredients you don\'t want to see in your recommended recipes?',
      options: ['Alcohol', 'Avocado', 'Bacon', 'Bananas', 'Beef', 'Brussels Sprouts', 'Cilantro', 'Coconut', 'Eggplant', 'Fish', 'Mayonnaise', 'Mushrooms', 'Olives', 'Onions', 'Pork', 'Potatoes', 'Seafood', 'Shrimp', 'Sugar', 'Tomatoes'],
      multiSelect: true,
      stateKey: 'excludedIngredients',
    },
    {
      title: 'How would you describe your cooking skills?',
      options: ['Beginner', 'Intermediate', 'Advanced'],
      multiSelect: false,
      stateKey: 'cookingSkills',
    },
    {
      title: 'What are your cooking goals?',
      options: ['Save Time', 'Save Money', 'Eat to gain', 'Eat to lose'],
      multiSelect: true,
      stateKey: 'cookingGoals',
    },
  ];

  

    return (
        <div className="sidebar">
            <div className="top">
                <FontAwesomeIcon className="icon menu" icon={faBars} size="2x" onClick={() => setExtended(prev=>!prev)} />
                <div onClick={() => newChat()} className="new-chat">
                    <FontAwesomeIcon className="icon" icon={faPlus} size="2x" />
                    {extended?<p>New Chat</p>:null}
                </div>
                {extended?
                <div className="recent">
                    {/* <p className="recent-title">Recent</p>
                    {prevPrompts.map((item,index)=>{
                        return (
                            <div onClick={() => loadPrompt(item)} className="recent-entry">
                                <FontAwesomeIcon className="icon" icon={faMessage} border='true' style={{color:'gray'}} size="2x" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                        )
                    })}
                     */}
                </div>
                :null}

            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry" onClick={() => toggleSettings()}>
                    <FontAwesomeIcon className="icon" icon={faGear} size="2x" />
                    {extended?<p>Settings</p>:null}
                </div>
            </div>
            {isSettingsOpen && (
                <div className="settings-popup-overlay">
                    <div className="settings-header">
                        <h5>Choose your preferences</h5>
                        <FontAwesomeIcon className="icon close" icon={faClose} size="2x" onClick={toggleSettings} />
                    </div>
                    {questions.map((question) => (
                        <div key={question.stateKey} className="select-container">
                            <h6>{question.title}</h6>
                            <Select
                                options={question.options.map(option => ({ value: option, label: option }))}
                                value={selectedOptions[question.stateKey] || (question.multiSelect ? [] : null)}
                                onChange={(selectedOption) => handleChange(selectedOption, question.stateKey)}
                                isMulti={question.multiSelect}
                                className="select-dropdown"
                            />
                        </div>
                    ))}
                    <div className="save-button-container">
                        <button className="save-button" onClick={handleSave}>Save</button>
                    </div>
                    {isLoading && <div className="loader-overlay">Saving...</div>}
                </div>
            )}
        </div>
    )
}

export default Sidebar;