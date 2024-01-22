import { Service, Inject } from "typedi";
import { PeopleDataEnglishApp } from "../dtos/PeopleDataEnglishApp"; 
import { IQueryHandler } from "../../../shared/cqrs/IQueryHandler";
import { GetPeopleQuery } from "../queries/GetPeopleQuery";
import { IRetrievePeopleFromApiUseCase } from "../interfaces/IRetrievePeopleFromApiUseCase";
import { PeopleDataSpanishApp } from "../dtos/PeopleDataSpanishApp";

@Service()
export class RetrievePeopleFromApiUseCase implements IRetrievePeopleFromApiUseCase {
    constructor(
        private peoplesQueryHandler: IQueryHandler<GetPeopleQuery, PeopleDataEnglishApp[]>
    ) {}

    async execute(peopleId: number): Promise<PeopleDataSpanishApp> {
        try {
            const query: GetPeopleQuery = { id: peopleId };

            const [peopleEnglish] = await this.peoplesQueryHandler.execute(query);

            if (!peopleEnglish) {
                throw new Error("Persona no encontrada");
            }
 
            return new PeopleDataSpanishApp({
                id: peopleEnglish.id,
                nombre: peopleEnglish.name,
                altura: peopleEnglish.height,
                masa: peopleEnglish.mass,
                colorCabello: peopleEnglish.hairColor,
                colorPiel: peopleEnglish.skinColor,
                colorOjos: peopleEnglish.eyeColor,
                anioNacimiento: peopleEnglish.birthYear,
                genero: peopleEnglish.gender,
                nombreMundoNatal: peopleEnglish.homeworldName,
                creado: peopleEnglish.created,
                editado: peopleEnglish.edited
            });
        } catch (error) {
            console.error('Error in RetrievePeopleFromApiUseCase:', error);
            throw error;
        }
    }
}
