import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Parser } from '@json2csv/plainjs';
import { LeadService } from '../services';
import { ILeadQuery } from '../interfaces';
import { asyncHandler, sendSuccess, sendPaginated } from '../utils';

export class LeadController {
  static getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query: ILeadQuery = {
      status: req.query.status as ILeadQuery['status'],
      source: req.query.source as ILeadQuery['source'],
      search: req.query.search as string | undefined,
      sort: req.query.sort as ILeadQuery['sort'],
      page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
      limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
    };

    const result = await LeadService.getAll(query);
    sendPaginated(res, result.leads, result.pagination, 'Leads retrieved successfully');
  });

  static getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lead = await LeadService.getById(req.params.id);
    sendSuccess(res, lead, 'Lead retrieved successfully');
  });

  static create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lead = await LeadService.create(req.body);
    sendSuccess(res, lead, 'Lead created successfully', StatusCodes.CREATED);
  });

  static update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const lead = await LeadService.update(req.params.id, req.body);
    sendSuccess(res, lead, 'Lead updated successfully');
  });

  static delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    await LeadService.delete(req.params.id);
    sendSuccess(res, null, 'Lead deleted successfully');
  });

  static exportCsv = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const query: ILeadQuery = {
      status: req.query.status as ILeadQuery['status'],
      source: req.query.source as ILeadQuery['source'],
      search: req.query.search as string | undefined,
      sort: req.query.sort as ILeadQuery['sort'],
    };

    const leads = await LeadService.getFilteredForExport(query);

    const fields = [
      { label: 'Name', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Status', value: 'status' },
      { label: 'Source', value: 'source' },
      { label: 'Created At', value: 'createdAt' },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(StatusCodes.OK).send(csv);
  });
}
