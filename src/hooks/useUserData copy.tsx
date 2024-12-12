import axios, { AxiosResponse } from "axios";
import { TeamData } from "../componentes/interface/teamData";
import { useQuery } from "@tanstack/react-query";
import http from "../http";

const API_URL = http;

const fetchData = async (): Promise<AxiosResponse< TeamData[]>> => {
    try {
        const response = await axios.get<TeamData[]>(API_URL + '/auth/list');
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error or handle it as needed
    }
}

export function TeamData() {
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