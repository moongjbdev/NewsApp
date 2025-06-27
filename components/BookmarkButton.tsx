import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { NewsDataType } from '@/types';

interface BookmarkButtonProps {
  newsItem: NewsDataType;
  size?: number;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  newsItem, 
  size = 24, 
  onBookmarkChange 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [newsItem.article_id]);

  const checkBookmarkStatus = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmark');
      if (bookmarks) {
        const bookmarkList: NewsDataType[] = JSON.parse(bookmarks);
        const isInBookmarks = bookmarkList.some(item => item.article_id === newsItem.article_id);
        setIsBookmarked(isInBookmarks);
      }
    } catch (error) {
      console.log('Error checking bookmark status:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmark');
      let bookmarkList: NewsDataType[] = bookmarks ? JSON.parse(bookmarks) : [];

      if (isBookmarked) {
        // Remove from bookmarks
        bookmarkList = bookmarkList.filter(item => item.article_id !== newsItem.article_id);
      } else {
        // Add to bookmarks
        bookmarkList.push(newsItem);
      }

      await AsyncStorage.setItem('bookmark', JSON.stringify(bookmarkList));
      setIsBookmarked(!isBookmarked);
      onBookmarkChange?.(!isBookmarked);
    } catch (error) {
      console.log('Error toggling bookmark:', error);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={toggleBookmark}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
        size={size}
        color={isBookmarked ? Colors.tint : Colors.darkGrey}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default BookmarkButton; 