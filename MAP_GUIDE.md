# Map Screen Implementation Guide

The game now includes two map screen options:

## 1. Basic MapScreen (src/screens/MapScreen.js)
- Uses only React Native View components
- Shows regions as colored boxes
- Displays connections and frontlines
- Icons for brigades, enemies, EW, artillery
- Works without additional dependencies

## 2. Enhanced MapScreen (src/screens/EnhancedMapScreen.js)
- Uses react-native-svg for better graphics
- Circular region nodes with proper visual hierarchy
- Animated frontline indicators (dashed red lines)
- Cleaner, more professional appearance
- Requires `react-native-svg` dependency

## Installation

For the enhanced version with SVG graphics:

```bash
npx expo install react-native-svg
```

Then update App.js to use EnhancedMapScreen instead of MapScreen.

## Features

Both versions include:
- **Visual Region Representation**: Color-coded by control (Ukraine blue, Russia red, Contested orange)
- **Frontline Visualization**: Shows where opposing forces meet
- **Force Indicators**: See your brigades (🛡️) and enemy forces (⚔️) at a glance
- **Special Conditions**: EW jamming (⚡), Artillery fire (💥)
- **Interactive**: Tap regions to see detailed information
- **Brigade Positioning**: Quickly identify where your forces are deployed
- **Objective Markers**: Key regions highlighted with gold borders

## How to Use

1. From the Campaign screen, tap "View Map"
2. Tap any region to view detailed information
3. Check the legend for symbol meanings
4. Use the map to plan movements and identify threats
5. Tap "Back to Campaign" to return

## Customization

To adjust region positions, edit the `regionNodes` or `regionPositions` object in the MapScreen file:

```javascript
const regionNodes = {
  'region_id': { x: 200, y: 300, size: 50 },
  // Adjust x, y coordinates and size as needed
};
```

## Future Enhancements

Potential additions:
- Animated unit movements
- Historical turn playback
- Zoom and pan gestures
- Attack vectors visualization
- Supply route highlighting
- Weather overlay effects
