import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, AntDesign } from '@expo/vector-icons';

// ⚙️ Ativar animações no Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// 🖼️ Imagem de fundo
const backgroundImg = {
  uri: 'https://wallpaper.forfun.com/fetch/24/24c9965c30cdb843da673bb0ca60e278.jpeg',
};

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    const saved = await AsyncStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  };

  const saveTasks = async () => {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };
    LayoutAnimation.easeInEaseOut();
    setTasks([...tasks, newTask]);
    setTask('');
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkButton}>
        {item.completed ? (
          <AntDesign name="checkcircle" size={24} color="#00FFB2" />
        ) : (
          <Feather name="circle" size={24} color="#999" />
        )}
      </TouchableOpacity>

      <Text style={[styles.taskText, item.completed && styles.taskCompleted]}>
        {item.text}
      </Text>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Feather name="trash-2" size={22} color="#FF4C61" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={backgroundImg} style={styles.background} blurRadius={1}>
      <View style={styles.overlay}>
        <Text style={styles.title}>🌌 Missões Shinobi</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua missão..."
            placeholderTextColor="#aaa"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <AntDesign name="pluscircle" size={28} color="#00FFB2" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ marginTop: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00FFB2',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FFB2',
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#00FFB2',
  },
  checkButton: {
    marginRight: 12,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
