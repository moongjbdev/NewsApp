import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { PUBLIC_API_KEY } from '@/constants/Config';
import { NewsDataType } from '@/types';

interface UseNewsDataReturn {
  breakingNews: NewsDataType[];
  news: NewsDataType[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  fetchNewsByCategory: (category: string) => Promise<void>;
}

export const useNewsData = (): UseNewsDataReturn => {
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBreakingNews = useCallback(async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&language=vi&country=vi&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(URL);

      if (response?.data?.results) {
        setBreakingNews(response.data.results);
      }
    } catch (error: any) {
      console.log('Breaking news error:', error);
      throw new Error('Không thể tải tin tức nổi bật');
    }
  }, []);

  const fetchNewsByCategory = useCallback(async (category: string = '') => {
    try {
      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      
      const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&language=vi&country=vi&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(URL);

      if (response?.data?.results) {
        setNews(response.data.results);
      }
    } catch (error: any) {
      console.log('News error:', error);
      throw new Error('Không thể tải danh sách tin tức');
    }
  }, []);

  const refreshData = useCallback(async () => {
    setError(null);
    try {
      await Promise.all([fetchBreakingNews(), fetchNewsByCategory()]);
    } catch (error: any) {
      setError(error.message || 'Không thể làm mới dữ liệu');
    }
  }, [fetchBreakingNews, fetchNewsByCategory]);

  const handleCategoryChange = useCallback(async (category: string) => {
    setNews([]);
    setError(null);
    try {
      await fetchNewsByCategory(category);
    } catch (error: any) {
      setError(error.message || 'Không thể tải danh sách tin tức');
    }
  }, [fetchNewsByCategory]);

  // Initial load
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([fetchBreakingNews(), fetchNewsByCategory()]);
      } catch (error: any) {
        setError(error.message || 'Không thể tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [fetchBreakingNews, fetchNewsByCategory]);

  return {
    breakingNews,
    news,
    isLoading,
    error,
    refreshData,
    fetchNewsByCategory: handleCategoryChange,
  };
}; 