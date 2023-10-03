import React from 'react';
import '../styles/modal.scss';
const Modal = ({selectedImage, setSelectedImage}:any)=>{

    const handleClick = (e:any) =>{
        if(e.target.classList.contains('modal-container')){
        setSelectedImage(null);
        }
    }

    return(
        <div className='modal-container' onClick={handleClick}>

           <img src={selectedImage}/>

        </div>
    )

}

export default Modal;