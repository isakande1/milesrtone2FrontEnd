import React, { useState, useEffect } from 'react';


export default function SearchCustomer() {
    const [queryResult, setQueryResult] = useState([]);
    const [itemSearched, setItemSearched] = useState("");
    const [option, setOption] = useState(0);
    const[toDel,setToDel] = useState("");

    useEffect(() => {
        fetchData();
        console.log(queryResult);
    }, []);
    const fetchData = async () => {
        const response = await fetch('/chCustomer');
        const result = await response.json();
        setQueryResult(result);
    }
    const deleteUser = async (e)=>{
            e.preventDefault();
            setToDel(e.target.id.value)
            const merde = await fetch('/erase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(toDel)
            
          });
          console.log(toDel);
    }
    const fileterdItems = queryResult.filter(item => item[option].toString().includes(itemSearched));
    return (
<>
        <div className='optionSearch'>
        <div className='search'>
            <label>Search</label>
            <input type="text" onChange={e => setItemSearched(e.target.value)} />
            <ul>
                {itemSearched != "" && fileterdItems.map(value => <p>{value[1]}  {value[2]}</p>)}
            </ul>
        </div>
        <div> 
          <input type ='radio' name="option" value = '0' onChange={e=>setOption(Number(e.target.value))}/>Customer_id
          <input type ='radio' name='option' value = '1' onChange={e=>setOption(Number(e.target.value))}/>firstName
          <input type ='radio' name='option' value = '2' onChange={e=>setOption(Number(e.target.value))}/>lastName
         
         </div>
        </div>

      <div>
    <form onSubmit ={(e)=>deleteUser(e)}>
     <input type ='text' name='id' placeholder='Enter id of customer to delete' />
     <button>Submit</button>
    </form>
    </div>
    </>
    );
}

