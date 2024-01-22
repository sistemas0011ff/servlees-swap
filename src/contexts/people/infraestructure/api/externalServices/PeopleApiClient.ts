import axios from "axios";
import { PeopleDataEnglishApp } from "../../../application/dtos/PeopleDataEnglishApp";
import { IPeopleApiClient } from "../../../application/interfaces/IPeopleApiClient";
import { Service } from "typedi";

@Service()
export class PeopleApiClient implements IPeopleApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async get(PeopleId: number): Promise<PeopleDataEnglishApp> {
        try {
            const response = await axios.get(`${this.baseUrl}/people/${PeopleId}/`);
            if (response.status === 200) {
                const apiData = response.data;
                return new PeopleDataEnglishApp({
                    id: PeopleId, // Asumiendo que el ID es el mismo que PeopleId
                    name: apiData.name,
                    height: apiData.height,
                    mass: apiData.mass,
                    hairColor: apiData.hair_color,
                    skinColor: apiData.skin_color,
                    eyeColor: apiData.eye_color,
                    birthYear: apiData.birth_year,
                    gender: apiData.gender,
                    homeworldName: apiData.homeworld, // Aquí necesitas procesar la URL para obtener solo el nombre
                    created: new Date(apiData.created),
                    edited: new Date(apiData.edited)
                });
            } else {
                throw new Error(`API request failed with status ${response.status}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error fetching People data: ${error.message}`);
            }
            throw error;
        }
    }
}