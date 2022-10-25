/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model, Document, Types } from 'mongoose';

interface MongoosePopulate {
  path: string;
  model: string;
}
class MongooseOptions {
  sort?: string; // - or + fieldName
  limit?: number; // > 0
  skip?: number; // > 0
}

@Injectable()
export default class MongooseRepository<T> {
  model: Model<T & Document>;

  constructor(model: Model<T & Document>) {
    this.model = model;
  }

  public async getFirst(
    conditions: any,
    projection: any = {},
  ): Promise<T & Document> {
    return await this.model.findOne(conditions, projection);
  }

  public async getLast(conditions: any): Promise<T & Document> {
    return await this.model.findOne(conditions).sort({ _id: -1 }).limit(1);
  }

  public async getByIds(
    ids: string[] | Types.ObjectId[],
  ): Promise<(T & Document)[]> {
    return await this.model.find().where('_id').in(ids).exec();
  }

  public async deleteById(id: string | Types.ObjectId): Promise<boolean> {
    return !!(await this.model.findByIdAndDelete(id));
  }

  public async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }

  public async insert(obj: T): Promise<T & Document> {
    return await new this.model(obj).save();
  }

  public async updateById(
    id: string | Types.ObjectId,
    obj: any,
    populate?: MongoosePopulate,
  ): Promise<T & Document> {
    const doc = await this.model.findByIdAndUpdate(id, obj, {
      new: true,
    });
    if (populate) await doc.populate(populate);
    return doc;
  }

  public async update(
    obj: any,
    populate?: MongoosePopulate,
  ): Promise<T & Document> {
    const doc = await this.model.findByIdAndUpdate(obj._id, obj, {
      new: true,
    });
    if (populate) await doc.populate(populate);
    return doc;
  }

  public async getById(
    _id: string | Types.ObjectId,
    populate?: MongoosePopulate,
  ): Promise<(T & Document) | null> {
    const doc = await this.model.findById(_id);
    if (doc && populate) await doc.populate(populate);
    return doc;
  }

  public async getAll(
    filter: {} = {},
    projection: any = {},
    options: MongooseOptions = { skip: 0, limit: 0 },
  ): Promise<T[]> {
    return await this.model
      .find(filter, projection)
      .sort(options.sort)
      .limit(options.limit)
      .skip(options.skip)
      .exec();
  }

  public async searchAndPaginate(
    searchQuery: object[] = [],
    options: MongooseOptions = { skip: 0, limit: 0 },
  ): Promise<(T & Document)[]> {
    let query = this.model
      .find()
      .sort(options.sort)
      .limit(options.limit)
      .skip(options.skip);

    if (searchQuery.length > 0) query = query.and(searchQuery);

    return await query.exec();
  }

  public async getDocumentsCount(searchQuery?: object[]): Promise<number> {
    let query = this.model.find();

    if (searchQuery.length > 0) {
      query = query.and(searchQuery);
    }

    return await query.countDocuments().exec();
  }
}
