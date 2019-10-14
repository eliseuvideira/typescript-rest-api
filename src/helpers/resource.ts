import fs from 'fs';
import path from 'path';

abstract class Resource {
  public static get(name: string) {
    const filePath = path.join(__dirname, '..', 'resources', `${name}.json`);
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
}

export default Resource;
