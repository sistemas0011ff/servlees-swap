export class PlanetDataSpanishApp {
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
      periodoRotacion: number | string;
      periodoOrbital: number | string;
      diametro: number | string;
      clima: string;
      gravedad: string;
      terreno: string;
      aguaSuperficial: number | string;
      poblacion: number | string;
    }) {
      this.nombre = data.nombre;
      this.periodoRotacion = typeof data.periodoRotacion === 'string' ? parseInt(data.periodoRotacion, 10) : data.periodoRotacion;
      this.periodoOrbital = typeof data.periodoOrbital === 'string' ? parseInt(data.periodoOrbital, 10) : data.periodoOrbital;
      this.diametro = typeof data.diametro === 'string' ? parseInt(data.diametro, 10) : data.diametro;
      this.clima = data.clima;
      this.gravedad = data.gravedad;
      this.terreno = data.terreno;
      this.aguaSuperficial = typeof data.aguaSuperficial === 'string' ? parseInt(data.aguaSuperficial, 10) : data.aguaSuperficial;
      this.poblacion = typeof data.poblacion === 'string' ? parseInt(data.poblacion, 10) : data.poblacion;
    }
  }
  