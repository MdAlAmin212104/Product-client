import axios from "axios";

const axiosCommon = axios.create({
    baseURL : import.meta.env.VITE_URL
})
const useAxios = () => {
    return axiosCommon;
};

export default useAxios;