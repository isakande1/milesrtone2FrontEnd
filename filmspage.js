import React, { useState, useEffect } from 'react';


export default function SearchFilm() {
    const [queryResult, setQueryResult] = useState([]);
    const [itemSearched, setItemSearched] = useState("");
    const [option, setOption] = useState(1);

    useEffect(() => {
        fetchData();
        console.log(queryResult);
    }, []);
    const fetchData = async () => {
        const response = await fetch('/searchFilmQuery');
        const result = await response.json();
        setQueryResult(result);
    }

    const fileterdItems = queryResult.filter(item => item[option].includes(itemSearched));
    return (
        <div className='optionSearch'>
        <div className='search'>
            <label>Search</label>
            <input type="text" onChange={e => setItemSearched(e.target.value)} />
            <ul>
                {itemSearched != "" && fileterdItems.map(value => <p>{value[0]}</p>)}
            </ul>
        </div>
        <div> 
          <input type ='radio' name="option" value = '0' onChange={e=>setOption(Number(e.target.value))}/>filmName
          <input type ='radio' name='option' value = '1' onChange={e=>setOption(Number(e.target.value))}/>firstName
          <input type ='radio' name='option' value = '2' onChange={e=>setOption(Number(e.target.value))}/>lastName
          <input type ='radio' name='option' value = '3' onChange={e=>setOption(Number(e.target.value))}/>genreName
         </div>
       
        </div>
    );
}

