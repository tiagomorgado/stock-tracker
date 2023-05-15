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

                console.log(responses)
                if(isMounted) {
                    setStock(responses)
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