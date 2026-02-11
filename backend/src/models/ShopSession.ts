import mongoose, { Document, Schema } from 'mongoose';

export interface IShopSession {
  shop: string;
  accessToken: string;
  updatedAt: Date;
}

export interface IShopSessionDocument extends IShopSession, Document {}

const ShopSessionSchema = new Schema<IShopSessionDocument>(
  {
    shop: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ShopSession = mongoose.model<IShopSessionDocument>(
  'ShopSession',
  ShopSessionSchema
);
