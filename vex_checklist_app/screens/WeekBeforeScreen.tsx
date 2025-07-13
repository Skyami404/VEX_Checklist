import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox, useTheme, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exportChecklistToPDF } from '../utils/exportChecklist';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { checklistStyles } from '../styles/checklistStyles';

const STORAGE_KEY = 'checklist-week-before';
const ITEMS_STORAGE_KEY = 'checklist-items-week-before';

const defaultItems = [
  'Robot driving and autonomous tested',
  'Engineering notebook updated',
  'Engineering notebook uploaded/submitted',
  'Review judging rubrics',
  'Spare parts prepared',
  'Scouting strategy ready',
  'Drive team practice complete',
  'Robot name & team number confirmed',
  'Packing list ready'
];

export default function WeekBeforeScreen() {
  const [checklistItems, setChecklistItems] = useState(defaultItems);
  const [checked, setChecked] = useState(Array(defaultItems.length).fill(false));
  const [newItem, setNewItem] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();

  const swipeGesture = Gesture.Pan()
    .onBegin(() => {
      // Only start swipe if it's a clear horizontal movement
    })
    .onUpdate((event) => {
      // Track the gesture but don't trigger navigation yet
    })
    .onEnd((event) => {
      // Only trigger navigation if it's a clear horizontal swipe
      // and the movement is significant enough
      if (Math.abs(event.translationX) > 100 && Math.abs(event.translationY) < 50) {
        if (event.translationX < -50) {
          // Swipe left - go to next screen
          navigation.navigate('Resources' as never);
        } else if (event.translationX > 50) {
          // Swipe right - go to previous screen
          navigation.navigate('Tournament Day' as never);
        }
      }
    });

  useEffect(() => {
    // Load saved items
    AsyncStorage.getItem(ITEMS_STORAGE_KEY).then((value) => {
      if (value) {
        const savedItems = JSON.parse(value);
        setChecklistItems(savedItems);
        setChecked(Array(savedItems.length).fill(false));
      }
    });

    // Load saved checked state
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        setChecked(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (index) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const total = checklistItems.length;
  const completed = checked.filter(Boolean).length;
  const progress = Math.round((completed / total) * 100);

  const handleExport = () => {
    exportChecklistToPDF('Week Before Checklist', checklistItems, checked);
  };

  const handleReset = () => {
    setChecked(Array(checklistItems.length).fill(false));
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  const addItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...checklistItems, newItem.trim()];
      setChecklistItems(updatedItems);
      setChecked([...checked, false]);
      setNewItem('');
      AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
    }
  };

  const removeItem = (index) => {
    const updatedItems = checklistItems.filter((_, i) => i !== index);
    const updatedChecked = checked.filter((_, i) => i !== index);
    setChecklistItems(updatedItems);
    setChecked(updatedChecked);
    AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(updatedItems));
  };

    return (
    <GestureDetector gesture={swipeGesture}>
      <SafeAreaView style={checklistStyles.safeArea}>
        <ScrollView style={checklistStyles.container}>
        <Text style={checklistStyles.title}>Week Before Tournament</Text>
      <Text style={checklistStyles.progress}>
        {completed} of {total} completed ({progress}%)
      </Text>
      <View style={checklistStyles.buttonContainer}>
        <View style={checklistStyles.buttonRow}>
          <Button title="Export as PDF" onPress={handleExport} />
          <Button title="Reset Checklist" color="#f3722c" onPress={handleReset} />
        </View>
      </View>
      
      {/* Add new item input */}
      <View style={checklistStyles.inputContainer}>
        <TextInput
          style={checklistStyles.input}
          placeholder="Add new checklist item..."
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={addItem}
        />
        <IconButton
          icon="plus"
          size={24}
          onPress={addItem}
          disabled={!newItem.trim()}
        />
      </View>
      
      {checklistItems.map((item, index) => (
        <View key={item} style={checklistStyles.itemRow}>
          <TouchableOpacity 
            style={checklistStyles.checkboxTouchable}
            onPress={() => toggleCheck(index)}
            activeOpacity={0.7}
          >
            <View style={[checklistStyles.checkboxContainer, !checked[index] && checklistStyles.checkboxUnchecked]}>
              <Checkbox
                status={checked[index] ? 'checked' : 'unchecked'}
                color={theme.colors.primary}
                uncheckedColor="#374151"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={checklistStyles.textTouchable}
            onPress={() => toggleCheck(index)}
            activeOpacity={0.7}
          >
            <Text style={checklistStyles.itemText}>{item}</Text>
          </TouchableOpacity>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => removeItem(index)}
            style={checklistStyles.deleteButton}
          />
        </View>
      ))}
        </ScrollView>
      </SafeAreaView>
    </GestureDetector>
  );
}

