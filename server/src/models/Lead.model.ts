import mongoose, { Schema } from 'mongoose';
import { ILeadDocument } from '../interfaces';
import { LEAD_STATUS, LEAD_SOURCE } from '../constants';

const leadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
    },
    source: {
      type: String,
      enum: Object.values(LEAD_SOURCE),
      required: [true, 'Source is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        ret['__v'] = undefined;
        return ret;
      },
    },
  }
);

// Index for search performance
leadSchema.index({ name: 'text', email: 'text' });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.model<ILeadDocument>('Lead', leadSchema);
