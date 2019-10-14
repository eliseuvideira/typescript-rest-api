import Database from '../helpers/database';
import Resource from '../helpers/resource';
import Product from './product';

describe('Product', () => {
  const data = Resource.get('product');

  beforeAll(async () => {
    await Database.connect();
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  it('should insert an product', async () => {
    expect.assertions(2);
    const { _id, name, price } = (await new Product(data).save()) as any;
    expect(_id).toBeDefined();
    expect({ name, price }).toEqual(data);
  });

  it('should retrieve an product', async () => {
    expect.assertions(1);
    const { _id } = (await new Product(data).save()) as any;
    const { name, price } = (await Product.findById(_id)) as any;
    expect({ name, price }).toEqual(data);
  });

  it('should update an product', async () => {
    expect.assertions(1);
    const { _id } = (await new Product(data).save()) as any;
    const product = (await Product.findById(_id)) as any;
    product.name = 'new product';
    await product.save();
    const { name } = (await Product.findById(_id)) as any;
    expect(name).toBe(product.name);
  });

  it('should delete an product', async () => {
    expect.assertions(2);
    const { _id } = (await new Product(data).save()) as any;
    expect(await Product.countDocuments()).toBe(1);
    await Product.findByIdAndDelete(_id);
    expect(await Product.countDocuments()).toBe(0);
  });
});
