import FORM from './FORM';
import { useState,useEffect } from 'react';
import Listname from './Listname';
import Addname from './Addname';
function App() {
  const [Names, setNames] =  useState(JSON.parse(localStorage.getItem('listname')) || []);

  const [newNames, setnewNames] = useState('');

  const [addNames , setaddNames ] = useState ('');


// add useEffect: store Names array to storage whether there is a change in Names
  useEffect (() => {
    localStorage.setItem('listname', JSON.stringify(Names));

  },{Names})


  const uppercase = (current_name) => {
    console.log(`current_name = ${current_name}`);
    const id = Names.length ? Names[Names.length - 1].id + 1 : 1; 

    for (let i = 0; i < current_name.length; i++) {
      current_name[i] = i % 2 === 0 ? current_name[i].toUpperCase() : current_name[i];
    }
    
    const updatedName = current_name.join('');
    console.log(`updatedname = ${updatedName}`);
    setnewNames(updatedName);
  
    const mynewname = { id, name: updatedName, age: 25 };
    const listNames = [...Names, mynewname];
    setNames(listNames);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`newnames before split: ${newNames}`);
    const nameArray = newNames.split('');
    uppercase(nameArray);
  };

  const handleDelete = (parameter) => {
    const listname = Names.filter((name) => name.id !== parameter);
    setNames(listname);
  };
  const Add_new_name = (addNames) =>{
    if(!addNames) return;
    const id = Names.length ? Names[Names.length - 1].id + 1 : 1;
    console.log(`id : ${id}`);
    const mynewname2 = { id , name : addNames};
    console.log(`mynewname2 : ${JSON.stringify(mynewname2)}`);
    const listNames2 = [...Names, mynewname2];
    setNames(listNames2);
  }

  const handleSubmit2 = (e) =>{
    e.preventDefault();
    console.log(`handlesubmit2`);
    console.log(`newaddnams: ${addNames}`);
    if(!addNames) return;
    Add_new_name(addNames);
    setaddNames('');
  }

  return (
    <div className="App">
      <FORM
        handleSubmit={handleSubmit}
        newNames={newNames}
        setnewNames={setnewNames}
      />
      <Addname 
        addNames={addNames}
        setaddNames={setaddNames}
        handleSubmit2={handleSubmit2}
        handleSubmit={handleSubmit}
        Add_new_name={Add_new_name}
      />
      <Listname
        Names={Names}
        setNames={setNames}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
