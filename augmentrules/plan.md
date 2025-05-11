# Salsa Pro - Architecture Plan

## Overview

Salsa Pro is a web application that helps people practice salsa dancing (and potentially other dance styles in the future) by providing audio instructions for dance steps. The application allows users to select the type of dance, mode (single or couple), and difficulty level, and then guides them through a sequence of dance steps with audio instructions.

## Architecture

The application will follow a DDD (Domain-Driven Design) and Hexagonal architecture, organizing the code into clear domains with well-defined layers:

```
src/
├── app/                  # Next.js App Router
├── shared/               # Shared components and utilities
└── domains/              # Application domains
    ├── dance/            # Main dance domain
    │   ├── data/         # Data layer
    │   │   ├── services/
    │   │   ├── view-models/
    │   │   └── repositories/
    │   ├── domain/       # Business logic
    │   │   ├── entities/
    │   │   └── usecases/
    │   └── ui/           # User interface
    │       ├── components/
    │       ├── pages/
    │       └── hooks/
    ├── configuration/    # Configuration domain
    │   ├── data/
    │   ├── domain/
    │   └── ui/
    └── sharing/          # Sharing domain
        ├── data/
        ├── domain/
        └── ui/
```

## Tech Stack

- **Frontend**:

  - TypeScript
  - Next.js (App Router)
  - React
  - Tailwind CSS
  - Shadcn UI
  - React Hook Form
  - Zod (for validation)

- **Text-to-Speech Script**:
  - TypeScript
  - Node.js
  - Azure AI SDK

## Detailed File Structure

```
/
├── public/
│   ├── sounds/           # Generated audio files
│   └── images/           # Images for playlists and UI
├── scripts/
│   └── generate-sounds.ts # Script to generate sounds
├── src/
│   ├── app/
│   │   ├── page.tsx      # Main page (SPA)
│   │   ├── layout.tsx    # Main layout
│   │   └── globals.css   # Global styles
│   ├── shared/
│   │   ├── components/   # Shared components
│   │   └── utils/        # Shared utilities
│   └── domains/
│       ├── dance/
│       │   ├── data/
│       │   │   ├── services/
│       │   │   │   └── sound-service.ts
│       │   │   ├── view-models/
│       │   │   │   └── dance-session-view-model.ts
│       │   │   └── repositories/
│       │   │       ├── dance-repository.ts
│       │   │       ├── step-repository.ts
│       │   │       └── playlist-repository.ts
│       │   ├── domain/
│       │   │   ├── entities/
│       │   │   │   ├── dance.ts
│       │   │   │   ├── dance-step.ts
│       │   │   │   ├── dance-course.ts
│       │   │   │   └── playlist.ts
│       │   │   └── usecases/
│       │   │       ├── start-dance-session.ts
│       │   │       ├── stop-dance-session.ts
│       │   │       └── get-next-step.ts
│       │   └── ui/
│       │       ├── components/
│       │       │   ├── dance-form.tsx
│       │       │   ├── step-display.tsx
│       │       │   ├── timer-display.tsx
│       │       │   └── playlist-card.tsx
│       │       ├── pages/
│       │       │   ├── start-page.tsx
│       │       │   └── dance-page.tsx
│       │       └── hooks/
│       │           ├── use-dance-session.ts
│       │           └── use-step-sequence.ts
│       ├── configuration/
│       │   ├── data/
│       │   │   ├── services/
│       │   │   ├── view-models/
│       │   │   │   └── configuration-view-model.ts
│       │   │   └── repositories/
│       │   │       └── configuration-repository.ts
│       │   ├── domain/
│       │   │   ├── entities/
│       │   │   │   └── configuration.ts
│       │   │   └── usecases/
│       │   │       ├── save-configuration.ts
│       │   │       └── validate-steps-configuration.ts
│       │   └── ui/
│       │       ├── components/
│       │       │   ├── step-selector.tsx
│       │       │   └── voice-selector.tsx
│       │       ├── pages/
│       │       │   └── configuration-page.tsx
│       │       └── hooks/
│       │           └── use-configuration.ts
│       └── sharing/
│           ├── data/
│           │   ├── services/
│           │   ├── view-models/
│           │   └── repositories/
│           ├── domain/
│           │   ├── entities/
│           │   └── usecases/
│           │       └── share-session.ts
│           └── ui/
│               ├── components/
│               │   └── share-button.tsx
│               ├── pages/
│               │   └── share-page.tsx
│               └── hooks/
│                   └── use-share.ts
└── data/
    ├── steps.ts         # Dance step data
    ├── courses.ts       # Dance course data
    └── playlists.ts     # Playlist data
```

## Main Entities

### Dance Step

```typescript
interface DanceStep {
  id: string; // Example: "salsa-single-basico"
  name: string; // Example: "Básico" (in Spanish)
  sayings: string[]; // SSML phrases for Azure TTS
  dance: string; // Dance ID (salsa, bachata, etc.)
  mode: string; // Mode ID (single, couple)
  course: string; // Course ID (salsa-1, salsa-2, etc.)
  nextSteps: string[]; // IDs of possible next steps
}
```

### Dance Course

```typescript
interface DanceCourse {
  id: string; // Example: "salsa-1"
  name: string; // Example: "Salsa 1" (in Spanish)
  steps: string[]; // IDs of steps in the course
}
```

### Playlist

```typescript
interface Playlist {
  name: string;
  image: string;
  description: string;
  url: string;
  dance: string; // Dance ID (salsa, bachata, etc.)
}
```

### Configuration

```typescript
interface Configuration {
  selectedDance: string;
  selectedMode: string;
  difficulty: number;
  selectedSteps: string[];
  selectedVoice: string;
}
```

## Application Flow

1. **Start Page**:

   - User selects dance type, mode, and difficulty
   - Parameters are saved in localStorage
   - User can navigate to the configuration page or start a dance session

2. **Dance Page**:

   - Shows a button to start the session and recommended playlists
   - When starting the session, displays the current step, elapsed time, and stop button
   - Every X seconds (based on difficulty), shows a new step and plays the audio

3. **Share Page**:

   - Shows a congratulations message, dance time, and share button
   - When clicking share, copies the URL to the clipboard and shows a notification

4. **Configuration Page**:
   - Allows selecting specific steps grouped by categories
   - Validates that each step has available next steps
   - Allows selecting the instructor's voice

## State Management

- **localStorage**: For saving user configuration
- **React Context**: For sharing state between components
- **React Hooks**: For encapsulating business logic

## Risk Points

### 1. Audio Generation and Playback

**Risk**: Generating audio files with Azure AI can be costly and slow. Additionally, playing audio at the precise moment can be complicated in web environments.

**Mitigation**:

- Implement a caching system for generated audio files: check if an audio file already exists before creating it.
- Preload audio for the most likely next steps
- Use the Web Audio API for precise playback
- Implement a fallback system for when audio is not available

### 2. Step Selection Algorithm

**Risk**: The algorithm for selecting the next dance step could generate unnatural or repetitive sequences.

**Mitigation**:

- Carefully design relationships between steps
- Implement a weighting system to favor certain transitions
- Add logic to avoid excessive repetition
- Allow users to define their own sequences

### 3. Performance on Mobile Devices

**Risk**: The application could have performance issues on mobile devices, especially with audio playback and transitions between steps.

**Mitigation**:

- Optimize audio file sizes
- Implement lazy loading for non-immediate resources
- Minimize operations on the main thread during the dance session
- Conduct thorough testing on different devices

### 4. Music Synchronization

**Risk**: Although the application doesn't play music directly (it uses external playlists), the lack of synchronization between steps and the music the user is listening to could affect the experience.

**Mitigation**:

- Offer tempo adjustment options for steps
- Provide visual guides (like a metronome) to help with rhythm
- Consider the possibility of integrating BPM detection for local music

### 5. User Experience in Couple Mode

**Risk**: Couple mode involves two people following instructions, which can be more complex than single mode.

**Mitigation**:

- Design clear instructions that specify each person's role
- Consider visual options that show both people's positions
- Provide specific tutorials for couple mode

### 6. Local Storage and Compatibility

**Risk**: Relying on localStorage for saving configurations can cause problems in some browsers or when used in incognito mode.

**Mitigation**:

- Implement fallbacks for when localStorage is not available
- Consider options for exporting/importing configurations
- Test in different browsers and modes

## Scalability Considerations

- Design the architecture to facilitate the addition of new dance types
- Structure step data to allow updates without code changes
- Consider the possibility of adding a backend in the future for functionalities such as user profiles, saved progress, etc.
