import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import rssParser from 'rss-parser';
import {LinearGradient } from 'expo-linear-gradient';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
export default function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      
      const feedUrl =
        'https://thenewshook.com/rss/rss_politics.xml';

      const response = await fetch(feedUrl);
    
      const parser = new rssParser({
        customFields: {
          item: ['description']
        }
      });
      const feed = await parser.parseString(await response.text());
      console.log("here is the feed",feed)
    
      setArticles(feed.items);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Text style={{
                backgroundColor: 'white',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
      </Text>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <View>
            <LinearGradient
              colors={["deeppink", "orange"]}
              style={{
                height: 11
              }}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
            >
            </LinearGradient>
            
            {item.enclosure && item.enclosure.url && (
              <Image
                source={{ uri: item.enclosure.url }}
                style={{ left: 0, right: 0, height: 200 }}
              />
            )}
            <Text
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: 7,
                marginBottom: 2,
                fontSize: 16,
                fontWeight: "600"
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: 7,
                marginBottom: 27,
                fontSize: 13,
              }}>
              {getSource(item.description)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.guid}
      />
    </>
  );
}

function getSource(linkText) {
    return linkText.match(/<a [^>]+>([^<]+)<\/a>/)[1];
}
