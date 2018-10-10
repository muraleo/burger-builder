import axios from "axios";

const instance = axios.create({
	baseURL: "https://leo-burger-builder.firebaseio.com"
});

export default instance;
