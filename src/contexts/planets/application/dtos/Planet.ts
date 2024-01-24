 
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
  
    constructor(data: {
      nombre: string | null;
      periodoRotacion: number | null;  
      periodoOrbital: number | null;  
      diametro: number | null; 
      clima: string | null;
      gravedad: string | null;
      terreno: string | null;
      aguaSuperficial: number | null;  
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
