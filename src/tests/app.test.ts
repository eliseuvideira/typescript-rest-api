import request from './request';

describe('app', () => {
  it('should be running without errors', async () => {
    expect.assertions(1);
    const response = await request().options('/');
    expect(response.status).toBe(204);
  });

  it('should allow cors', async () => {
    expect.assertions(1);
    const response = await request().options('/');
    expect(response.header['access-control-allow-origin']).toBe('*');
  });

  it('should return 404 for not found', async () => {
    expect.assertions(1);
    const response = await request().head('/not-found');
    expect(response.status).toBe(404);
  });
});
