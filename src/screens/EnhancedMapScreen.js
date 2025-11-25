// Enhanced MapScreen with better visual frontline representation

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Line, Polygon, Circle, Text as SvgText } from 'react-native-svg';
import { useGameEngine } from '../engine/gameEngine';
import ActionButton from '../components/ActionButton';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAP_WIDTH = SCREEN_WIDTH - 40;
const MAP_HEIGHT = 700;

export default function EnhancedMapScreen({ navigation }) {
  const { gameState } = useGameEngine();
  const [selectedRegion, setSelectedRegion] = useState(null);

  if (!gameState.gameStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No active campaign</Text>
      </SafeAreaView>
    );
  }

  // Region positions with actual coordinates
  const regionNodes = {
    'belarus_border': { x: 100, y: 80, size: 50 },
    'chernihiv_approach': { x: 220, y: 100, size: 45 },
    'kyiv_northwest': { x: 180, y: 180, size: 55 },
    'kyiv_center': { x: 200, y: 280, size: 65 },
    'kyiv_south': { x: 190, y: 380, size: 50 },
    'zhytomyr_highway': { x: 100, y: 450, size: 50 },
    'western_supply': { x: 50, y: 550, size: 45 },
    'russian_border': { x: 320, y: 60, size: 45 },
    'kharkiv_east': { x: 310, y: 150, size: 50 },
    'kharkiv_front': { x: 290, y: 240, size: 60 },
    'izyum_axis': { x: 280, y: 350, size: 50 },
  };

  const getRegionColor = (control) => {
    if (control === 'ukraine') return '#3b82f6';
    if (control === 'russia') return '#ef4444';
    return '#f59e0b';
  };

  const renderConnections = () => {
    const connections = [
      ['belarus_border', 'kyiv_northwest'],
      ['belarus_border', 'chernihiv_approach'],
      ['chernihiv_approach', 'kyiv_northwest'],
      ['kyiv_northwest', 'kyiv_center'],
      ['kyiv_center', 'kyiv_south'],
      ['kyiv_south', 'zhytomyr_highway'],
      ['zhytomyr_highway', 'western_supply'],
      ['russian_border', 'kharkiv_east'],
      ['kharkiv_east', 'kharkiv_front'],
      ['kharkiv_front', 'izyum_axis'],
    ];

    return connections.map((conn, idx) => {
      const [from, to] = conn;
      const fromNode = regionNodes[from];
      const toNode = regionNodes[to];
      
      if (!fromNode || !toNode) return null;

      const fromRegion = gameState.regions.find(r => r.id === from);
      const toRegion = gameState.regions.find(r => r.id === to);
      
      const isFrontline = fromRegion?.control !== toRegion?.control;
      const color = isFrontline ? '#ef4444' : '#4b5563';
      const strokeWidth = isFrontline ? 4 : 2;
      const strokeDasharray = isFrontline ? '8,4' : '0';

      return (
        <Line
          key={`conn-${idx}`}
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          opacity={0.7}
        />
      );
    });
  };

  const renderRegions = () => {
    return gameState.regions.map(region => {
      const node = regionNodes[region.id];
      if (!node) return null;

      const brigadeCount = gameState.brigades.filter(b => b.location === region.id).length;
      const color = getRegionColor(region.control);

      return (
        <TouchableOpacity
          key={region.id}
          onPress={() => setSelectedRegion(region)}
          style={{ position: 'absolute', left: node.x - node.size/2, top: node.y - node.size/2 }}
        >
          <Svg width={node.size} height={node.size}>
            <Circle
              cx={node.size/2}
              cy={node.size/2}
              r={node.size/2 - 2}
              fill={color}
              stroke={region.isObjective ? '#fbbf24' : '#1f2937'}
              strokeWidth={region.isObjective ? 3 : 1}
              opacity={0.85}
            />
            
            {/* Brigade indicator */}
            {brigadeCount > 0 && (
              <Circle
                cx={node.size - 10}
                cy={10}
                r={8}
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth={1}
              />
            )}
            
            {/* Enemy indicator */}
            {region.enemyStrengthEstimate > 0 && (
              <Circle
                cx={10}
                cy={10}
                r={8}
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth={1}
              />
            )}
          </Svg>
          
          <View style={styles.regionLabel}>
            <Text style={styles.regionLabelText} numberOfLines={2}>
              {region.name.split(' ')[0]}
            </Text>
            {brigadeCount > 0 && (
              <Text style={styles.brigadeCountText}>🛡️{brigadeCount}</Text>
            )}
            {region.enemyStrengthEstimate > 0 && (
              <Text style={styles.enemyCountText}>⚔️{region.enemyStrengthEstimate}</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tactical Map - Turn {gameState.turn}</Text>
        <Text style={styles.weather}>{gameState.weather.toUpperCase()}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.mapContainer}>
          <Svg width={MAP_WIDTH} height={MAP_HEIGHT} style={styles.svg}>
            {renderConnections()}
          </Svg>
          {renderRegions()}
        </View>

        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.legendCircle, { backgroundColor: '#3b82f6' }]} />
            <Text style={styles.legendText}>Ukraine Controlled</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendCircle, { backgroundColor: '#ef4444' }]} />
            <Text style={styles.legendText}>Enemy Controlled</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendCircle, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.legendText}>Contested</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendLine} />
            <Text style={styles.legendText}>Connections</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendLine, { backgroundColor: '#ef4444' }]} />
            <Text style={styles.legendText}>Frontline</Text>
          </View>
        </View>

        {selectedRegion && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedTitle}>{selectedRegion.name}</Text>
            <Text style={styles.selectedDetail}>Control: {selectedRegion.control.toUpperCase()}</Text>
            <Text style={styles.selectedDetail}>Terrain: {selectedRegion.terrain}</Text>
            <Text style={styles.selectedDetail}>Supply: {selectedRegion.baseSupply}</Text>
            <Text style={styles.selectedDetail}>Air Defense: {selectedRegion.airDefenseLevel}</Text>
            
            {selectedRegion.enemyStrengthEstimate > 0 && (
              <Text style={[styles.selectedDetail, { color: '#f87171' }]}>
                Enemy Strength: {selectedRegion.enemyStrengthEstimate}
              </Text>
            )}
            
            {selectedRegion.artilleryIntensity > 20 && (
              <Text style={[styles.selectedDetail, { color: '#fb923c' }]}>
                Artillery Intensity: {selectedRegion.artilleryIntensity}
              </Text>
            )}
            
            {selectedRegion.electronicWarfareActive && (
              <Text style={[styles.selectedDetail, { color: '#fbbf24' }]}>
                ⚡ Electronic Warfare Active
              </Text>
            )}
            
            {gameState.brigades.filter(b => b.location === selectedRegion.id).length > 0 && (
              <View style={styles.brigadesInRegion}>
                <Text style={styles.brigadesTitle}>Your Forces:</Text>
                {gameState.brigades
                  .filter(b => b.location === selectedRegion.id)
                  .map(b => (
                    <Text key={b.id} style={styles.brigadeItem}>
                      • {b.name} (STR: {b.strength}, MOR: {b.morale})
                    </Text>
                  ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <ActionButton
          title="Back to Campaign"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    padding: 20,
    backgroundColor: '#1f2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f3f4f6',
  },
  weather: {
    fontSize: 12,
    fontWeight: '600',
    color: '#93c5fd',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  mapContainer: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    backgroundColor: '#1f2937',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    margin: 20,
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  regionLabel: {
    alignItems: 'center',
    marginTop: -5,
  },
  regionLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#f3f4f6',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  brigadeCountText: {
    fontSize: 9,
    color: '#10b981',
    fontWeight: '700',
  },
  enemyCountText: {
    fontSize: 9,
    color: '#ef4444',
    fontWeight: '700',
  },
  legend: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 12,
  },
  legendLine: {
    width: 30,
    height: 3,
    backgroundColor: '#4b5563',
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#d1d5db',
  },
  selectedInfo: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#93c5fd',
    marginBottom: 10,
  },
  selectedDetail: {
    fontSize: 14,
    color: '#d1d5db',
    marginVertical: 2,
  },
  brigadesInRegion: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  brigadesTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#10b981',
    marginBottom: 6,
  },
  brigadeItem: {
    fontSize: 13,
    color: '#d1d5db',
    marginVertical: 2,
  },
  footer: {
    padding: 15,
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
});
