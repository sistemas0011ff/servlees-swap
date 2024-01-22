
export class PeopleData {
  id: number;
  nombre: string | null;
  altura: string | null;
  masa: string | null;
  colorCabello: string | null;
  colorPiel: string | null;
  colorOjos: string | null;
  anioNacimiento: string | null;
  genero: string | null;
  nombreMundoNatal: string | null;
  creado: Date | null;
  editado: Date | null;

  constructor(data: {
      id: number;
      nombre: string | null;
      altura: string | null;
      masa: string | null;
      colorCabello: string | null;
      colorPiel: string | null;
      colorOjos: string | null;
      anioNacimiento: string | null;
      genero: string | null;
      nombreMundoNatal: string | null;
      creado: Date | null;
      editado: Date | null;
  }) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.altura = data.altura;
      this.masa = data.masa;
      this.colorCabello = data.colorCabello;
      this.colorPiel = data.colorPiel;
      this.colorOjos = data.colorOjos;
      this.anioNacimiento = data.anioNacimiento;
      this.genero = data.genero;
      this.nombreMundoNatal = data.nombreMundoNatal;
      this.creado = data.creado;
      this.editado = data.editado;
  }
}
