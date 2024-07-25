import { createContext, useEffect, useState } from "react";
import run from "../config/gemini";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./authContext";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [userConversation, setUserConversation] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [responseHistory, setResponseHistory] = useState([]);
    const email = useAuth().currentUser?.email;

    const fetchPreferences = async (email) => {
        try {
          const encodedEmail = encodeURIComponent(email);
          const response = await fetch(`/record/${encodedEmail}`);
      
          if (!response.ok) {
            throw new Error("Failed to fetch preferences");
          }
      
          const rawText = await response.text();
          const data = JSON.parse(rawText);
          
          setPreferences(data);
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      };

    useEffect(() => {
        fetchPreferences(email);
    }, []);


    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {        
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setUserConversation((prev) => [...prev, input]);
        setRecentPrompt(input);
        // Convert preferences to a string
        const preferencesString = JSON.stringify(preferences, null, 2);

        // Create the complete prompt
        const userPrompt = `
        keep the user's chat history into account before answering - conversationHistory = [${userConversation.join(', ')}].  
        Before answering questions, keep these user food preferences in mind - ${preferencesString}.
        `;

        // Run the function with the constructed prompt
        const response = await run('USER INPUT - \n' + input + "\n\n" + 'INSTRUCTIONS BEFORE ANSWERING - \n' + userPrompt);
        console.log('USER INPUT - \n' + input + "\n\n" + 'INSTRUCTIONS BEFORE ANSWERING - \n' + userPrompt);

        setUserConversation((prev) => [...prev, response]);
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b style='font-weight: 600'>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        setResponseHistory((prev) => [...prev, response]);
        let newResponseArray = newResponse2.split(" ");

        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false)
        setInput("")
    }


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        userConversation,
        preferences,
        fetchPreferences
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;