import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { PhotoData } from '../types/report';
import { imageService } from '../utils/services/imageService';
import { locationService } from '../utils/services/locationService';

interface PhotoItemProps {
  photo: PhotoData;
  onRemove: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo, onRemove }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo.uri }} style={styles.image} />
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.fileName} numberOfLines={1}>
          {photo.fileName || 'Unknown file'}
        </Text>
        
        <Text style={styles.fileSize}>
          {imageService.formatFileSize(photo.fileSize)}
        </Text>
        
        {photo.location ? (
          <View style={styles.locationContainer}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {locationService.formatLocation(photo.location)}
            </Text>
          </View>
        ) : (
          <Text style={styles.noLocationText}>No location data</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    gap: 4,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  fileSize: {
    fontSize: 12,
    color: '#6b7280',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
    marginTop: 1,
  },
  locationText: {
    fontSize: 12,
    color: '#059669',
    flex: 1,
    lineHeight: 16,
  },
  noLocationText: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});

export default PhotoItem;