# Implementation Tasks - Salsa Pro

## Initial Setup

- [ ] Remove Next.js boilerplate, replace it with barebones components

## Data Structure

- [ ] Define interfaces for main entities (DanceStep, DanceCourse, Playlist, Configuration)
- [ ] Create initial data for salsa steps (single and couple)
- [ ] Create initial data for salsa courses
- [ ] Create initial data for recommended playlists
- [ ] Implement validations with Zod for all entities

## Dance Domain

### Domain Layer

- [ ] Implement DanceStep entity
- [ ] Implement DanceCourse entity
- [ ] Implement Playlist entity
- [ ] Implement other entities you find necessary.
- [ ] Implement starting dance session
- [ ] Implement stopping dance session
- [ ] Implement getting the next dance step randomly from the current step data and available steps data.
- [ ] Implement logic for random step selection based on configuration

### Data Layer

- [ ] Implement repository for dance steps
- [ ] Implement repository for dance courses
- [ ] Implement repository for playlists
- [ ] Create service for sound playback
- [ ] Implement ViewModel for dance session

### UI Layer

- [ ] Create component for dance selection form
- [ ] Create component for displaying current step
- [ ] Create component for displaying timer
- [ ] Create component for playlist cards
- [ ] Implement start page
- [ ] Implement dance page
- [ ] Create custom hook for managing dance session
- [ ] Create custom hook for step sequence

## Configuration Domain

### Domain Layer

- [ ] Implement Configuration entity
- [ ] Create use case for saving configuration
- [ ] Create use case for validating step configuration

### Data Layer

- [ ] Implement repository for configuration (localStorage)
- [ ] Create ViewModel for configuration

### UI Layer

- [ ] Create component for step selector
- [ ] Create component for voice selector
- [ ] Implement configuration page
- [ ] Create custom hook for managing configuration

## Sharing Domain

### Domain Layer

- [ ] Create use case for sharing session

### UI Layer

- [ ] Create component for share button
- [ ] Implement share page
- [ ] Create custom hook for sharing functionality
- [ ] Implement confirmation toast with Shadcn Sonner

## Sound Generation

- [ ] Configure Azure AI SDK
- [ ] Create Node.js script for sound generation
- [ ] Implement logic to verify existence of sound files
- [ ] Implement SSML generation for each step
- [ ] Create caching system for sound files
- [ ] Document sound generation process

## Design and Styling

- [ ] Install necessary Shadcn UI components
- [ ] Create custom theme with orange, amber, and lime colors
- [ ] Design responsive main layout
- [ ] Implement styles for start page
- [ ] Implement styles for dance page
- [ ] Implement styles for configuration page
- [ ] Implement styles for share page
- [ ] Create animations for transitions between steps

## Core Functionality

- [ ] Implement saving/loading configuration in localStorage
- [ ] Implement timer for dance session
- [ ] Implement logic for audio playback at the right moment
- [ ] Implement system for copying URL to clipboard
- [ ] Create logic for validating selected steps

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

## Deployment

- [ ] Configure build process for production
- [ ] Optimize assets for production
- [ ] Configure CI/CD (optional)
- [ ] Deploy initial version
- [ ] Perform post-deployment tests

# SEO

- [ ] Implement meta tags for each page
- [ ] Implement Open Graph tags for social sharing
- [ ] Implement structured data for search engines
- [ ] Review the copywriting so it is appealing to the target audience
