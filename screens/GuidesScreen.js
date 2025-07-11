import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const guides = [
  {
    id: 'g1',
    title: 'How to Apply for a University Abroad',
    content: `1. Choose your country and program.\n2. Research universities and admission requirements.\n3. Prepare academic documents (transcripts, degrees, etc).\n4. Take required tests (IELTS, TOEFL, GRE, etc).\n5. Write SOP and get recommendation letters.\n6. Apply through university portals.\n7. Track deadlines and submit before due date.`,
  },
  {
    id: 'g2',
    title: 'How to Find and Apply for Scholarships',
    content: `1. Use official university websites or scholarship portals.\n2. Filter by degree, country, and field.\n3. Prepare a strong motivation letter.\n4. Get academic references.\n5. Double-check eligibility and deadline.\n6. Submit all required documents online.`,
  },
  {
    id: 'g3',
    title: 'Visa Application Process',
    content: `1. Get admission letter from university.\n2. Book visa appointment at embassy.\n3. Prepare financial proof (blocked account or sponsor).\n4. Get health insurance.\n5. Prepare required documents (passport, admission letter, biometrics, etc).\n6. Attend visa interview.\n7. Track visa status online.`,
  },
  {
    id: 'g4',
    title: 'Blocked Account Guide (Germany)',
    content: `1. Open a blocked account with providers like Expatrio, Fintiba, Coracle.\n2. Deposit the required amount (~€11,208 for 1 year).\n3. Get confirmation certificate (Sperrkonto confirmation).\n4. Use it as financial proof for your visa.\n5. Access monthly funds after arriving in Germany.`,
  },
  {
    id: 'g5',
    title: 'Documents Checklist',
    content: `✓ Valid Passport\n✓ Academic transcripts and certificates\n✓ English Proficiency Test (IELTS/TOEFL)\n✓ CV or Resume\n✓ SOP (Statement of Purpose)\n✓ LORs (Letters of Recommendation)\n✓ Financial Proof\n✓ Health Insurance\n✓ Visa Appointment Confirmation`,
  },
  {
    id: 'g6',
    title: 'Useful Websites',
    content: `- DAAD: https://daad.de (Germany Scholarships)\n- Study in Canada: https://edu.canada.ca\n- Scholarships.com: https://scholarships.com\n- Campus France: https://www.campusfrance.org\n- UK Gov: https://gov.uk/student-visa`,
  },
];

export default function GuidesScreen() {
  const handleLink = (url) => Linking.openURL(url);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Student Guides</Text>
      {guides.map((guide) => (
        <View key={guide.id} style={styles.card}>
          <Text style={styles.title}>{guide.title}</Text>
          <Text style={styles.content}>{guide.content}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => handleLink('https://www.scholarships.com')}
      >
        <Ionicons name="link" size={20} color="#fff" />
        <Text style={styles.linkButtonText}>Find More Scholarships</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 6,
  },
  content: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  linkButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
