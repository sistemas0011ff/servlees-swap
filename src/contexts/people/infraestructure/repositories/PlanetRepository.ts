// repositories/PeopleRepository.ts

import { PrismaClient, People as PeopleModel } from '@prisma/client';
import { IPeopleRepository } from '../../domain/interfaces/IPeopleRepository';
import { People } from '../../application/dtos/People';

export class PeopleRepository implements IPeopleRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(peopleData: People): Promise<string> {
        const newPeople = await this.prisma.people.create({
            data: {
                name: peopleData.name,
                height: peopleData.height,
                mass: peopleData.mass,
                hair_color: peopleData.hair_color,
                skin_color: peopleData.skin_color,
                eye_color: peopleData.eye_color,
                birth_year: peopleData.birth_year,
                gender: peopleData.gender,
                homeworld_name: peopleData.homeworld_name,
                created: peopleData.created,
                edited: peopleData.edited
            },
        });

        return newPeople.id.toString();
    }

    async findById(id: number): Promise<People | null> {
        const people = await this.prisma.people.findUnique({
            where: { id: id },
        });

        if (people) {
            return new People(people);
        }

        return null;
    }

    async findAll(): Promise<People[]> {
        const peopleList = await this.prisma.people.findMany();
        return peopleList.map(p => new People(p));
    }
}
