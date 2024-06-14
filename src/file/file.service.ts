import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
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
    const fileName = `image-${file.originalname}`;

    const path = join(this.uploadPath, fileName);
    try {
      await fs.writeFile(path, file.buffer);
      return `http://localhost:3000/uploads/${fileName}`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
