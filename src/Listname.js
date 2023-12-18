// Listname.js
import React from 'react';
import { FaTrash } from "react-icons/fa";

const Listname = ({ Names, handleDelete, handlechecked }) => {
  return (
    <div className='Listname'>
        {Names.length != 0? (
            <div>
                {Names.map((thisname) => (
                    <div className='Listname_map' key={thisname.id}>
                        <input type="checkbox" checked={thisname.checked} onChange={() => handlechecked(thisname.id)} />
                        <div>{thisname.id}. {thisname.name}</div>
                        <FaTrash className='trash_icon' role='button'
                            onClick={() => handleDelete(thisname.id)}
                        />
                    </div>
                ))}                
            </div>
        ) :(
            <p>EMPTY LIST</p>
        )}
    </div>
  );
}

export default Listname;
