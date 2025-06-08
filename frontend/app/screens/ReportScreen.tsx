import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PhotoPicker from '../../components/PhotoPicker';
import PhotoItem from '../../components/PhotoItem';
import { ReportFormData, PhotoData, Location, ReportData } from '../../types/report';
import { locationService } from '../../utils/services/locationService';

interface ReportScreenProps {
  onSubmitSuccess?: (report: ReportData) => void;
}

const ReportScreen: React.FC<ReportScreenProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    description: '',
    photos: [],
    location: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const location = await locationService.getCurrentLocation();
      setFormData(prev => ({ ...prev, location }));
    } catch (error) {
      console.warn('Failed to get current location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleInputChange = (field: keyof ReportFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoSelected = (photo: PhotoData) => {
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, photo],
    }));

    // If photo has location and we don't have a current location, use photo's location
    if (photo.location && !formData.location) {
      setFormData(prev => ({ ...prev, location: photo.location }));
    }
  };

  const handlePhotoRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.photos.length === 0) {
      newErrors.photos = 'At least one photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      const report: ReportData = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        photos: formData.photos,
        location: formData.location,
        timestamp: Date.now(),
        status: 'submitted',
      };

      Alert.alert(
        'Success',
        'Your report has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              onSubmitSuccess?.(report);
              // Reset form
              setFormData({
                title: '',
                description: '',
                photos: [],
                location: null,
              });
              getCurrentLocation();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Report</Text>
          <Text style={styles.subtitle}>Document and report incidents with photos</Text>
        </View>

        <View style={styles.form}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Title <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              placeholder="Enter report title"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
              maxLength={100}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.textArea, errors.description && styles.inputError]}
              placeholder="Describe the incident in detail..."
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.characterCount}>
              {formData.description.length}/1000
            </Text>
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>

          {/* Photos Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Photos <Text style={styles.required}>*</Text>
            </Text>
            <PhotoPicker
              onPhotoSelected={handlePhotoSelected}
              disabled={isSubmitting}
            />
            {formData.photos.map((photo, index) => (
              <PhotoItem
                key={`${photo.uri}-${index}`}
                photo={photo}
                onRemove={() => handlePhotoRemove(index)}
              />
            ))}
            {errors.photos && <Text style={styles.errorText}>{errors.photos}</Text>}
          </View>

          {/* Location Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.locationContainer}>
              {isLoadingLocation ? (
                <View style={styles.locationLoading}>
                  <ActivityIndicator size="small" color="#6366f1" />
                  <Text style={styles.locationLoadingText}>Getting location...</Text>
                </View>
              ) : formData.location ? (
                <View style={styles.locationInfo}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.locationText}>
                    {locationService.formatLocation(formData.location)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.noLocationText}>No location available</Text>
              )}
              
              <TouchableOpacity
                style={styles.refreshLocationButton}
                onPress={getCurrentLocation}
                disabled={isLoadingLocation}
              >
                <Text style={styles.refreshLocationText}>🔄</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Report</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#111827',
    minHeight: 100,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  characterCount: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  locationLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationLoadingText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#059669',
    flex: 1,
    lineHeight: 20,
  },
  noLocationText: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    flex: 1,
  },
  refreshLocationButton: {
    padding: 4,
  },
  refreshLocationText: {
    fontSize: 16,
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#d1d5db',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default ReportScreen;