"""
This script adds image paths to the json file, by mapping
names to an image path. It loops through every conversation,
adding the image that is to be used by the characters.

cmd test: python add_image_paths.py --name_map_file=name_map.json
<<<<<<< HEAD
cmd: python add_image_paths.py --input_file=./conversion-test/dialogue_out.json --output_file=./conversion-test/dialogue_out_new.json --name_map_file=./conversion-test/name_map.json
=======
>>>>>>> 663977f (finished dialogue conversion script)
"""

import json
import argparse

parser = argparse.ArgumentParser(description='Dialogue Converter Script')
parser.add_argument('--input_file', action="store", dest='input_file', default="./dialogue_out.json")
parser.add_argument('--output_file', action="store", dest='output_file', default="./dialogue_out_new.json")
parser.add_argument('--name_map_file', action="store", dest='name_map_file', default="./name_map.json")

# Now, parse the command line arguments and store the 
# values in the `args` variable
args = parser.parse_args()

def main():
    # load in the name map file
    name_map = load_json_file(args.name_map_file)

    # load in the input file
    dialogue_file = load_json_file(args.input_file)

    # loop over map file, putting in paths for all of the different conversations
    for i, otherName in enumerate(name_map["otherNames"]):
        for conversation in dialogue_file:
            for dialogue in conversation["dialogue"]:
                    dialogue["playerPortrait"] = name_map["playerPortrait"]
            if otherName[0] == conversation["otherName"]:
                for dialogue in conversation["dialogue"]:
                    dialogue["otherPortrait"] = otherName[1]
    
    # save to output file
    with open(args.output_file, "w") as file:
        file.write(json.dumps(dialogue_file))
        file.close()
    

def load_json_file(file_path:str)-> dict:
    with open(file_path, "r") as file:
        return json.load(file)



if __name__ == "__main__":
    main()
