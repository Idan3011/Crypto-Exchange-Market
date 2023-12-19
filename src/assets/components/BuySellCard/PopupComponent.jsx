import React from 'react';

const PopupComponent = ({ title, content, onClose, background }) => {
  return (
    <div className="popup" style={{ background }}>
      <h3>{title}</h3>
      <p>{content}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopupComponent;