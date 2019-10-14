import Database from '../helpers/database';
import Resource from '../helpers/resource';
import Customer, { ICustomerDocument } from './customer';
import Order from './order';
import Product, { IProductDocument } from './product';

describe('Order', () => {
  let data: any;
  const customerData = Resource.get('customer');
  const productData = Resource.get('product');
  let customer: ICustomerDocument;
  let product: IProductDocument;

  beforeAll(async () => {
    await Database.connect();
    customer = await new Customer(customerData).save();
    product = await new Product(productData).save();
    data = {
      customer,
      items: [{ product, price: 10, quantity: 10 }],
    };
  });

  afterAll(async () => {
    Product.deleteMany({});
    Customer.deleteMany({});
    await Database.disconnect();
  });

  afterEach(async () => {
    await Order.deleteMany({});
  });

  it('should insert an order', async () => {
    expect.assertions(1);
    const order = new Order(data);
    const { _id } = await order.save();
    expect(_id).toBeDefined();
  });

  it('should retrieve an order', async () => {
    expect.assertions(3);
    const { _id } = (await new Order(data).save()) as any;
    const order = (await Order.findById(_id)) as any;
    expect(order.customer).toEqual(customer._id);
    expect(order.items.length).toBe(1);
    expect(
      Array.from(
        order.items.map((item: any) => ({
          price: item.price,
          quantity: item.quantity,
          product: item.product._id.toString(),
        })),
      ),
    ).toEqual(
      data.items.map((item: any) => ({
        price: item.price,
        quantity: item.quantity,
        product: item.product._id.toString(),
      })),
    );
  });

  it('should update an order', async () => {
    expect.assertions(1);
    const { _id } = (await new Order(data).save()) as any;
    const order = (await Order.findById(_id)) as any;
    order.items.push({
      product: await new Product(productData).save(),
      price: 1,
      quantity: 1,
    });
    await order.save();
    const { items } = (await Order.findById(_id)) as any;
    expect(items.length).toBe(order.items.length);
  });

  it('should delete an order', async () => {
    expect.assertions(2);
    const { _id } = (await new Order(data).save()) as any;
    expect(await Order.countDocuments()).toBe(1);
    await Order.findByIdAndDelete(_id);
    expect(await Order.countDocuments()).toBe(0);
  });
});
