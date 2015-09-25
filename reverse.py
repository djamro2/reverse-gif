from images2gif import writeGif
from PIL import Image
import shutil
import os
import sys

def extractFrames(inGif, outFolder):
    frame = Image.open(inGif)
    nframes = 0
    while frame:
        frame.save( '%s/%s.png' % (outFolder, nframes ) , 'png')
        nframes += 1
        try:
            frame.seek( nframes )
        except EOFError:
            break;
    return True
    

inputGif = sys.argv[1] #the name of the gif to reverse

extractFrames(inputGif, 'output') #get all images from the gif, in reverse order

command = 'pygifme ' #start of command

file_names = [fn for fn in os.listdir('output') if fn.endswith('.png') ] #get the name of all frames (used for length)

#add each frame to the command
for x in range(0, (len(file_names))): 
    num = len(file_names) - x - 1;
    c_filename = 'output/' + str(num) + '.png '
    command = command + c_filename

os.system(command + " --delay=10 --output='finished'") #the command that compiles the gif