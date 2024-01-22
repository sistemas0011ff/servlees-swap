// dtos/PlanetData.ts
export class PlanetData {
    nombre: string;
    periodoRotacion: number;
    periodoOrbital: number;
    diametro: number;
    clima: string;
    gravedad: string;
    terreno: string;
    aguaSuperficial: number;
    poblacion: number;
  
    constructor(data: {
      nombre: string;
      periodoRotacion: number;
      periodoOrbital: number;
      diametro: number;
      clima: string;
      gravedad: string;
      terreno: string;
      aguaSuperficial: number;
      poblacion: number;
    }) {
      this.nombre = data.nombre;
      this.periodoRotacion = data.periodoRotacion;
      this.periodoOrbital = data.periodoOrbital;
      this.diametro = data.diametro;
      this.clima = data.clima;
      this.gravedad = data.gravedad;
      this.terreno = data.terreno;
      this.aguaSuperficial = data.aguaSuperficial;
      this.poblacion = data.poblacion;
    }
  }
  