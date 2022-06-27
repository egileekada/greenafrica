import axios from 'axios';

export const setSession = access_token => {
    if ( access_token )
    {
        localStorage.setItem('Authorization', access_token);
    }
    else
    {
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getAccessToken = () => {
    return window.localStorage.getItem('Authorization');
};
