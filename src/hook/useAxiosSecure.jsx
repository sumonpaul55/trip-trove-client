import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// https://trip-trove-server.vercel.app
const url = `https://trip-trove-server.vercel.app`

const axiosSecure = axios.create({
    baseURL: url,
})

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem("access-token");
            config.headers.authorization = `Bearer ${token}`;
            return config
        }, function (err) {
            return Promise.reject(err)
        })
        // interceptors 401 and 403 status
        axiosSecure.interceptors.response.use(function (response) {
            return response
        }, async (error) => {
            // console.log(error)
            const status = error.response.status;
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error)
        })
    }, [navigate, logOut])


    return axiosSecure;
};

export default useAxiosSecure;