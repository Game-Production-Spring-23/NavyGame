# Dialogue Converter
This script converts the dialogue into a json object

## How to Use:
Use the following command:

`python dialogue_converter.py --input_file=./Dialogue-Template.txt --output_file=./dialogue_out.json`

* **input_file**: the dialogue file you with to convert.
* **output_file**: the name of the file you are creating (can be path as well)

## Dialogue Format:
Make sure your text file is in this format (example dialogue file):
```
Name 2
Player Name:Hello There!
Name 2:Hi!
!
Name 3
Name 3:Its time to get busy.
Name 3:Lets start by doing some work.
Player Name:Gotcha!
!
```

## Characters
* **!**: Signifies the end of a conversation.
* The first line after **!** should be the other character who is talking to the player.
* All following lines should be the person speaking followed by a **semicolon (:)**, then the Text that the person is supposed to have.
* Conversations continue until the **!** is reached.