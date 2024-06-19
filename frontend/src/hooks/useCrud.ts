import {useState} from "react";

import useAxiosWithInterceptor from "../helpers/jwtinterceptor.ts";
import {BASE_URL} from "../config.ts";

interface IuseCrud<T> {
    dataCRUD: T[]
    fetchData: () => Promise<void>
    error: Error | null
    isLoading: boolean
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
    const jwtAxios = useAxiosWithInterceptor()
    const [dataCRUD, setDataCRUD] = useState<T[]>(initialData)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const data = response.data
            setDataCRUD(data)
            setError(null)
            setIsLoading(false)
            return data
        } catch (err: any) {
            if (err.response && err.response.status === 404) {
                setError(new Error("404"))
            }
            setIsLoading(false)
            throw err
        }
    }

    return {fetchData, dataCRUD, error, isLoading}
}

export default useCrud
