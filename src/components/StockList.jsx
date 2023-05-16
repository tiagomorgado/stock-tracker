import { useState, useEffect } from "react"
import finnHub from "../apis/finnHub"

export const StockList = () => {
    const [stock, setStock] = useState()
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])


    useEffect(() => { 
        let isMounted = true
        const fetchData = async () => {
            try{
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))

                /* Fetch only data and symbol */
                const data = responses.map((response) => {
                    return{
                        data: response.data,
                        symbol: response.config.params.symbol
                    }   
                })
                console.log(data)
                /* Check if component is mounted */
                if(isMounted) {
                    setStock(data)
                }
            } catch(e) {
                
            }
        }

        fetchData()
        return () => {isMounted = false}
    }, [])

    return (
        <div>
            Stock List Page
        </div>
    )
}