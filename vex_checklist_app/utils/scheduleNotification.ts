import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';

export async function scheduleReminderNotification() {
  // Request notification permissions
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Please enable notifications to receive tournament reminders!');
    return;
  }

  // Request calendar permissions
  const calendarPermission = await Calendar.requestCalendarPermissionsAsync();
  if (calendarPermission.status !== 'granted') {
    alert('Please enable calendar access to add tournament reminders!');
    return;
  }

  // Cancel existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Create calendar event for next tournament
  try {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(cal => cal.isPrimary) || calendars[0];
    
    if (defaultCalendar) {
      const nextSaturday = new Date();
      nextSaturday.setDate(nextSaturday.getDate() + (6 - nextSaturday.getDay() + 7) % 7);
      nextSaturday.setHours(8, 0, 0, 0); // 8 AM start

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: 'VEX Tournament',
        startDate: nextSaturday,
        endDate: new Date(nextSaturday.getTime() + 8 * 60 * 60 * 1000), // 8 hours
        location: 'Tournament Venue',
        notes: 'Remember to bring:\n- Robot and controller\n- Engineering notebook\n- Spare parts and tools\n- Team information',
        alarms: [
          { relativeOffset: -60 }, // 1 hour before
          { relativeOffset: -1440 }, // 1 day before
        ],
      });

      alert('Tournament calendar event created! Check your calendar app for the event with reminders.');
    }
  } catch (error) {
    console.log('Could not create calendar event:', error);
    alert('Could not create calendar event. Please check your calendar permissions.');
  }
}

export async function scheduleTournamentDayReminder() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  // Simple notification for testing
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tournament Day Checklist 📋',
      body: 'Final check: batteries, tools, and robot ready!',
    },
    trigger: null, // Send immediately
  });
}