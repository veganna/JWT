import {useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { fetchGetAuth } from "../../config/api";

const TherapistDashboard = () => {
    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        const getUserJournals = async () => {
            try{
                const response = await fetchGetAuth('/therapist/dashboard/', {});
                console.log(response.data.clients);
                setClientsData(response.data.clients);
            }catch(error){
                console.error(error)
                toast.error("Error fetching Clients entries")
            }
        }

        getUserJournals();
    }, [])

    const renderJournals = (entries) => {
        return entries?entries.map(entry => {
            return (
                <div key={`entry-${entry.title}`}>
                    <p>Title: {entry.title}</p>
                    <p>Description: {entry.description}</p>
                    <pre>Content: {entry.content}</pre>
                    <p>My Current Weather: {entry.weather}</p>
                    <p>Mood: {entry.mood=="GOOD"?"😄":"😞"}</p>
                </div>
            )
        }) : <p>No entries found</p>
    }

    const renderClients = (clients) => {
        return clients.map((client) => {
            return (
                <div key={`client-${client.id}`}>
                    <p>Client: {client.first_name} {client.last_name}</p>
                    <p>Email: {client.email}</p>
                    {renderJournals(client.journals)}
                </div>
            )
        })
    }

    return (
        <div>
            <div>
                <h1>Therapist Dashboard</h1>
            </div>
            <div>
            
                {clientsData ?
                    renderClients(clientsData) :
                    <p>Loading...</p>
                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default TherapistDashboard;