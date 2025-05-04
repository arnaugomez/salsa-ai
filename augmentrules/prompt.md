
# Start page

Contains a short welcome message and presentation of the app. It contains a form where the user can select:

- Type of dance (currently there is only Salsa but there will also be other dances like bachata)
- Mode (single/couple)
- Difficulty

These parameters are saved and retrieved (the initial values) in the local storage so that the user can find them how they were when they use the app again.

It also has a link to the configuration page in the top right corner.

It also has a share button in the top right corner. When clicked, it has the same behavior as the share button in the dance page.

# Dance page

First, it will show a button to start the dance session. Below the button, it will show a list of cards with playlists. Each playlist card will have a title, a photo, and when you click on it it will open the playlist link in a new window.

When you click on the button, it will hide the button and playslists, and show the dance session. The dance session will show the following:

- The name of the current step
- Time spent dancing in minutes and seconds
- A button to stop the dance session and go back to the start page

Every x seconds, it will show a new step. When it shows a new step, it will play a sound of the instructor saying the name of the step.

Each step has a list of next steps. The next step will be selected randomly from the list of next steps of the current step, that are included in the list of steps that are selected by the user. If there are no available next steps, select a random step from the list of steps of that dance and mode. The seconds between steps will be determined by the difficulty selected by the user.

# Share page

Contains a congratulations message, the info of the time spent dancing, a call to action to share the app and a button to share the dance session on social media. The button copies a link to the current website URL to the clipboard. And it shows a toast when copied (use the Shadcn sonner component to show the toast).

# Configuration page

Contains a form to configure the app. It has the following fields:

- Steps: a list of steps that the user can select. Each step is a checkbox. Steps are categorized by: dance, mode, and course (salsa 1, salsa 2, etc.). Use headers to group the steps by category.

Every time the user changes the steps selection, do the following:

- First, check that each step has a list of next steps. If not, show an error message saying that the step XXX does not have any next steps available.
- Then, save the steps in local storage. As an array of the IDs of the steps. If you showed the error message, save the steps anyway.

It also has a select to choose the voice of the instructor. Available oices are: es-CU-BelkysNeural (Female), es-CU-ManuelNeural (Male), es-ES-ElviraNeural (Female)
es-ES-AlvaroNeural (Male), es-ES-ArnauNeural (Male), es-ES-LaiaNeural (Female)

# Design

Use Shadcn UI design system. Use cards, separators, and layouts accordingly to separate elements. The app should be visually pleasing and modern. Use Tailwind colors, specially the colors orange, amber and lime. The app should be visually pleasing, with vibrant playful colors (without being too bright). Use a consistent color palette with colors orange, amber and lime

# Creating and playing the sound of the instructor

Store the sounds in the public folder, in the sounds folder.

Each sound has this name: <voicename>_<stepid>_<sayings index>.mp3. For example: es-CU-BelkysNeural_salsa_single_basic_1.mp3.

Each step has a "sayings" array with a list of sayings in the Microsoft SSML format. Each saying is a very short string with something that the instructor says to indicate the step.

Create a node.js script that generates the sounds of each step.For each step, check if the sound file exists and, if not, generate it. Use the Azure AI SDK to generate the sound.

# Languages

All the texts of the app are in Spanish. However, the code and variable names, and documentation comments, are in English. Do not use a translation library,
the app is only in Spanish.
