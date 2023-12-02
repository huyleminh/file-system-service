import { IGenericRepository } from "src/core/repositories";
import { ObjectLiteral, Repository } from "typeorm";

export abstract class GenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
    constructor(protected readonly _repository: Repository<T>) {}

    getManyRecord(limit: number, offset: number): Promise<T[]> {
        return this._repository.find({ skip: offset, take: limit });
    }

    getRecordById(id: number): Promise<T | null> {
        return this._repository.createQueryBuilder().where({ id }).getOne();
    }

    saveRecord(entity: Partial<T>): Promise<T> {
        return this._repository.save(entity as T);
    }

    updateRecordById(id: number, entity: Partial<T>) {
        return this._repository.update(id, entity);
    }

    deleteRecordById(id: number) {
        return this._repository.delete(id);
    }

    executeRawQuery(query: string, parameters?: any[]) {
        return this._repository.query(query, parameters);
    }
}
