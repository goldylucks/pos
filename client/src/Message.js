import {useContext} from "react";
import {MessageContext} from "./utility/MessageContext";

export default function Massage() {
    const {message, deleteMessage} = useContext(MessageContext);

    return (

        
        <div>
        
        <div className="toast-container position-fixed bottom-0 start-0 p-3" style={{marginBottom: 75}}>
            {message.map(msg => (
            
            <div role="alert" aria-live="assertive" aria-atomic="true" className="toast d-flex align-items-center fade show" data-bs-autohide="true" key={msg.key}>
                <div className="toast-body">
                    {msg.text}
                </div>
                <button 
                type="button" 
                className="btn-close ms-auto me-2" 
                data-bs-dismiss="toast" 
                aria-label="Close"
                onClick={() => deleteMessage(msg.key)}
                ></button>
            </div>
            ))}
        </div>
        
        </div>

    );
}
     
     
     
     
     
