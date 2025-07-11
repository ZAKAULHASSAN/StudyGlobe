
// SearchScreen.js - With Save Feature and working SavedScreen.js integration

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Linking,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Italy'];
const degrees = ['Bachelor', 'Master', 'PhD'];
const fields = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Arts', 'Science'];

const mockPrograms = [
  { id: 'p1', name: 'Computer Science BSc', country: 'UK', degree: 'Bachelor', field: 'Computer Science', description: 'A comprehensive undergraduate program covering computer systems, algorithms, and software development.', applyLink: 'https://ukuniversity.edu/cs-bsc' },
  { id: 'p2', name: 'Computer Science MSc', country: 'USA', degree: 'Master', field: 'Computer Science', description: 'Advanced studies in AI, data science, and systems design.', applyLink: 'https://usuniversity.edu/cs-msc' },
  { id: 'p3', name: 'Computer Engineering PhD', country: 'Australia', degree: 'PhD', field: 'Computer Science', description: 'Research-focused doctoral program in computer engineering and emerging technologies.', applyLink: 'https://ausuniversity.edu/cs-phd' },

  { id: 'p4', name: 'Business Administration BBA', country: 'USA', degree: 'Bachelor', field: 'Business', description: 'Undergraduate degree focusing on management, finance, and marketing.', applyLink: 'https://usuniversity.edu/business-bba' },
  { id: 'p5', name: 'Marketing MSc', country: 'UK', degree: 'Master', field: 'Business', description: 'Graduate program emphasizing strategic marketing and consumer behavior.', applyLink: 'https://ukuniversity.edu/marketing-msc' },
  { id: 'p6', name: 'Economics PhD', country: 'Germany', degree: 'PhD', field: 'Business', description: 'Doctoral research in economic theory and applied economics.', applyLink: 'https://germanyuniversity.edu/economics-phd' },

  { id: 'p7', name: 'Mechanical Engineering BEng', country: 'Germany', degree: 'Bachelor', field: 'Engineering', description: 'Bachelor’s degree focused on mechanics, materials, and manufacturing.', applyLink: 'https://germanyuniversity.edu/mecheng-beng' },
  { id: 'p8', name: 'Civil Engineering MEng', country: 'Canada', degree: 'Master', field: 'Engineering', description: 'Master’s program specializing in infrastructure and construction management.', applyLink: 'https://canadauniversity.edu/civil-meng' },
  { id: 'p9', name: 'Biomedical Engineering PhD', country: 'UK', degree: 'PhD', field: 'Engineering', description: 'Research doctorate in medical device design and healthcare technology.', applyLink: 'https://ukuniversity.edu/biomed-phd' },

  { id: 'p10', name: 'Medicine MBBS', country: 'Australia', degree: 'Bachelor', field: 'Medicine', description: 'Undergraduate medical degree with clinical practice.', applyLink: 'https://ausuniversity.edu/medicine-mbbs' },
  { id: 'p11', name: 'Public Health MSc', country: 'Canada', degree: 'Master', field: 'Medicine', description: 'Graduate program on epidemiology, health policy, and community health.', applyLink: 'https://canadauniversity.edu/publichealth-msc' },
  { id: 'p12', name: 'Medical Research PhD', country: 'USA', degree: 'PhD', field: 'Medicine', description: 'Doctoral research focused on biomedical sciences and clinical trials.', applyLink: 'https://usuniversity.edu/medresearch-phd' },

  { id: 'p13', name: 'Psychology BA', country: 'Canada', degree: 'Bachelor', field: 'Arts', description: 'Undergraduate program exploring human behavior and mental processes.', applyLink: 'https://canadauniversity.edu/psychology-ba' },
  { id: 'p14', name: 'International Relations MA', country: 'Australia', degree: 'Master', field: 'Arts', description: 'Graduate studies on diplomacy, politics, and global affairs.', applyLink: 'https://ausuniversity.edu/intrel-ma' },
  { id: 'p15', name: 'Philosophy PhD', country: 'Italy', degree: 'PhD', field: 'Arts', description: 'Advanced doctoral research in ethics, metaphysics, and logic.', applyLink: 'https://italyuniversity.edu/philosophy-phd' },

  { id: 'p16', name: 'Environmental Science BSc', country: 'Australia', degree: 'Bachelor', field: 'Science', description: 'Undergraduate studies on ecology, sustainability, and climate science.', applyLink: 'https://ausuniversity.edu/envsci-bsc' },
  { id: 'p17', name: 'Physics MSc', country: 'Canada', degree: 'Master', field: 'Science', description: 'Graduate program focusing on quantum mechanics, astrophysics, and materials.', applyLink: 'https://canadauniversity.edu/physics-msc' },
  { id: 'p18', name: 'Mathematics PhD', country: 'Germany', degree: 'PhD', field: 'Science', description: 'Doctoral research in pure and applied mathematics.', applyLink: 'https://germanyuniversity.edu/math-phd' },
];

const mockScholarships = [
  { id: 's1', name: 'Tech Innovators Scholarship', country: 'USA', degree: 'Master', field: 'Computer Science', description: 'Funding for graduate students innovating in technology.', applyLink: 'https://techscholarship.us/apply' },
  { id: 's2', name: 'AI Research Grant', country: 'UK', degree: 'PhD', field: 'Computer Science', description: 'Scholarship supporting AI doctoral candidates.', applyLink: 'https://airesearch.uk/apply' },

  { id: 's3', name: 'Global Leaders Scholarship', country: 'USA', degree: 'Master', field: 'Business', description: 'Award for outstanding business students worldwide.', applyLink: 'https://globalleaders.us/apply' },
  { id: 's4', name: 'Business Future Leaders', country: 'UK', degree: 'Bachelor', field: 'Business', description: 'Scholarship for undergraduate business talent.', applyLink: 'https://businessfuture.uk/apply' },

  { id: 's5', name: 'Engineering Research Fellowship', country: 'UK', degree: 'PhD', field: 'Engineering', description: 'Fellowship for doctoral engineering researchers.', applyLink: 'https://engresearch.uk/apply' },
  { id: 's6', name: 'STEM Excellence Award', country: 'Canada', degree: 'PhD', field: 'Engineering', description: 'Award recognizing excellence in STEM PhD programs.', applyLink: 'https://stemexcellence.ca/apply' },

  { id: 's7', name: 'Medical Scholars Award', country: 'USA', degree: 'Master', field: 'Medicine', description: 'Scholarship for graduate medical students.', applyLink: 'https://medscholars.us/apply' },
  { id: 's8', name: 'Health Science Grant', country: 'Canada', degree: 'PhD', field: 'Medicine', description: 'Grant supporting doctoral research in health sciences.', applyLink: 'https://healthgrant.ca/apply' },

  { id: 's9', name: 'Arts Talent Grant', country: 'UK', degree: 'Bachelor', field: 'Arts', description: 'Support for talented undergraduate arts students.', applyLink: 'https://artstalent.uk/apply' },
  { id: 's10', name: 'Creative Arts Scholarship', country: 'Italy', degree: 'Master', field: 'Arts', description: 'Scholarship for creative arts graduate programs.', applyLink: 'https://creativearts.it/apply' },

  { id: 's11', name: 'Science Innovation Scholarship', country: 'Germany', degree: 'Master', field: 'Science', description: 'Scholarship for innovative science graduate students.', applyLink: 'https://scienceinnovation.de/apply' },
  { id: 's12', name: 'Research Fellowship for PhDs', country: 'Germany', degree: 'PhD', field: 'Science', description: 'Fellowship supporting PhD research candidates.', applyLink: 'https://phdresearch.de/apply' },
];

export default function SearchScreen() {
  const [searchMode, setSearchMode] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [results, setResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = () => {
    if (!searchMode) {
      Alert.alert('Select Search Type', 'Please select Programs or Scholarships to search.');
      return;
    }
    const dataSource = searchMode === 'program' ? mockPrograms : mockScholarships;
    const filtered = dataSource.filter(item =>
      (selectedCountry === '' || item.country === selectedCountry) &&
      (selectedDegree === '' || item.degree === selectedDegree) &&
      (selectedField === '' || item.field === selectedField)
    );
    setResults(filtered);
  };

  const resetSearchMode = () => {
    setSearchMode(null);
    setResults([]);
    setSelectedCountry('');
    setSelectedDegree('');
    setSelectedField('');
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openDetails = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openLink = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Cannot open the link.');
        }
      })
      .catch(() => Alert.alert('Error', 'An unexpected error occurred.'));
  };

  const saveItem = async () => {
    try {
      const existing = await AsyncStorage.getItem('savedItems');
      let savedItems = existing ? JSON.parse(existing) : [];

      const newItem = {
        ...selectedItem,
        type: searchMode,
      };

      const alreadySaved = savedItems.some(item => item.id === newItem.id);
      if (alreadySaved) {
        Alert.alert('Already Saved', 'This item is already saved.');
        return;
      }

      savedItems.push(newItem);
      await AsyncStorage.setItem('savedItems', JSON.stringify(savedItems));
      Alert.alert('Saved', 'Item saved successfully!');
    } catch (error) {
      console.error('Saving failed', error);
      Alert.alert('Error', 'Failed to save the item.');
    }
  };

  if (!searchMode) {
    return (
      <View style={styles.initialContainer}>
        <Text style={styles.welcomeText}>Welcome to StudyGlobe Search</Text>
        <Text style={styles.infoText}>Choose what you want to search for:</Text>

        <TouchableOpacity
          style={[styles.selectionButton, { backgroundColor: '#2563EB' }]}
          onPress={() => setSearchMode('program')}
        >
          <Text style={styles.selectionButtonText}>Search Programs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.selectionButton, { backgroundColor: '#FBBF24' }]}
          onPress={() => setSearchMode('scholarship')}
        >
          <Text style={styles.selectionButtonText}>Search Scholarships</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={resetSearchMode} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={20} color="#2563EB" style={{ marginRight: 6 }} />
        <Text style={styles.backBtnText}>Change Search Type</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {searchMode === 'program' ? 'Search Programs' : 'Search Scholarships'}
      </Text>

      <Text style={styles.label}>Country</Text>
      <Picker selectedValue={selectedCountry} onValueChange={setSelectedCountry} style={styles.picker}>
        <Picker.Item label="Select country" value="" />
        {countries.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <Text style={styles.label}>Degree Level</Text>
      <Picker selectedValue={selectedDegree} onValueChange={setSelectedDegree} style={styles.picker}>
        <Picker.Item label="Select degree" value="" />
        {degrees.map(d => <Picker.Item key={d} label={d} value={d} />)}
      </Picker>

      <Text style={styles.label}>Field of Study</Text>
      <Picker selectedValue={selectedField} onValueChange={setSelectedField} style={styles.picker}>
        <Picker.Item label="Select field" value="" />
        {fields.map(f => <Picker.Item key={f} label={f} value={f} />)}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      <Text style={styles.resultsTitle}>Results ({results.length})</Text>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultCard} onPress={() => openDetails(item)}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultDetails}>
              {item.degree} | {item.field} | {item.country}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
              <Text style={styles.modalSubtitle}>
                {selectedItem?.degree} | {selectedItem?.field} | {selectedItem?.country}
              </Text>
              <Text style={styles.modalDescription}>{selectedItem?.description}</Text>

              <TouchableOpacity style={styles.applyButton} onPress={() => openLink(selectedItem?.applyLink)}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.applyButton, { backgroundColor: '#10B981' }]} onPress={saveItem}>
                <Text style={styles.applyButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={closeDetails}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  


  initialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#374151',
    textAlign: 'center',
  },
  selectionButton: {
    width: '80%',
    paddingVertical: 18,
    borderRadius: 14,
    marginVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  selectionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  container: {
    flex: 1,
    paddingVertical: 35,
    padding: 20,
    backgroundColor: '#fff',
  },

  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backBtnText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
    marginBottom: 6,
  },

  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#FBBF24',
    marginTop: 20,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1E3A8A',
  },

  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 30,
    color: '#1E3A8A',
  },

  resultCard: {
    marginTop: 12,
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 12,
  },

  resultName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1E3A8A',
  },

  resultDetails: {
    marginTop: 4,
    color: '#374151',
  },

  noResults: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#6B7280',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 8,
    textAlign: 'center',
  },

  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalDescription: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 20,
  },

  applyButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },

  applyButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },

  closeButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 16,
  },
});
