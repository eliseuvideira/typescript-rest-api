import { Document, model, Schema, Types } from 'mongoose';
import { ICustomerDocument } from './customer';
import { IProductDocument } from './product';

export interface IOrderDocument extends Document {
  customer: ICustomerDocument;
  items: IProductDocument[];
}

const orderSchema = new Schema(
  {
    customer: {
      type: Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    items: [
      {
        product: {
          type: Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Order = model<IOrderDocument>('Order', orderSchema);

export default Order;
