import axios, { AxiosResponse } from "axios";
import { UserData } from "../componentes/interface/userData";
import { useQuery } from "@tanstack/react-query";
import http from "../http";

const API_URL = http;

const fetchData = async (): Promise<AxiosResponse<UserData[]>> => {
    try {
        const response = await axios.get<UserData[]>(API_URL + '/auth/list');
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error or handle it as needed
    }
}

export function UserData() {
   const query = useQuery({
    queryFn: fetchData,
    queryKey: ['media-data'],
    retry: 2
   })

   return{
    ...query,
    data: query.data?.data
   }
}