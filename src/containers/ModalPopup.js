import React from 'react';
export const Modal = ({ handleClose,handleSave, show,title, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <h2>{title}</h2>
          {children}
          <button onClick={handleSave}>save</button>
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
}