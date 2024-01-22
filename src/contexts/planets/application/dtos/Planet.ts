// dtos/Planet.ts
export class Planet {
    nombre: string | null;
    periodoRotacion: number | null;
    periodoOrbital: number | null;
    diametro: number | null;
    clima: string | null;
    gravedad: string | null;
    terreno: string | null;
    aguaSuperficial: number | null;
    poblacion: number | null;
    population: any;
  
    constructor(data: {
      nombre: string | null;
      periodoRotacion: number | null; // Cambiamos el tipo a number | null
      periodoOrbital: number | null; // Cambiamos el tipo a number | null
      diametro: number | null; // Cambiamos el tipo a number | null
      clima: string | null;
      gravedad: string | null;
      terreno: string | null;
      aguaSuperficial: number | null; // Cambiamos el tipo a number | null
      poblacion: number | null;
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
