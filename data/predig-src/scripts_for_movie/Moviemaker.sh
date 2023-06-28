#!/bin/bash




# copying the scripts from the folder to main directory
cp scripts_for_movie/frame_*.py .
cp scripts_for_movie/frame_copier.sh .


# backing up simulation_parameters if mode 2 is selected
cp Params/simulation_parameters.txt  Params/simulation_parameters_backup.txt


python3 frame_timelimit_1.py


# Running the simulation

rm -r Output/3D/* >> /dev/null

./code_4 movie -vid >> /dev/null


# Making the frames

./frame_copier.sh

python3 frame_maker_1.py

python3 frame_maker_2a.py

python3 frame_joiner.py


# Set the input file pattern and the output video file name
input_pattern="snapshots/snap_*.png"
output_video="animation.mp4"

# Use FFmpeg to create the video
ffmpeg -framerate 30 -pattern_type glob -i "$input_pattern" -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -y "$output_video"


# Clean up

unlink Params/simulation_parameters.txt
mv Params/simulation_parameters_backup.txt Params/simulation_parameters.txt
rm -r frames_py
rm -r snapshots
rm -r Output/3D/*
touch Output/3D/placeholder.txt
rm -r Output/enzyme_activity/*movie*.txt
rm -r Output/enzyme_concentration/*movie*.txt
rm -r Output/enzyme_fraction/enzyme_fraction_movie_*.txt
rm -r Output/saccharification/saccharification_movie_*.txt
rm -r frame_*.py
rm frame_copier.sh

