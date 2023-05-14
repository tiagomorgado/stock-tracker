import { useState, useEffect } from "react"
import finnHub from "../apis/finnHub"

export const StockList = () => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])

    const fetchData = async () => {
        try{
            const response = await finnHub.get("/quote?symbol=MSFT&token=chgj6vpr01qnp48q1v60chgj6vpr01qnp48q1v6g")
            console.log(response)
        } catch(e) {
            console.log(e.response)
        }
    }


    useEffect(() => { 
        fetchData()
    }, [])

    return (
        <div>
            Stock List Page
        </div>
    )
}