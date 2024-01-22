import axios from "axios";
import { PlanetDataEnglishApp } from "../../../application/dtos/PlanetDataEnglishApp";
import { IPlanetApiClient } from "../../../application/interfaces/IPlanetApiClient";
import { Service } from "typedi";

@Service()
export class PlanetApiClient implements IPlanetApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async getPlanet(planetId: number): Promise<PlanetDataEnglishApp> {
        try {
            const response = await axios.get<PlanetDataEnglishApp>(`${this.baseUrl}/planets/${planetId}/`);
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`API request failed with status ${response.status}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Error fetching planet data: ${error.message}`);
            }
            throw error;
        }
    }
}