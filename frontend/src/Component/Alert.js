import React,{useContext} from 'react'
import AlertContext from '../context/alert/alertContext';

const Alert = () => {
  const context = useContext(AlertContext);
  return (
    context.alert&&
    <div className='mt-5'>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>{context.alert.type}</strong>: {context.alert.msg}
            
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
  )
}

export default Alert