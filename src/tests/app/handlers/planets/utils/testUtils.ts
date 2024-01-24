import { Context } from 'aws-lambda';
import { mockPlanetRegistryService } from '../mocks/mockPlanetRegistryService';
import Container from '../../../../../app/di/iocContainer';

// Configuración del contexto de AWS Lambda para las pruebas
export const mockContext: Context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'testFunction',
    functionVersion: '1',
    invokedFunctionArn: 'arn:aws:lambda:region:account-id:function:testFunction',
    memoryLimitInMB: '128',
    awsRequestId: 'unique-id',
    logGroupName: 'log-group',
    logStreamName: 'log-stream',
    getRemainingTimeInMillis: () => 3000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
};

// Configuración de los mocks y limpieza para las pruebas
export const setupMockContainer = () => {
    beforeEach(() => {
        // Configuración del mock para el contenedor de inyección de dependencias
        Container.get = jest.fn().mockReturnValue(mockPlanetRegistryService);
    });

    afterEach(() => {
        // Limpieza de mocks después de cada prueba
        jest.clearAllMocks();
    });
};
