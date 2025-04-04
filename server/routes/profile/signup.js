import axios from "axios";

const signup = async (email, password) => {
    try {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        console.log(res.data);
    } catch (error) {
        console.error("Login error", error);
        alert("Error during login. Please try again.");
    }
};

