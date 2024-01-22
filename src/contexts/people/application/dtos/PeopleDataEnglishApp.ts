// dtos/PeopleDataEnglishApp.ts

export class PeopleDataEnglishApp {
  id: number;
  name: string | null;
  height: string | null;
  mass: string | null;
  hairColor: string | null;
  skinColor: string | null;
  eyeColor: string | null;
  birthYear: string | null;
  gender: string | null;
  homeworldName: string | null;
  created: Date | null;
  edited: Date | null;

  constructor(data: {
      id: number;
      name: string | null;
      height: string | null;
      mass: string | null;
      hairColor: string | null;
      skinColor: string | null;
      eyeColor: string | null;
      birthYear: string | null;
      gender: string | null;
      homeworldName: string | null;
      created: Date | null;
      edited: Date | null;
  }) {
      this.id = data.id;
      this.name = data.name;
      this.height = data.height;
      this.mass = data.mass;
      this.hairColor = data.hairColor;
      this.skinColor = data.skinColor;
      this.eyeColor = data.eyeColor;
      this.birthYear = data.birthYear;
      this.gender = data.gender;
      this.homeworldName = data.homeworldName;
      this.created = data.created;
      this.edited = data.edited;
  }
}
