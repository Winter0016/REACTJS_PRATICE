import React from 'react'
import { IoIosAddCircle } from "react-icons/io";

export const Addname = ({ addNames, setaddNames, handleSubmit2, Add_new_name }) => {
  return (
    <div className='Addname'>
        <form onSubmit={handleSubmit2}>
            <input type="text" placeholder='Enter your name' value = {addNames} 
                onChange={(e) => setaddNames(e.target.value)}
            />
            <IoIosAddCircle className='plus_add' onClick={()=> Add_new_name(addNames)}/>
        </form>
    </div>
  )
}

export default Addname;