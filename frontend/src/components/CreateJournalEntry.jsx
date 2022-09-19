import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import useAuth from "../hooks/useAuth";
import {fetchPostAuth} from "../config/api";

const currentDate = new Date();

const CreateJournalEntry = () => {
    const [user, setUser] = useAuth();
    const [weather, setWeather] = useState("");
    const [submitState, setSubmitState] = useState(false);
    const [inputs, setInputs] = useState({
        "mood": "",
        "title": "",
        "content": "",
        "description": "",
        "weather": "",
    });
    
    useEffect(() => {
        const getCurrentWeather = async () => {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.user_city}&appid=7153eddf8673183aab1b3ea688313beb`);
            setWeather(response.data.weather[0].description);
            setInputs({...inputs, weather: response.data.weather[0].description});
            return response.data;
        }
        getCurrentWeather();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitState("SUBMITTING")
        if (inputs["mood"] === "" || inputs["title"] === "" || inputs["description"] === "" || inputs["content"] === "") {
            toast.error("Please fill out all fields")
            setSubmitState(false)
            return
        }

        try{
            const response = await fetchPostAuth('/journal/', inputs)
            setSubmitState("SUCCESS")
            toast.success("Journal entry created successfully!")
            setTimeout(()=>{
                window.location.reload()
            }, 2000)
        }catch(error){
            toast.error("Error creating journal entry")
        }
    }

    return (
        <div>
            {submitState ?
                submitState === "SUBMITTING" ?
                <div>
                    <p>Submitting...</p>
                </div> :
                <div>
                    <p>Journal Entry Submitted</p>
                </div> :
                <div>
                <h3>New Journal Entry</h3>
                <p>Date: {`${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`}</p>
                <p>My current weather in {user.user_city} is: {weather}</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Title: </label>
                        <input 
                            type="text" 
                            name="title"
                            onChange={(e) => setInputs({...inputs, title: e.target.value})}
                            value={inputs["title"]}
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input 
                            type="text" 
                            name="description"
                            onChange={(e) => setInputs({...inputs, description: e.target.value})}
                            value={inputs.description || ""}
                        />
                    </div>
                    <div>
                        <label>Content: </label>
                        <textarea
                            name="content"
                            onChange={(e) => setInputs({...inputs, content: e.target.value})}
                            value={inputs["content"] || ""}
                        />
                    </div>
                    <div>
                        <label>Current Mood: </label>
                        <select name="current_mood" onChange={(e) => setInputs({...inputs, mood:e.target.value})} value={inputs["mood"]}>
                            <option value="">Choose Your Mood</option>
                            <option value="GOOD">😄</option>
                            <option value="BAD">😞</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
            }
            <ToastContainer/>
        </div>
    )
}

export default CreateJournalEntry;