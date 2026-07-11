import axios from "axios"

const api = axios.create({
    baseURL: "https://moodtunes-4mti.onrender.com",
    withCredentials: true
})

export async function register({ email, password, username }) {
    // const response = await api.post("/api/auth/register", {
    //     email, password, username
    // })

    // return response.data

    try {
    const response = await api.post("/api/auth/register", {
        email,
        password,
        username
    });

    return response.data;
} catch (err) {
    console.log(err.response.status);
    console.log(err.response.data);
    throw err;
}
}

export async function login({ email, username, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, username, password
        });

        return response.data;
    } catch (err) {
        console.log(err);
        console.log(err.response.data);
        throw err;
    }
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")
    return response.data
}