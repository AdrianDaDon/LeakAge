import { Location } from '../../types/report';

// Mock location service - replace with actual implementation
export const locationService = {
  async getCurrentLocation(): Promise<Location> {
    // Simulate getting current location
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock coordinates (San Francisco)
    const mockLocation: Location = {
      latitude: 37.7749,
      longitude: -122.4194,
      timestamp: Date.now(),
    };

    try {
      // Get address from coordinates
      const address = await this.reverseGeocode(mockLocation.latitude, mockLocation.longitude);
      return { ...mockLocation, address };
    } catch (error) {
      return mockLocation;
    }
  },

  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    // Simulate reverse geocoding
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock address
    return "123 Main Street, San Francisco, CA 94102, USA";
  },

  async extractLocationFromImage(imageUri: string): Promise<Location | null> {
    // Simulate extracting EXIF location data from image
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock location extraction (in real app, use EXIF data)
    const hasLocation = Math.random() > 0.3; // 70% chance of having location
    
    if (!hasLocation) {
      return null;
    }

    const mockLocation: Location = {
      latitude: 37.7749 + (Math.random() - 0.5) * 0.01,
      longitude: -122.4194 + (Math.random() - 0.5) * 0.01,
      timestamp: Date.now(),
    };

    try {
      const address = await this.reverseGeocode(mockLocation.latitude, mockLocation.longitude);
      return { ...mockLocation, address };
    } catch (error) {
      return mockLocation;
    }
  },

  formatLocation(location: Location): string {
    if (location.address) {
      return location.address;
    }
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  },
};