import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// 
const categories = ['Electrical', 'Plumbing', 'Roofing'];
// additional categories: { style: [ labor , clerical];  }
export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Labor Categories</Text>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={styles.categoryButton}
          onPress={() => navigation.navigate('TaskList', { category })}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.forumButton}
        onPress={() => navigation.navigate('Forum')}
      >
        <Text style={styles.forumButtonText}>Go to Forum</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
  },
  forumButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  forumButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

