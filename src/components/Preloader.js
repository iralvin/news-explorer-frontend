import React from 'react';

function Preloader(props) {
  return (
    <div className="preloader section">
      <i className='preloader__circle'></i>
        <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
