import { StyleSheet } from 'react-native';

export const checklistStyles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  container: { 
    padding: 20, 
    backgroundColor: '#fff', 
    flex: 1 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  progress: { 
    fontSize: 24, 
    fontWeight: '700', 
    marginBottom: 16, 
    color: '#90be6d', 
    textAlign: 'center' 
  },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    minHeight: 54,
    height: 54
  },
  itemText: { 
    fontSize: 16, 
    flexShrink: 1, 
    marginLeft: 8, 
    flex: 1 
  },
  checkboxTouchable: {
    padding: 12,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTouchable: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    height: '100%',
    justifyContent: 'center'
  },
  checkboxContainer: {
    marginRight: 4,
    width: 38,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxUnchecked: {
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: '50%',
    width: 24,
    height: 24,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#374151'
  },
  deleteButton: {
    margin: 0,
    padding: 0
  }
}); 