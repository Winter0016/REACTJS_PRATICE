// Content.js
import React from 'react';

const FORM = ({ handleSubmit, newNames, setnewNames }) => {


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" value ={newNames} 
            onChange={(e) => setnewNames(e.target.value)}
        />
        <button type="submit">Unique UpperCase</button>
      </form>
    </div>
  );
}

export default FORM;
