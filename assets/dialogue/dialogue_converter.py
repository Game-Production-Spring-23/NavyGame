"""
This file is used to convert text files in dialogue format
into dialogue json files.

cmd: python dialogue_converter.py --input_file=./conversion-test/dialog-level-1-mini-game-1.txt --output_file=./conversion-test/dialogue_out.json
"""

import json
import copy
import argparse

parser = argparse.ArgumentParser(description='Dialogue Converter Script')
parser.add_argument('--input_file', action="store", dest='input_file', default="./Dialogue-Template.txt")
parser.add_argument('--output_file', action="store", dest='output_file', default="./dialogue_out.json")

# Now, parse the command line arguments and store the 
# values in the `args` variable
args = parser.parse_args()

# Magic Variables
END_CONVERSATION = "!"

def main():
    # create json object based on template

    # dialogue for when someone speaks
    # is added to "dialogue" array in the conversation framework
    dialogue_block = {
                "playerPortrait": "",
                "playerPortrait1": "",
                "playerPortrait2": "",
                "playerPortrait3": "",
                "otherPortrait": "",
                "isPlayerTalking": True,
                "text": ""
            }

    # conversation framework
    conversation_block = {
        "otherName": "",
        "otherOffset": 0,
        "dialogue": []
    }

    conversation = []

    # open input file
    with open(args.input_file, "r") as file:
        # loop over every line
        other_name = " "
        new_conversation = copy.deepcopy(conversation_block)
        new_dialogue = copy.deepcopy(dialogue_block)
        for line in file:
            line = line.strip('\n') # remove line end character

            # check if the line ends a conversation
            if line[0] == END_CONVERSATION:
                conversation.append(new_conversation)
                new_conversation = copy.deepcopy(conversation_block)
                other_name = " "
                continue

            # check if we have collected the names for the conversation
            if other_name == " ":
                other_name = (line.lower()).capitalize()
<<<<<<< HEAD
=======
                print(other_name)
>>>>>>> 663977f (finished dialogue conversion script)
                new_conversation["otherName"] = other_name
                continue
        
            # if not any of the above situations, the line is a character & dialogue
            name = ""
            text = ""
            is_name_complete = False
            for char in line:
                if char == ":":
                    is_name_complete = True
                else:
                    if is_name_complete == False:
                        name += char
                    else:
                        text += char
            name = (name.lower()).capitalize()
<<<<<<< HEAD
=======
            print(name)
>>>>>>> 663977f (finished dialogue conversion script)
            # add name & text into dialogue
            new_dialogue["text"] = text
            if name == other_name:
                new_dialogue["isPlayerTalking"] = False
            else:
                new_dialogue["isPlayerTalking"] = True

            # write to conversation
            new_conversation["dialogue"].append(new_dialogue)
            new_dialogue = copy.deepcopy(dialogue_block)
    # end open file

    # write to json file
    with open(args.output_file, "w") as file:
        file.write(json.dumps(conversation))
        file.close()       
            

if __name__ == "__main__":
    main()
