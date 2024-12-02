import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import api from "../../api";
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../../constants";
import { useEffect, useState } from "react";

function Protectedrouter({children}){
    const [isAuthorized, setAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setAuthorized(false))
    })

    const refershtoken = async() =>{
        const token = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("api/token/refresh/",{refresh: REFRESH_TOKEN})
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setAuthorized(true)
            }
            else{
                setAuthorized(false)
            }
        } 
        
        catch(e){
            console.log(e)
            setAuthorized(false)

        }
    }

    const auth = async() =>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token){
            setAuthorized(false)
            return 
        }
        const decode = jwtDecode(token)
        const tokenexpiration  = decode.exp
        const now = Date.now()/1000

        if(tokenexpiration < now){
            await refershtoken()
        }
    }

    if (isAuthorized === null){
        return <div>loding</div>
    }

    return isAuthorized ?  children : <Navigate to= '/login'/>
}

export default Protectedrouter;