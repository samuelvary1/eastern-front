# Eastern Front

A text-based operational wargame simulating modern mechanized warfare, built with React Native and Expo.

## Overview

Eastern Front is a turn-based strategy game focused on operational decisions, supply logistics, and modern combat systems. Players manage brigades, reconnaissance assets, artillery, and anti-armor capabilities while dealing with dynamic weather, electronic warfare, and AI opponents.

## Features

- **Modern Combat Systems**: Drones, electronic warfare, artillery, anti-armor, air defense
- **Dynamic Weather**: 5 weather types affecting movement, combat, and supply
- **Supply Logistics**: Fuel, ammunition, and supply line management
- **Intelligent AI**: Adaptive enemy behavior with weighted decision-making
- **Random Events**: 15+ narrative events creating unpredictable situations
- **Save/Load**: Persistent game state using AsyncStorage

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd eastern-front

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Project Structure

```
src/
├── screens/        # UI screens (MainMenu, Campaign, BrigadeDetail, TurnSummary)
├── components/     # Reusable UI components
├── engine/         # Game logic (combat, supply, weather, AI, events)
├── data/           # Game data (brigades, regions, events, weather config)
└── storage/        # Save/load functionality
```

## How to Play

1. **Start New Campaign**: Begin defending Ukraine with 5 brigades
2. **Manage Brigades**: Assign stances, move units, order attacks
3. **Reconnaissance**: Use drones to gather intelligence
4. **Artillery**: Conduct counterbattery fire to suppress enemy artillery
5. **Supply Management**: Keep supply routes open and manage fuel/ammo
6. **End Turn**: AI responds, combat resolves, events trigger
7. **Win Condition**: Hold key objectives for 20 turns

## Game Systems

### Combat
- Strength, morale, experience, and type affect combat power
- Terrain provides defensive bonuses
- Weather modifies effectiveness
- Supply level impacts performance

### Supply
- Regional base supply + weather + isolation + enemy pressure
- Separate tracking for fuel and ammunition
- Low supply degrades morale and combat effectiveness

### Weather
- Clear, Rain, Heavy Rain, Mud, Snow
- Affects movement, drones, supply, and combat

### AI
- Evaluates strength ratios and adjacency
- Decides between holding, attacking, reinforcing, or artillery
- Weather influences aggression

## Extending the Game

See the code comments for details on:
- Adding new scenarios
- Creating new unit types
- Tuning AI difficulty
- Adding seasonal weather patterns
- Balance adjustments

## Tech Stack

- React Native
- Expo
- React Navigation
- AsyncStorage

## License

MIT

## Credits

Built as a demonstration of modern operational wargame design in a mobile format.
