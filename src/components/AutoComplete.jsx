import { useState, useEffect, useContext } from "react"
import finnHub from "../apis/finnHub"
import { WatchListContext } from "../context/watchListContext"

/* The component where the user will write which stock they want to follow */
export const AutoComplete = () => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const {addStock} = useContext(WatchListContext)

    const renderDropDown = () => {
        const dropDownClass = search ? 'show' : null
        return(
            <ul style={{height:'500px', overflowY:'scroll', overflowX:'hidden', cursor:'pointer'}} className={`dropdown-menu ${dropDownClass}`}>
                {
                    results.map((result) => {
                        return(
                            <li onCLick={() => addStock(result.symbol)} key={result.symbol} className='dropdown-item'>{result.description}</li>
                        )
                    })
                }
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try{
                const response = await finnHub.get('/search', {
                    params: {
                        q: search
                    }
                })
                console.log(response)

                /* Ensure component is still mounted */
                if(isMounted) {
                    setResults(response.data.result)
                }
            } catch(err) {
                console.log(err.response)
            }
        }

        if(search.length > 0) {
            fetchData()
        } else {
            setResults([])
        }
        return () => {isMounted = false}
    }, [search])

    return (
        <div className='w-50 p-5 rounded mx-auto'>
            <div className='form-floating dropdown'>
                <input style={{backgroundColor:'rgba(145,158,171,0.04)'}} id='search' type='text'
                className='form-control' placeholder="Search" autoComplete="off"
                value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <label htmlFor='search'>Search</label>
                    {renderDropDown()}
            </div>
        </div>
    )
}