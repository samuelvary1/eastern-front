// MainMenuScreen - entry point for the game

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useGameEngine } from '../engine/gameEngine';
import { hasSavedGame } from '../storage/saveGame';
import ActionButton from '../components/ActionButton';

export default function MainMenuScreen({ navigation }) {
  const { startNewGame, loadGame } = useGameEngine();
  const [saveExists, setSaveExists] = useState(false);

  useEffect(() => {
    checkSave();
  }, []);

  const checkSave = async () => {
    const exists = await hasSavedGame();
    setSaveExists(exists);
  };

  const handleNewGame = () => {
    startNewGame();
    navigation.navigate('Campaign');
  };

  const handleContinue = async () => {
    const loaded = await loadGame();
    if (loaded) {
      navigation.navigate('Campaign');
    }
  };

  const handleHowToPlay = () => {
    // Could navigate to a help screen or show an alert
    alert('Defend Ukraine by managing brigades, supply routes, and tactical decisions. Hold Kyiv and key supply corridors for 20 turns to win.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>EASTERN FRONT</Text>
        <Text style={styles.subtitle}>A Modern Operational Wargame</Text>
        <Text style={styles.description}>Ukraine 2022</Text>

        <View style={styles.buttonContainer}>
          <ActionButton
            title="New Campaign"
            onPress={handleNewGame}
            variant="primary"
          />

          <ActionButton
            title="Continue Campaign"
            onPress={handleContinue}
            variant="secondary"
            disabled={!saveExists}
          />

          <ActionButton
            title="How to Play"
            onPress={handleHowToPlay}
            variant="secondary"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This is a strategic simulation focusing on operational decisions and logistics.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#3b82f6',
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});
