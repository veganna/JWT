import React from "react";
import "./styles/journalEntryCard.css";

const JournalEntryCard = ({entry}) => {
    //convert 2022-09-19 to 09/19/2022
    var dateFormatted = entry.creation_date.split('-').reverse().join('/');
    return (
        <div key={`journal-entry-${entry.id}`} className={"entryCard"}>
            <p className={"entryCard-title"}>Title: {entry.title}</p>
            <p className={"entryCard-description"}>Description: {entry.description}</p>
            <p className={"entryCard-date"}>Date Created: {dateFormatted}</p>
            <p className={"entryCard-weather"}>Current Weather: {entry.weather}</p>
            <p className={"entryCard-mood"}>Current Mood: {entry.mood == "GOOD"?"😄":"😞"}</p>
        </div>
    )
}

export default JournalEntryCard;