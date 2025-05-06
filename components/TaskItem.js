import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const TaskItem = ({ item, toggleSwitch }) => {
  return (
    <View style={styles.task}>
      <Text style={[styles.taskText, item.completed && styles.completed]}>
        {item.text}
      </Text>
      <Switch value={item.completed} onValueChange={() => toggleSwitch(item.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default TaskItem;
