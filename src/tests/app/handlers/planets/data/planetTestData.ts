import { Planet } from "../../../../../contexts/planets/application/dtos/Planet";

export const fakePlanetData = {
    nombre: 'Tierra',
    periodoRotacion: 24,
    periodoOrbital: 365,
    diametro: 12742,
    clima: 'templado',
    gravedad: '1 estándar',
    terreno: 'montañoso, bosques, desiertos',
    aguaSuperficial: 70,
    poblacion: 7000000000
  };
  
export const mockPlanetsData = [
  new Planet({ nombre: 'Earth', periodoRotacion: null, periodoOrbital: null, diametro: null, clima: null, gravedad: null, terreno: null, aguaSuperficial: null, poblacion: 7000000000 }),
  new Planet({ nombre: 'Mars', periodoRotacion: null, periodoOrbital: null, diametro: null, clima: null, gravedad: null, terreno: null, aguaSuperficial: null, poblacion: 0 })
];