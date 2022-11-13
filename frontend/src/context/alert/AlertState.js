import AlertContext from "./alertContext";
import { useState } from "react";

const AlertState=(props)=>{

    const [alert, setalert] = useState(null);

    const showAlert=async(message,type)=>{
        console.log('show alert',message,type)
        setalert({
            msg:message,
            type:type
        })

        setTimeout(() => {
            setalert(null)
        }, 2000);

        //console.log(alert)
    }

    return (
        <AlertContext.Provider value={{showAlert,alert}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState