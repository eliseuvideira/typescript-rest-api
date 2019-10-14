import { Document, model, Schema } from 'mongoose';

interface ICustomerAddress {
  street: string;
  city: string;
  state: string;
}

export interface ICustomerDocument extends Document {
  name: string;
  address: ICustomerAddress;
}

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Customer = model<ICustomerDocument>('Customer', customerSchema);

export default Customer;
