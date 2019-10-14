import Database from '../helpers/database';
import Resource from '../helpers/resource';
import Customer from './customer';

describe('Customer', () => {
  const data = Resource.get('customer');

  beforeAll(async () => {
    await Database.connect();
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  afterEach(async () => {
    await Customer.deleteMany({});
  });

  it('should insert an customer', async () => {
    expect.assertions(2);
    const { _id, name, address } = (await new Customer(data).save()) as any;
    expect(_id).toBeDefined();
    expect({ name, address }).toEqual(data);
  });

  it('should retrieve an customer', async () => {
    expect.assertions(1);
    const { _id } = (await new Customer(data).save()) as any;
    const {
      name,
      address: { street, city, state },
    } = (await Customer.findById(_id)) as any;
    expect({ name, address: { street, city, state } }).toEqual(data);
  });

  it('should update an customer', async () => {
    expect.assertions(1);
    const { _id } = (await new Customer(data).save()) as any;
    const customer = (await Customer.findById(_id)) as any;
    customer.name = 'new name';
    await customer.save();
    const { name } = (await Customer.findById(_id)) as any;
    expect(name).toBe(customer.name);
  });

  it('should delete an customer', async () => {
    expect.assertions(2);
    const { _id } = (await new Customer(data).save()) as any;
    expect(await Customer.countDocuments()).toBe(1);
    await Customer.findByIdAndDelete(_id);
    expect(await Customer.countDocuments()).toBe(0);
  });
});
