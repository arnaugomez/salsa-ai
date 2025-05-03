# Domain Entities

## Dance Step
- id (in kebab-case). Unique id For example: salsa-single-vuelta-derecha
- name (in spanish). For example: Vuelta derecha
- sayings: Sentences of the instructor saying the step. In the SSML format of Azure text to speech
- dance: id of the dance (salsa, bachata, etc)
- mode: id of the dance mode (solo, couple)
- course: id of the dance course (salsa-1, salsa-2, etc)
- nextMoves: A list of IDs of the moves that can go next.

## Dance Course
- id (in kebab-case). For example: salsa-1
- name (in spanish). For example: Salsa 1
- steps: Steps of the course

# Playlist
- name
- image
- description
- url
- dance: id of the dance (salsa, bachata, etc)
