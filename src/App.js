import FORM from './FORM';
import { useState,useEffect } from 'react';
import Listname from './Listname';
import Addname from './Addname';
import apirequest from './Api_request';
function App() {
  const API_URL ='http://localhost:3500/Names';



  const [Names, setNames] =  useState([]);

  const [newNames, setnewNames] = useState('');

  const [addNames , setaddNames ] = useState ('');

  const [fetchError, setfetchError] = useState(null);

  const [isloading,setisloading] =useState(true);

// add useEffect: store Names array to storage whether there is a change in Names
  useEffect (() => {
    const fetchNames  = async() =>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Did not receive expected data");
        const listNamess = await response.json();
        console.log(`listname useEffect: ${JSON.stringify(listNamess)}`);
        setNames(listNamess);
        setfetchError(null);
      }catch(err){
        setfetchError(err.message);
      }finally{
        setisloading(false);
      }
    }
  
    setTimeout(() => {
      (async () => await fetchNames())(); // or fetchNames();
    }, 2000);

  },[])


  const uppercase = async (current_name) => {
    console.log(`current_name = ${current_name}`);
    const id = Names.length ? Names[Names.length - 1].id + 1 : 1; 

    for (let i = 0; i < current_name.length; i++) {
      current_name[i] = i % 2 === 0 ? current_name[i].toUpperCase() : current_name[i];
    }
    
    const updatedName = current_name.join('');
    console.log(`updatedname = ${updatedName}`);
    setnewNames(updatedName);
  
    const mynewname = { id, name: updatedName, checked:false };
    const listNames = [...Names, mynewname];
    console.log(`listnames of uppercase: ${JSON.stringify(listNames)}`);
    setNames(listNames);

    const postoption = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mynewname)
    }
    const result = await apirequest(API_URL , postoption);
    if(result){
      setfetchError(result);
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`newnames before split: ${newNames}`);
    const nameArray = newNames.split('');
    uppercase(nameArray);
  };

  const handleDelete = async(parameter) => {
    const listname = Names.filter((name) => name.id !== parameter);
    console.log(`list in handle delete : ${JSON.stringify(listname)}`);
    setNames(listname);
    const deleteoption = {
      method:'DELETE',
    };
    const reURL = `${API_URL}/${parameter}`;
    const result = await apirequest(reURL, deleteoption);
    if(result){
      setfetchError(result);
    };

  };
  const Add_new_name = async(addNames) =>{
    if(!addNames) return;
    const id = Names.length ? Names[Names.length - 1].id + 1 : 1;
    console.log(`id : ${id}`);
    const mynewname2 = { id , name : addNames,checked : false };
    console.log(`mynewname2 : ${JSON.stringify(mynewname2)}`);
    const listNames2 = [...Names, mynewname2];
    setNames(listNames2);

    const postoption = {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mynewname2)
    }
    const result = await apirequest(API_URL , postoption);
    if(result){
      setfetchError(result);
    }
  }

  const handleSubmit2 = (e) =>{
    e.preventDefault();
    console.log(`handlesubmit2`);
    console.log(`newaddnams: ${addNames}`);
    if(!addNames) return;
    Add_new_name(addNames);
    setaddNames('');
  }

  const handlechecked = async(id) => {
    const listmap = Names.map((Name) => Name.id === id ? {...Name, checked: !Name.checked} : Name);
    console.log(`listmap handlechecked : ${JSON.stringify(listmap)}`);
    setNames(listmap);

    const mycurrentname = listmap.filter(name => name.id === id);
    console.log(`mycurrentname handlechecked: ${JSON.stringify(mycurrentname)}`);
    const updateoption = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ checked :mycurrentname[0].checked})
    };
    const requireurl = `${API_URL}/${id}`;
    const result = await apirequest(requireurl, updateoption);
    if(result) setfetchError(result);
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
      <main>
        {isloading && <p>Loading Names....</p>}
        {fetchError && <p style={{color:"red"}}>{`Error : ${fetchError}`}</p>}
        {!fetchError && !isloading &&
          <Listname
            Names={Names}
            setNames={setNames}
            handleDelete={handleDelete}
            handlechecked={handlechecked}
          />
        }
      </main>
    </div>
  );
}

export default App;
