import { APIGatewayProxyHandler } from 'aws-lambda';
 
 
export const handler: APIGatewayProxyHandler = async (event) => {
    let baseUrl: string;

    const hostHeader = event.headers.Host || event.headers.host;

    if (hostHeader) {
        const isLocal = hostHeader.includes('localhost');
        baseUrl = isLocal ? `http://${hostHeader}/${event.requestContext.stage}` : `https://${hostHeader}/${event.requestContext.stage}`;
    } else {
        baseUrl = 'http://default-host';
    }
    const swaggerSpec = {
        openapi: '3.0.0',
        info: {
            title: 'SWars API',
            version: '1.0.0',
            description: 'API para manejar información de planetas en SWars.',
        },
        servers: [ 
            {
                url: baseUrl, 
            },
        ],
        paths: {
            '/api/planets': {
                get: {
                    summary: 'Obtiene la información de un planeta específico desde SWAPI (Especificar su ID Ejemplo 1)',
                    operationId: 'getPlanetById',
                    tags: [
                        'planets'
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'query',
                            required: true,
                            description: 'ID del planeta a obtener',
                            schema: {
                                type: 'integer',
                                format: 'int64'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Información detallada del planeta',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/PlanetDataSpanishApp'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'ID del planeta no proporcionado o inválido'
                        },
                        '500': {
                            description: 'Error interno del servidor'
                        }
                    }
                }
            },
            '/planets': {
                post: {
                    summary: 'Crea un nuevo planeta',
                    tags: [
                        'planets'
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/PlanetDataSpanishApp'
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Planeta creado con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Planet'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Datos de entrada no válidos'
                        },
                        '500': {
                            description: 'Error interno del servidor'
                        }
                    }
                },
                get: {
                    summary: 'Lista todos los planetas',
                    tags: [
                        'planets'
                    ],
                    responses: {
                        '200': {
                            description: 'Lista de planetas obtenida con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Planet',
                                        },
                                    },
                                },
                            },
                        },
                    },
                }
            },
            '/api/people': {
                get: {
                    summary: 'Obtiene la información de una persona (Especificar su ID Ejemplo 1)',
                    operationId: 'getPeopleById',
                    tags: [
                        'people'
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'query',  
                            required: true,
                            description: 'ID de la persona a obtener',
                            schema: {
                                type: 'integer',
                                format: 'int64'
                            }
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'Información detallada de la persona',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/PeopleDataSpanishApp'   
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'ID de la persona no proporcionado o inválido'
                        },
                        '500': {
                            description: 'Error interno del servidor'
                        }
                    }
                }
            },
            '/people': {
                post: {
                    summary: 'Crea una nueva persona',
                    tags: [
                        'people'
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        nombre: { type: 'string', nullable: true },
                                        altura: { type: 'string', nullable: true },
                                        masa: { type: 'string', nullable: true },
                                        colorCabello: { type: 'string', nullable: true },
                                        colorPiel: { type: 'string', nullable: true },
                                        colorOjos: { type: 'string', nullable: true },
                                        anioNacimiento: { type: 'string', nullable: true },
                                        genero: { type: 'string', nullable: true },
                                        nombreMundoNatal: { type: 'string', nullable: true },
                                        creado: { type: 'string', format: 'date-time', nullable: true },
                                        editado: { type: 'string', format: 'date-time', nullable: true },
                                    },
                                    required: ['nombre', 'altura', 'masa', 'colorCabello', 'colorPiel', 'colorOjos', 'anioNacimiento', 'genero', 'nombreMundoNatal']
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Persona creada con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/People'
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Datos de entrada no válidos'
                        },
                        '500': {
                            description: 'Error interno del servidor'
                        }
                    }
                },
                get: {
                    summary: 'Lista todas las personas',
                    tags: [
                        'people'
                    ],
                    responses: {
                        '200': {
                            description: 'Lista de personas obtenida con éxito',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/People'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        components: {
            schemas: {
                Planet: {
                    type: 'object',
                    properties: {
                        nombre: {
                            type: 'string',
                            nullable: true,
                        },
                        periodoRotacion: {
                            type: 'number',
                            nullable: true,
                        },
                        periodoOrbital: {
                            type: 'number',
                            nullable: true,
                        },
                        diametro: {
                            type: 'number',
                            nullable: true,
                        },
                        clima: {
                            type: 'string',
                            nullable: true,
                        },
                        gravedad: {
                            type: 'string',
                            nullable: true,
                        },
                        terreno: {
                            type: 'string',
                            nullable: true,
                        },
                        aguaSuperficial: {
                            type: 'number',
                            nullable: true,
                        },
                        poblacion: {
                            type: 'number',
                            nullable: true,
                        },
                    },
                },
                PlanetDataSpanishApp: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string' },
                        periodoRotacion: { type: 'number' },
                        periodoOrbital: { type: 'number' },
                        diametro: { type: 'number' },
                        clima: { type: 'string' },
                        gravedad: { type: 'string' },
                        terreno: { type: 'string' },
                        aguaSuperficial: { type: 'number' },
                        poblacion: { type: 'number' },
                    },
                    required: ['nombre', 'clima', 'terreno'] 
                },
                People: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string', nullable: true },
                        altura: { type: 'string', nullable: true },
                        masa: { type: 'string', nullable: true },
                        colorCabello: { type: 'string', nullable: true },
                        colorPiel: { type: 'string', nullable: true },
                        colorOjos: { type: 'string', nullable: true },
                        anioNacimiento: { type: 'string', nullable: true },
                        genero: { type: 'string', nullable: true },
                        nombreMundoNatal: { type: 'string', nullable: true },
                        creado: { type: 'string', format: 'date-time', nullable: true },
                        editado: { type: 'string', format: 'date-time', nullable: true },
                    },
                    required: ['id', 'nombre', 'altura', 'masa', 'colorCabello', 'colorPiel', 'colorOjos', 'anioNacimiento', 'genero', 'nombreMundoNatal']
                },
                PeopleDataSpanishApp: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string', nullable: true },
                        altura: { type: 'string', nullable: true },
                        masa: { type: 'string', nullable: true },
                        colorCabello: { type: 'string', nullable: true },
                        colorPiel: { type: 'string', nullable: true },
                        colorOjos: { type: 'string', nullable: true },
                        anioNacimiento: { type: 'string', nullable: true },
                        genero: { type: 'string', nullable: true },
                        nombreMundoNatal: { type: 'string', nullable: true },
                        creado: { type: 'string', format: 'date-time', nullable: true },
                        editado: { type: 'string', format: 'date-time', nullable: true },
                    },
                    required: ['id', 'nombre', 'altura', 'masa', 'colorCabello', 'colorPiel', 'colorOjos', 'anioNacimiento', 'genero', 'nombreMundoNatal']
                } 

            },
        },
    };

    const swaggerSpecJsonString = JSON.stringify(swaggerSpec);
    const swaggerUiHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Swagger UI</title>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.2/swagger-ui.css">
        <style>body { margin: 0; padding: 0; }</style>
    </head>
    <body>
        <div id="swagger-ui"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.2/swagger-ui-bundle.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.3.2/swagger-ui-standalone-preset.js"></script>
        <script>
            window.onload = () => {
                window.ui = SwaggerUIBundle({
                    spec: ${swaggerSpecJsonString},
                    dom_id: '#swagger-ui',
                    deepLinking: true,
                    presets: [
                        SwaggerUIBundle.presets.apis,
                        SwaggerUIStandalonePreset
                    ],
                    layout: "StandaloneLayout"
                });
            };
        </script>
    </body>
    </html>
    `;
    


    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: swaggerUiHtml,
    };
};
