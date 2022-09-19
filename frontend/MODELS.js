// example schema for user, with all fields as they're used on the client

export const UserModel = {
    id: 1,
    uuid: "12oklmaflsflafoasdatw3gt",
    username: "kjones123",
    email: "test123@example.com",
    password: "hash:supersecret:salt:pepper",
    first_name: "Kasey",
    last_name: "Jones",
    user_city: "London",
    is_client: true,
    is_therapist: false
}

export const JournalEntryModel = {
    id: 1,
    uuid: "1231203102031232gsdgs",
    author_id: "12oklmaflsflafoasdatw3gt", // ref to users's uuid
    date_created: "9/18/2022",
    title: "My journal entry",
    description: "A little note to myself",
    content: "Well today I did this and this and that...",
    current_mood: "😄",
    current_weather: "some clouds"
}

// Need these fields to be accessibile on JWT sent to client
export const JWT_Fields = {
    uuid: "12oklmaflsflafoasdatw3gt",
    username: "kjones123",
    user_city: "London",
    is_client: true,
    is_therapist: false,
    iat: "09/17/2022",
    exp: "09/17/2205"
}