import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';
import "./font.css";
import "./preferences.css";


// Styles object

const Preferences = () => {
    const navigate = useNavigate();
    const [warning, setWarning] = useState(true);

    // Define all preferences questions and their options
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
            multiSelect: false,
            stateKey: 'cookingGoals',
        },
        {
            title: 'To save your preferences, please make an account with us.',
            options: [],
            multiSelect: false,
            stateKey: 'savePreferences',
        },
    ];

    // State to track current question index
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // State to hold user preferences
    const [preferences, setPreferences] = useState({
        favoriteCuisines: [],
        foodAllergies: [],
        diets: [],
        excludedIngredients: [],
        cookingSkills: '',
        cookingGoals: '',
    });

    // Function to handle option selection
    const handleOptionSelect = (option) => {
        const currentKey = questions[currentQuestion].stateKey;
        const isSelected = preferences[currentKey].includes(option);

        if (questions[currentQuestion].multiSelect) {
            if (isSelected) {
                setPreferences({
                    ...preferences,
                    [currentKey]: preferences[currentKey].filter(item => item !== option),
                });
            } else {
                setPreferences({
                    ...preferences,
                    [currentKey]: [...preferences[currentKey], option],
                });
            }
        } else {
            setPreferences({
                ...preferences,
                [currentKey]: option,
            });
        }
    };

    // Function to handle next question
    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    // Function to handle previous question
    const handleBack = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    // Function to handle finishing preferences setup
    const handleFinish = () => {
        // Save preferences to database (or perform any final action)
        navigate('/login'); // Redirect to login or dashboard
    };

    return (
        <div className="container">
            <h3 className="heading">PERSONALIZE YOUR EXPERIENCE</h3>

            <div className="question">
                <h2 className="subHeading">{questions[currentQuestion].title}</h2>
                <div className="optionLabelContainer">
                    {questions[currentQuestion].options.map((option, index) => (
                        <label
                            key={index}
                            className={'circle'}
                            style={{ cursor: 'pointer', borderColor: preferences[questions[currentQuestion].stateKey].includes(option) ? '#4CAF50' : '' }}
                        >
                            <input
                                type={questions[currentQuestion].multiSelect ? 'checkbox' : 'radio'}
                                name={questions[currentQuestion].stateKey}
                                value={option}
                                checked={preferences[questions[currentQuestion].stateKey].includes(option)}
                                onChange={() => handleOptionSelect(option)}
                                className="input"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: currentQuestion === 0 ? 'flex-end' : 'space-between' }}>
                {currentQuestion > 0 && (
                    <button onClick={handleBack} className="button">Back</button>
                )}
                {currentQuestion < questions.length - 1 ? (
                    <button onClick={handleNext} className="button">Next</button>
                ) : (
                    <button onClick={handleFinish} className="button">Finish</button>
                )}
            </div>
        </div>
    );
};

export default Preferences;
