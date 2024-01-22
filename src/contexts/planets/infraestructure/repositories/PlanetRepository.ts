// repositories/PlanetRepository.ts en tu capa de infraestructura

import { PrismaClient, Planets } from '@prisma/client';
import { IPlanetRepository } from '../../domain/interfaces/IPlanetRepository';
import { Planet } from '../../application/dtos/Planet';

export class PlanetRepository implements IPlanetRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(planetData: Planet): Promise<string> {
        const planet = await this.prisma.planets.create({
            data: {
                name: planetData.nombre,
                rotation_period: planetData.periodoRotacion,
                orbital_period: planetData.periodoOrbital,
                diameter: planetData.diametro,
                climate: planetData.clima,
                gravity: planetData.gravedad,
                terrain: planetData.terreno,
                surface_water: planetData.aguaSuperficial,
                population: planetData.poblacion
            },
        });

        return planet.id.toString();
    }

    async findById(id: number): Promise<Planet | null> {
        const planet = await this.prisma.planets.findUnique({
            where: { id: id },
        });

        if (planet) {
            return new Planet({
                nombre: planet.name,
                periodoRotacion: planet.rotation_period,
                periodoOrbital: planet.orbital_period,
                diametro: planet.diameter,
                clima: planet.climate,
                gravedad: planet.gravity,
                terreno: planet.terrain,
                aguaSuperficial: planet.surface_water,
                poblacion: planet.population ? Number(planet.population) : null

            });
        }

        return null;
    }

    async findAll(): Promise<Planet[]> {
        const planetsData = await this.prisma.planets.findMany();
        return planetsData.map(p => new Planet({
            nombre: p.name,
            periodoRotacion: p.rotation_period,
            periodoOrbital: p.orbital_period,
            diametro: p.diameter,
            clima: p.climate,
            gravedad: p.gravity,
            terreno: p.terrain,
            aguaSuperficial: p.surface_water,
            poblacion: p.population ? Number(p.population) : null
        }));
    }
}
