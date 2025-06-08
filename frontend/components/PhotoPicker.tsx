import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { PhotoData } from '../types/report';
import { imageService } from '../utils/services/imageService';

interface PhotoPickerProps {
  onPhotoSelected: (photo: PhotoData) => void;
  disabled?: boolean;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ onPhotoSelected, disabled = false }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const handleCameraPress = async () => {
    setIsModalVisible(false);
    setIsLoading(true);
    setLoadingText('Taking photo...');

    try {
      const photo = await imageService.pickImageFromCamera();
      if (photo) {
        setLoadingText('Extracting location...');
        onPhotoSelected(photo);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingText('');
    }
  };

  const handleGalleryPress = async () => {
    setIsModalVisible(false);
    setIsLoading(true);
    setLoadingText('Selecting photo...');

    try {
      const photo = await imageService.pickImageFromGallery();
      if (photo) {
        setLoadingText('Extracting location...');
        onPhotoSelected(photo);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select photo. Please try again.');
    } finally {
      setIsLoading(false);
      setLoadingText('');
    }
  };

  const showImagePicker = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.addButton, disabled && styles.addButtonDisabled]}
        onPress={showImagePicker}
        disabled={disabled || isLoading}
      >
        <Text style={styles.addButtonIcon}>📷</Text>
        <Text style={styles.addButtonText}>Add Photo</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Photo Source</Text>
            
            <TouchableOpacity style={styles.modalButton} onPress={handleCameraPress}>
              <Text style={styles.modalButtonIcon}>📸</Text>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalButton} onPress={handleGalleryPress}>
              <Text style={styles.modalButtonIcon}>🖼️</Text>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isLoading} transparent>
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContent}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>{loadingText}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  modalButtonIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#fee2e2',
    marginTop: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    minWidth: 200,
  },
  loadingText: {
    fontSize: 16,
    color: '#374151',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default PhotoPicker;