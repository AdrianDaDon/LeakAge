import { PhotoData, ImagePickerResult } from '../../types/report';
import { locationService } from './locationService';

export const imageService = {
  async pickImageFromCamera(): Promise<PhotoData | null> {
    // Simulate camera capture
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResult: ImagePickerResult = {
      cancelled: false,
      uri: `file:///mock/camera/image_${Date.now()}.jpg`,
      width: 1920,
      height: 1080,
      fileSize: 2048000, // 2MB
      fileName: `camera_${Date.now()}.jpg`,
      type: 'image/jpeg',
    };

    if (mockResult.cancelled || !mockResult.uri) {
      return null;
    }

    // Extract location from image EXIF data
    const location = await locationService.extractLocationFromImage(mockResult.uri);

    return {
      uri: mockResult.uri,
      width: mockResult.width || 0,
      height: mockResult.height || 0,
      fileSize: mockResult.fileSize,
      fileName: mockResult.fileName,
      type: mockResult.type,
      location,
    };
  },

  async pickImageFromGallery(): Promise<PhotoData | null> {
    // Simulate gallery selection
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockResult: ImagePickerResult = {
      cancelled: false,
      uri: `file:///mock/gallery/image_${Date.now()}.jpg`,
      width: 1600,
      height: 1200,
      fileSize: 1536000, // 1.5MB
      fileName: `gallery_${Date.now()}.jpg`,
      type: 'image/jpeg',
    };

    if (mockResult.cancelled || !mockResult.uri) {
      return null;
    }

    // Extract location from image EXIF data
    const location = await locationService.extractLocationFromImage(mockResult.uri);

    return {
      uri: mockResult.uri,
      width: mockResult.width || 0,
      height: mockResult.height || 0,
      fileSize: mockResult.fileSize,
      fileName: mockResult.fileName,
      type: mockResult.type,
      location,
    };
  },

  async compressImage(photoData: PhotoData, quality: number = 0.8): Promise<PhotoData> {
    // Simulate image compression
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      ...photoData,
      fileSize: photoData.fileSize ? Math.floor(photoData.fileSize * quality) : undefined,
    };
  },

  formatFileSize(bytes?: number): string {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  },
};