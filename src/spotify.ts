import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientID = "d0cf81640a894cecaffb1957c55cf16d";
const scopes = ["user-library-read", "playlist-library-private"];
const redirectURI = "http://localhost:3000";

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scopes=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient;
