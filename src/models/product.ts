import { Document, model, Schema } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  price: number;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProductDocument>('Product', productSchema);

export default Product;
