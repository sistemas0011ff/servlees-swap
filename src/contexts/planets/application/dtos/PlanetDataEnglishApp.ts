export class PlanetDataEnglishApp {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
  population: number;

  constructor(data: {
    name: string;
    rotation_period: number | string;
    orbital_period: number | string;
    diameter: number | string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: number | string;
    population: number | string;
  }) {
    this.name = data.name;
    this.rotation_period = typeof data.rotation_period === 'string' ? parseInt(data.rotation_period, 10) : data.rotation_period;
    this.orbital_period = typeof data.orbital_period === 'string' ? parseInt(data.orbital_period, 10) : data.orbital_period;
    this.diameter = typeof data.diameter === 'string' ? parseInt(data.diameter, 10) : data.diameter;
    this.climate = data.climate;
    this.gravity = data.gravity;
    this.terrain = data.terrain;
    this.surface_water = typeof data.surface_water === 'string' ? parseInt(data.surface_water, 10) : data.surface_water;
    this.population = typeof data.population === 'string' ? parseInt(data.population, 10) : data.population;
  }
}
