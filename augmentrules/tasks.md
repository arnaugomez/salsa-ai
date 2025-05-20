# Implementation Tasks - Salsa AI

## Initial Setup

- [x] Remove Next.js boilerplate, replace it with barebones components

## Data Structure

- [x] Define interfaces for main entities (DanceStep, DanceCourse, Playlist, Configuration)
- [x] Create initial data for salsa steps (single and couple)
- [x] Create initial data for salsa courses
- [x] Create initial data for recommended playlists
- [x] Implement validations with Zod for all entities
- [x] Review the data of dance steps. Make sure it coincides with the data in augmentrules/salsa-steps.md
- [x] Do not include salsa steps that are not in augmentrules/salsa-steps.md

## Dance Domain

### Domain Layer

- [x] Implement DanceStep entity
- [x] Implement DanceCourse entity
- [x] Implement Playlist entity
- [x] Implement other entities you find necessary.
- [x] Implement starting dance session
- [x] Implement stopping dance session
- [x] Implement getting the next dance step randomly from the current step data and available steps data.
- [x] Implement logic for random step selection based on configuration

### Data Layer

- [x] Implement repository for dance steps
- [x] Implement repository for dance courses
- [x] Implement repository for playlists
- [x] Create service for sound playback
- [x] Implement ViewModel for dance session

### UI Layer

- [x] Create component for dance selection form
- [x] Create component for displaying current step
- [x] Create component for displaying timer
- [x] Create component for playlist cards
- [x] Implement start page
- [x] Implement dance page
- [x] Create custom hook for managing dance session
- [x] Create custom hook for step sequence

## Configuration Domain

### Domain Layer

- [x] Implement Configuration entity
- [x] Create use case for saving configuration
- [x] Create use case for validating step configuration

### Data Layer

- [x] Implement repository for configuration (localStorage)
- [x] Create ViewModel for configuration

### UI Layer

- [x] Create component for step selector
- [x] Create component for voice selector
- [x] Implement configuration page
- [x] Create custom hook for managing configuration

## Sharing Domain

### Domain Layer

- [x] Create use case for sharing session

### UI Layer

- [x] Create component for share button
- [x] Implement share page
- [x] Create custom hook for sharing functionality
- [x] Implement confirmation toast with Shadcn Sonner

## Sound Generation

- [ ] Configure Azure AI SDK
- [ ] Create Node.js script for sound generation
- [ ] Implement logic to verify existence of sound files
- [ ] Implement SSML generation for each step
- [ ] Create caching system for sound files
- [ ] Document sound generation process

## Design and Styling

- [x] Install necessary Shadcn UI components
- [x] Create custom theme with orange, amber, and lime colors
- [ ] Design responsive main layout
- [ ] Implement styles for start page
- [ ] Implement styles for dance page
- [ ] Implement styles for configuration page
- [ ] Implement styles for share page
- [ ] Create animations for transitions between steps

## Core Functionality

- [x] Implement saving/loading configuration in localStorage
- [x] Implement timer for dance session
- [x] Implement logic for audio playback at the right moment
- [x] Implement system for copying URL to clipboard
- [x] Create logic for validating selected steps

## Testing and Optimization

- [ ] Create unit tests for main use cases
- [ ] Create integration tests for main flows
- [ ] Optimize resource loading (lazy loading)
- [ ] Optimize performance on mobile devices
- [ ] Perform accessibility tests
- [ ] Implement SEO improvements

## Documentation

- [ ] Create README with installation and usage instructions
- [ ] Document architecture and technical decisions
- [ ] Create guide for adding new dance steps
- [ ] Document sound generation process
- [ ] Create documentation for developers

# SEO

- [ ] Implement meta tags for each page
- [ ] Implement Open Graph tags for social sharing
- [ ] Implement structured data for search engines
- [ ] Review the copywriting so it is appealing to the target audience
