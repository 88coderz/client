import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function ForumScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect( () => {  fetchPosts();  }, [] );
 
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('forum_posts')
      .select('*')
      .order( 'created_at', { ascending: false } );

    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Forum</Text>
      <FlatList
        data={posts}
        keyExtractor={ ( item ) => item.id.toString() }
        renderItem={ ( { item } ) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        ) }
      />      <TouchableOpacity
        style={ styles.addButton }
        onPress={ () => {/* Navigate to create post screen */} }
      >
        <Text style={styles.addButtonText}>Create New Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postItem: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});