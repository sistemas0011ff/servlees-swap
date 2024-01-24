// handler.ts
import { APIGatewayProxyHandler } from "aws-lambda";
import { IPeopleRegistryService } from "../../../contexts/people/application/interfaces/IPeopleRegistryService";
import Container, { IPeopleRegistryServiceToken } from "../../di/iocContainer";

export const handler: APIGatewayProxyHandler = async () => {
    try {
        const peopleRegistryService = Container.get<IPeopleRegistryService>(IPeopleRegistryServiceToken);
        const peoples = await peopleRegistryService.listPeople();

        return {
            statusCode: 200,
            body: JSON.stringify(peoples),
        };
    } catch (error) { 
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Error interno del servidor al obtener los peoples.',
                errorMessage: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};