// SavedScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function SavedScreen() {
  const [savedItems, setSavedItems] = useState([]);

  const fetchSaved = async () => {
    try {
      const stored = await AsyncStorage.getItem('savedItems');
      if (stored) {
        setSavedItems(JSON.parse(stored));
      } else {
        setSavedItems([]);
      }
    } catch (err) {
      console.error('Error loading saved items', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSaved();
    }, [])
  );

  const openLink = (url) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open link.');
        }
      })
      .catch(() => Alert.alert('Error', 'Something went wrong.'));
  };

  const clearSavedItems = async () => {
    try {
      await AsyncStorage.removeItem('savedItems');
      setSavedItems([]);
    } catch (err) {
      console.error('Error clearing saved items', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Programs & Scholarships ({savedItems.length})</Text>

      {savedItems.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearSavedItems}>
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={savedItems}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>
              {item.degree} | {item.field} | {item.country}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
            <TouchableOpacity style={styles.applyBtn} onPress={() => openLink(item.applyLink)}>
              <Text style={styles.applyText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No saved items found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', color: '#1E3A8A', marginBottom: 16 },
  card: {
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#1E3A8A' },
  details: { marginTop: 4, color: '#374151' },
  description: { marginTop: 8, color: '#4B5563' },
  applyBtn: {
    marginTop: 12,
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  empty: { marginTop: 24, textAlign: 'center', color: '#6B7280' },
  clearBtn: {
    backgroundColor: '#F87171',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  clearBtnText: { color: '#fff', fontWeight: '600' },
});
