import { FilterQuery, SortOrder as MongoSortOrder } from 'mongoose';
import { Lead } from '../models';
import { ILeadDocument, ILeadQuery, ILeadCreateRequest, ILeadUpdateRequest, PaginationMeta } from '../interfaces';
import { PAGINATION, SORT_ORDER } from '../constants';
import { NotFoundError } from '../utils';

interface LeadListResult {
  leads: ILeadDocument[];
  pagination: PaginationMeta;
}

export class LeadService {
  static buildFilterQuery(query: ILeadQuery): FilterQuery<ILeadDocument> {
    const filter: FilterQuery<ILeadDocument> = {};

    if (query.status) {
      filter.status = query.status;
    }

    if (query.source) {
      filter.source = query.source;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    return filter;
  }

  static buildSortQuery(sort?: string): Record<string, MongoSortOrder> {
    if (sort === SORT_ORDER.OLDEST) {
      return { createdAt: 1 };
    }
    return { createdAt: -1 }; // default latest
  }

  static async getAll(query: ILeadQuery): Promise<LeadListResult> {
    const page = Math.max(query.page ?? PAGINATION.DEFAULT_PAGE, 1);
    const limit = Math.min(
      Math.max(query.limit ?? PAGINATION.DEFAULT_LIMIT, 1),
      PAGINATION.MAX_LIMIT
    );
    const skip = (page - 1) * limit;

    const filter = LeadService.buildFilterQuery(query);
    const sortQuery = LeadService.buildSortQuery(query.sort);

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sortQuery).skip(skip).limit(limit),
      Lead.countDocuments(filter),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      leads,
      pagination: { total, page, pages, limit },
    };
  }

  static async getById(id: string): Promise<ILeadDocument> {
    const lead = await Lead.findById(id);
    if (!lead) {
      throw new NotFoundError('Lead');
    }
    return lead;
  }

  static async create(data: ILeadCreateRequest): Promise<ILeadDocument> {
    return Lead.create(data);
  }

  static async update(id: string, data: ILeadUpdateRequest): Promise<ILeadDocument> {
    const lead = await Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!lead) {
      throw new NotFoundError('Lead');
    }
    return lead;
  }

  static async delete(id: string): Promise<void> {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      throw new NotFoundError('Lead');
    }
  }

  static async getFilteredForExport(query: ILeadQuery): Promise<ILeadDocument[]> {
    const filter = LeadService.buildFilterQuery(query);
    const sortQuery = LeadService.buildSortQuery(query.sort);
    return Lead.find(filter).sort(sortQuery);
  }
}
