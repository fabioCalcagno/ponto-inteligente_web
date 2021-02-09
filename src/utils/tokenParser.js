import { useJwt } from "react-jwt";
import {getToken} from '../utils/authUtils';



export function JwtInfoParser(){
    const { decodedToken, isExpired } = useJwt(getToken());
    if(isExpired) return isExpired;
    return decodedToken;
}