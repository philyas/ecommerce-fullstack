import mongoose, { Document, Schema } from 'mongoose';

export interface IShoppingItem {
  name: string;
  bought: boolean;
  createdAt: Date;
}

export interface IShoppingItemDocument extends IShoppingItem, Document {}

const ShoppingItemSchema = new Schema<IShoppingItemDocument>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [1, 'Product name cannot be empty'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    bought: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const ShoppingItem = mongoose.model<IShoppingItemDocument>(
  'ShoppingItem',
  ShoppingItemSchema
);
