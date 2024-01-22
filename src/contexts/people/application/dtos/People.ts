// dtos/People.ts

export class People {
  id: number;
  name: string | null;
  height: string | null;
  mass: string | null;
  hair_color: string | null;
  skin_color: string | null;
  eye_color: string | null;
  birth_year: string | null;
  gender: string | null;
  homeworld_name: string | null;
  created: Date | null;
  edited: Date | null;

  constructor(data: {
      id: number;
      name: string | null;
      height: string | null;
      mass: string | null;
      hair_color: string | null;
      skin_color: string | null;
      eye_color: string | null;
      birth_year: string | null;
      gender: string | null;
      homeworld_name: string | null;
      created: Date | null;
      edited: Date | null;
  }) {
      this.id = data.id;
      this.name = data.name;
      this.height = data.height;
      this.mass = data.mass;
      this.hair_color = data.hair_color;
      this.skin_color = data.skin_color;
      this.eye_color = data.eye_color;
      this.birth_year = data.birth_year;
      this.gender = data.gender;
      this.homeworld_name = data.homeworld_name;
      this.created = data.created;
      this.edited = data.edited;
  }
}
