import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class FileService {
  private readonly uploadPath = './uploads';

  constructor() {
    this.ensureUploadPathExists();
  }

  private async ensureUploadPathExists(): Promise<void> {
    try {
      fs.mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error('Error creating upload directory:', error);
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileName = extname(file.originalname);

    const path = join(this.uploadPath, fileName);
    await fs.writeFile(path, file.buffer);

    return `http://localhost:3000/uploads/${fileName}`;
  }
}
