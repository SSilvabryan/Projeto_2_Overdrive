import { useState, useEffect } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        async function fetchData() {
          setLoading(true)

          try {
            const res = await fetch(url)
    
            const json = await res.json()
      
            setData(json)
          } catch (error) {
            setError("Erro ao carregar os dados.")
          }
          setLoading(false)
        }

        fetchData()
    }, [url])
    
    return {data, error, loading}
}