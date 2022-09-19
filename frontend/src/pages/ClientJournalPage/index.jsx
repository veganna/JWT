import {useEffect, useState} from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import JournalEntryCard from "../../components/JournalEntryCard";
import CreateJournalEntry from "../../components/CreateJournalEntry";
import MoodChart from "../../components/MoodChart";

import {fetchGetAuth} from "../../config/api";

const ClientJournalPage = () => {
    const [showCreateEntry, setShowCreateEntry] = useState(false);
    const [journalEntries, setJournalEntries] = useState([]);
    const [isJournalAvailable, setIsJournalAvailable] = useState(false);
    const [user, setUser] = useAuth();

    useEffect(() => {
        const checkJournalAvailability = async () => {
            const response = await fetchGetAuth('/journal/availability/', {});
            setIsJournalAvailable(response.data.is_available)
        }
        const getJournalEntries = async () => {
            const response = await fetchGetAuth('/journal/', {});
            setJournalEntries(response.data);
        }
        const init = () => {
            getJournalEntries()
            checkJournalAvailability()
        }
        init()
        
    }, [])

    const renderJournalEntries = (entries) => {
        return entries.map((entry, i) => {
            return (
                <JournalEntryCard entry={entry} />
            )
        })
    }
    return (
        <div>
            <div>
                <h1>My Journal</h1>
            </div>
            {isJournalAvailable ?
                <> 
                    <div>
                        <button onClick={() => setShowCreateEntry(!showCreateEntry)}>{showCreateEntry ? "Cancel" : "Create"}</button>
                    </div>
                    {showCreateEntry ? <CreateJournalEntry /> : ''}
                </>
                :<h3>Great Job! You already filled out your Journal Today</h3>
            }
            <div>
                <h2>Previous Entires</h2>
                <div>
                    {journalEntries ?
                        renderJournalEntries(journalEntries) :
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                </div>
                <div>
                    <h2>Mood Chart</h2>
                    {journalEntries ?
                        <MoodChart moods={journalEntries.map(({mood}) => mood)} /> :
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ClientJournalPage;