import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { scheduleReminderNotification, scheduleTournamentDayReminder } from '../utils/scheduleNotification';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const resources = [
  {
    title: 'Game Manual',
    url: 'https://www.vexrobotics.com/vexedr/competition/competition-resources'
  },
  {
    title: 'Judging Rubrics (PDF)',
    url: 'https://www.roboticseducation.org/documents/2023/05/judge-guide.pdf'
  },
  {
    title: 'Engineering Notebook Guidelines',
    url: 'https://www.roboticseducation.org/documents/2023/05/judge-guide.pdf/#page=27'
  }
];

export default function ResourcesScreen() {
  const navigation = useNavigation();

  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationX < -50) {
        // Swipe left - go to next screen
        navigation.navigate('Tournament Day' as never);
      } else if (event.translationX > 50) {
        // Swipe right - go to previous screen
        navigation.navigate('Week Before' as never);
      }
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
        <Text style={styles.title}>Official VEX Resources</Text>
        <View style={styles.linksContainer}>
          {resources.map((resource) => (
            <TouchableOpacity 
              key={resource.title} 
              style={styles.linkButton}
              onPress={() => Linking.openURL(resource.url)}
              activeOpacity={0.7}
            >
              <Text style={styles.link}>{resource.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add Tournament to Calendar"
          onPress={scheduleReminderNotification}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            title="Test Tournament Day Reminder"
            onPress={scheduleTournamentDayReminder}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Cancel All Reminders"
            color="#EF4444"
            onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
          />
        </View>
      </View>
      </View>
    </SafeAreaView>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 46,
    textAlign: 'center'
  },
  link: {
    color: '#2563EB',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  linksContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  linkButton: {
    backgroundColor: '#f8fafc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 200,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30
  }
});