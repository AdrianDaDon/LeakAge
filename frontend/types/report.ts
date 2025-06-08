export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: number;
}

export interface PhotoData {
  uri: string;
  width: number;
  height: number;
  fileSize?: number;
  fileName?: string;
  type?: string;
  location?: Location;
}

export interface ReportData {
  id: string;
  title: string;
  description: string;
  photos: PhotoData[];
  location: Location | null;
  timestamp: number;
  status: 'draft' | 'submitted' | 'processing' | 'completed';
}

export interface ReportFormData {
  title: string;
  description: string;
  photos: PhotoData[];
  location: Location | null;
}

export interface ImagePickerResult {
  cancelled: boolean;
  uri?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  fileName?: string;
  type?: string;
  exif?: any;
}