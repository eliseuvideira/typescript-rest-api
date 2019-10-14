import Database from '../helpers/database';
import Resource from '../helpers/resource';
import User from './user';

describe('User', () => {
  const userData = Resource.get('user');

  beforeAll(async () => {
    await Database.connect();
  });

  afterAll(async () => {
    await Database.disconnect();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should insert an user', async () => {
    expect.assertions(2);
    const { _id, username, password, email } = (await new User(
      userData,
    ).save()) as any;
    expect(_id).toBeDefined();
    expect({ username, password, email }).toEqual(userData);
  });

  it('should retrieve an user', async () => {
    expect.assertions(1);
    const { _id } = await new User(userData).save();
    const { username, password, email } = (await User.findById(_id)) as any;
    expect({ username, password, email }).toEqual(userData);
  });

  it('should update an user', async () => {
    expect.assertions(1);
    const { _id } = (await new User(userData).save()) as any;
    const user = (await User.findById(_id)) as any;
    user.username = 'new_username';
    await user.save();
    const { username } = (await User.findById(_id)) as any;
    expect(username).toBe(user.username);
  });

  it('should delete an user', async () => {
    expect.assertions(2);
    const { _id } = (await new User(userData).save()) as any;
    expect(await User.countDocuments()).toBe(1);
    await User.findByIdAndDelete(_id);
    expect(await User.countDocuments()).toBe(0);
  });
});
