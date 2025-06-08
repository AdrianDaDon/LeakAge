import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ReportScreen from './screens/ReportScreen';
import { ReportData } from '../types/report';

const DescriptionScreen: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'report' | 'success'>('report');
  const [submittedReport, setSubmittedReport] = useState<ReportData | null>(null);

  const handleSubmitSuccess = (report: ReportData) => {
    setSubmittedReport(report);
    setCurrentScreen('success');
  };

  const handleCreateNewReport = () => {
    setSubmittedReport(null);
    setCurrentScreen('report');
  };

  if (currentScreen === 'success' && submittedReport) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.successContent}>
          <Text style={styles.successIcon}>✅</Text>
          <Text style={styles.successTitle}>Report Submitted!</Text>
          <Text style={styles.successMessage}>
            Your report has been successfully submitted and is being processed.
          </Text>
          
          <View style={styles.reportSummary}>
            <Text style={styles.summaryTitle}>Report Summary:</Text>
            <Text style={styles.summaryItem}>Title: {submittedReport.title}</Text>
            <Text style={styles.summaryItem}>Photos: {submittedReport.photos.length}</Text>
            <Text style={styles.summaryItem}>
              Location: {submittedReport.location ? 'Included' : 'Not available'}
            </Text>
            <Text style={styles.summaryItem}>
              Report ID: {submittedReport.id}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.newReportButton}
            onPress={handleCreateNewReport}
          >
            <Text style={styles.newReportButtonText}>Create New Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return <ReportScreen onSubmitSuccess={handleSubmitSuccess} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  successContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  reportSummary: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  summaryItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  newReportButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  newReportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default DescriptionScreen;