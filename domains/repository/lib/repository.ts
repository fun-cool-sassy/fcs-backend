import { Type } from "@course-design/types";
import { EntityManager, Repository as TypeormRepository } from "typeorm";
import { QueryRunner } from "typeorm/query-runner/QueryRunner";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { SaveOptions } from "typeorm/repository/SaveOptions";
import { RemoveOptions } from "typeorm/repository/RemoveOptions";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { InsertResult } from "typeorm/query-builder/result/InsertResult";
import { ObjectID } from "typeorm/driver/mongodb/typings";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { EntityMetadata } from "typeorm/metadata/EntityMetadata";

import { Entity } from "@fcs/entity";

class Repository<T extends Entity> {
  protected readonly repository: TypeormRepository<T>;

  protected readonly manager: EntityManager;

  protected readonly metadata: EntityMetadata;

  protected readonly queryRunner?: QueryRunner;

  constructor(entityManager: EntityManager, target: Type<T>) {
    this.repository = entityManager.getRepository(target);

    this.manager = this.repository.manager;
    this.metadata = this.repository.metadata;
    this.queryRunner = this.repository.queryRunner;
  }

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  get target(): Type<T> | string {
    return this.repository.target as Type<T> | string;
  }

  hasId(entity: T): boolean {
    return this.repository.hasId(entity);
  }

  getId(entity: T): T["id"] {
    return this.repository.getId(entity);
  }

  create(): T;
  create(entityLikeArray: DeepPartial<T>[]): T[];
  create(entityLike: DeepPartial<T>): T;
  create(entityLike?: DeepPartial<T>[] | DeepPartial<T>): T | T[] {
    if (entityLike == null) {
      return this.repository.create();
    }
    return this.repository.create(entityLike as never);
  }

  merge(mergeIntoEntity: T, ...entityLikes: DeepPartial<T>[]): T {
    return this.repository.merge(mergeIntoEntity, ...entityLikes);
  }

  preload(entityLike: DeepPartial<T>): Promise<T | undefined> {
    return this.repository.preload(entityLike);
  }

  save<I extends DeepPartial<T>>(
    entities: I[],
    options: SaveOptions & {
      reload: false;
    }
  ): Promise<I[]>;
  save<I extends DeepPartial<T>>(
    entities: I[],
    options?: SaveOptions
  ): Promise<(T & I)[]>;
  save<I extends DeepPartial<T>>(
    entity: I,
    options: SaveOptions & {
      reload: false;
    }
  ): Promise<I>;
  save<I extends DeepPartial<T>>(
    entity: I,
    options?: SaveOptions
  ): Promise<I & T>;
  save<I extends DeepPartial<T>>(
    entity: I[] | I,
    options?:
      | (SaveOptions & {
          reload: false;
        })
      | SaveOptions
  ): Promise<T[] | (I & T)[] | (I & T) | T> {
    return this.repository.save(entity as never, options) as never;
  }

  remove(entities: T[], options?: RemoveOptions): Promise<T[]>;
  remove(entity: T, options?: RemoveOptions): Promise<T>;
  remove(entity: T[] | T, options?: RemoveOptions): Promise<T[] | T> {
    return this.repository.remove(entity as never, options);
  }

  softRemove<I extends DeepPartial<T>>(
    entities: I[],
    options: SaveOptions & {
      reload: false;
    }
  ): Promise<I[]>;

  softRemove<I extends DeepPartial<T>>(
    entities: I[],
    options?: SaveOptions
  ): Promise<(I & T)[]>;

  softRemove<I extends DeepPartial<T>>(
    entity: I,
    options: SaveOptions & {
      reload: false;
    }
  ): Promise<I>;
  softRemove<I extends DeepPartial<T>>(
    entity: I,
    options?: SaveOptions
  ): Promise<I & T>;
  softRemove<I extends DeepPartial<T>>(
    entity: I[] | I,
    options?:
      | (SaveOptions & {
          reload: false;
        })
      | SaveOptions
  ): Promise<I[] | (I & T)[] | I | (I & T)> {
    return this.repository.softRemove(entity as never, options);
  }

  recover<I extends DeepPartial<T>>(
    entities: I[],
    options: SaveOptions & {
      reload: false;
    }
  ): Promise<I[]>;

  recover<I extends DeepPartial<T>>(
    entities: I[],
    options?: SaveOptions
  ): Promise<(I & T)[]>;
  recover<I extends DeepPartial<T>>(
    entity: I,
    options: SaveOptions & {
      reload: false;
    }
  ): Promise<I>;
  recover<I extends DeepPartial<T>>(
    entity: I,
    options?: SaveOptions
  ): Promise<I & T>;
  recover<I extends DeepPartial<T>>(
    entity: I[] | I,
    options?:
      | (SaveOptions & {
          reload: false;
        })
      | SaveOptions
  ): Promise<I[] | (I & T)[] | I | (I & T)> {
    return this.repository.recover(entity as never, options);
  }

  insert(
    entity: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]
  ): Promise<InsertResult> {
    return this.repository.insert(entity);
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    return this.repository.update(criteria, partialEntity);
  }

  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>
  ): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }

  softDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>
  ): Promise<UpdateResult> {
    return this.repository.softDelete(criteria);
  }

  restore(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>
  ): Promise<UpdateResult> {
    return this.repository.restore(criteria);
  }

  count(options?: FindManyOptions<T>): Promise<number>;
  count(conditions?: FindConditions<T>): Promise<number>;
  count(criteria?: FindManyOptions<T> | FindConditions<T>): Promise<number> {
    return this.repository.count(criteria as never);
  }

  find(options?: FindManyOptions<T>): Promise<T[]>;
  find(conditions?: FindConditions<T>): Promise<T[]>;
  find(criteria?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
    return this.repository.find(criteria as never);
  }

  findAndCount(options?: FindManyOptions<T>): Promise<[T[], number]>;
  findAndCount(conditions?: FindConditions<T>): Promise<[T[], number]>;
  findAndCount(
    criteria?: FindManyOptions<T> | FindConditions<T>
  ): Promise<[T[], number]> {
    return this.repository.findAndCount(criteria as never);
  }

  findByIds(ids: T["id"][], options?: FindManyOptions<T>): Promise<T[]>;
  findByIds(ids: T["id"][], conditions?: FindConditions<T>): Promise<T[]>;
  findByIds(
    ids: T["id"][],
    criteria?: FindManyOptions<T> | FindConditions<T>
  ): Promise<T[]> {
    return this.repository.findByIds(ids, criteria as never);
  }

  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>
  ): Promise<T | undefined>;
  findOne(options?: FindOneOptions<T>): Promise<T | undefined>;
  findOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T | undefined>;
  findOne(
    criteria?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<T>
      | FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T | undefined> {
    return this.repository.findOne(criteria as never, options);
  }

  findOneOrFail(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>
  ): Promise<T>;
  findOneOrFail(options?: FindOneOptions<T>): Promise<T>;
  findOneOrFail(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T>;
  findOneOrFail(
    criteria?:
      | string
      | number
      | Date
      | ObjectID
      | FindOneOptions<T>
      | FindConditions<T>,
    options?: FindOneOptions<T>
  ): Promise<T> {
    return this.repository.findOneOrFail(criteria as never, options);
  }

  query<O = unknown>(query: string, parameters?: unknown[]): Promise<O> {
    return this.repository.query(query, parameters);
  }

  clear(): Promise<void> {
    return this.repository.clear();
  }

  increment(
    conditions: FindConditions<T>,
    propertyPath: string,
    value: number | string
  ): Promise<UpdateResult> {
    return this.repository.increment(conditions, propertyPath, value);
  }

  decrement(
    conditions: FindConditions<T>,
    propertyPath: string,
    value: number | string
  ): Promise<UpdateResult> {
    return this.repository.decrement(conditions, propertyPath, value);
  }
}

export default Repository;
