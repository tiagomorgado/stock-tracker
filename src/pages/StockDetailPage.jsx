import { useParams } from "react-router-dom"
import { useEffect } from "react"
import finnHub from "../apis/finnHub"

export const StockDetailPage = () => {
    /* Fetch parameters from URL */
    const {symbol} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime()/1000)
            let oneDay 

            /* Stock markets close on weekend, so this validation checks if
            it is saturday or sunday, and return the amount of days so that only week days are chosen */
            if(date.getDay() === 6) { /* if Saturday */
                oneDay = currentTime - 2 * 24 * 60 * 60
            } else if(date.getDay() === 7) { /* if Sunday */
                oneDay = currentTime - 3 * 24 * 60 * 60
            } else { /* Else if weekday */
                oneDay = currentTime - 24 * 60 * 60
            }
            const response = await finnHub.get("/stock/candle", {
                params: {
                    symbol,
                    from: oneDay,
                    to: currentTime,
                    resolution: 30
                }
            })
            console.log('my Data', response)
        }
        fetchData()
    }, [])
    return (
        <div>
            Stock Detail Page {symbol}
        </div>
    )
}