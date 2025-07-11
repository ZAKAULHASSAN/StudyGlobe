import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data for preview on Home
const recentPrograms = [
  { id: 'p1', name: 'Computer Science MSc', country: 'UK', university: 'University of London' },
  { id: 'p2', name: 'Business Administration BBA', country: 'USA', university: 'NYU Stern' },
  { id: 'p3', name: 'Data Science PhD', country: 'Germany', university: 'TU Munich' },
];

const recentScholarships = [
  { id: 's1', name: 'Global Leaders Scholarship', country: 'USA', amount: '$20,000' },
  { id: 's2', name: 'STEM Excellence Award', country: 'Canada', amount: 'Full Tuition' },
  { id: 's3', name: 'Women in Tech Grant', country: 'UK', amount: '£15,000' },
];

export default function HomeScreen({ navigation }) {
  const userName = 'ZACK';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.userName}>{userName}!</Text>
        <Text style={styles.subtitle}>Discover your perfect program and funding opportunities</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <LinearGradient
          colors={['#4F46E5', '#7C3AED']}
          style={[styles.statCard, styles.statCardPrimary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statCardTitle}>Programs</Text>
          <Text style={styles.statCardValue}>25+</Text>
          <Text style={styles.statCardSubtitle}>Available</Text>
        </LinearGradient>

        <LinearGradient
          colors={['#F59E0B', '#F97316']}
          style={[styles.statCard, styles.statCardSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.statCardTitle}>Scholarships</Text>
          <Text style={styles.statCardValue}>10+</Text>
          <Text style={styles.statCardSubtitle}>Available</Text>
        </LinearGradient>
      </View>

      {/* Recent Programs Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Viewed Programs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentPrograms}
          contentContainerStyle={styles.listContent}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemCard}>
              <View style={styles.itemCardContent}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemUniversity} numberOfLines={1}>{item.university}</Text>
                <View style={styles.itemLocation}>
                  <Text style={styles.itemCountry}>{item.country}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Recent Scholarships Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Scholarships</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recentScholarships}
          contentContainerStyle={styles.listContent}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.itemCard, styles.scholarshipCard]}>
              <View style={styles.itemCardContent}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <View style={styles.scholarshipAmountContainer}>
                  <Text style={styles.scholarshipAmount}>{item.amount}</Text>
                </View>
                <View style={styles.itemLocation}>
                  <Text style={styles.itemCountry}>{item.country}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#F59E0B', '#F97316']}
          style={styles.ctaGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.ctaText}>Explore Programs & Scholarships</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 22,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  userName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statCardPrimary: {
    backgroundColor: '#4F46E5',
  },
  statCardSecondary: {
    backgroundColor: '#F59E0B',
  },
  statCardTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  statCardValue: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  statCardSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#F59E0B',
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    paddingRight: 20,
  },
  itemCard: {
    width: 240,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scholarshipCard: {
    borderTopWidth: 4,
    borderTopColor: '#F59E0B',
  },
  itemCardContent: {
    height: 140,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    lineHeight: 22,
  },
  itemUniversity: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
    marginTop: 6,
  },
  itemLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  itemCountry: {
    fontSize: 13,
    color: '#4B5563',
    fontFamily: 'Inter-Medium',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  scholarshipAmountContainer: {
    marginTop: 8,
  },
  scholarshipAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F59E0B',
    fontFamily: 'Inter-Bold',
  },
  ctaButton: {
    marginTop: 16,
    marginBottom: 40,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
});