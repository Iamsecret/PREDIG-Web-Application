import csv
from os import listdir
from os.path import isfile, join

import matplotlib.pyplot as plt
import numpy as np


colors = ["green","orange","red","blue","purple"]


lines = open("../../sample_names.txt",'r').readlines()
labels = [line[:-1] for line in lines]


markers = ["o","^","P","s","D"]


onlyfiles = [f for f in listdir("Output/saccharification/") if isfile(join("Output/saccharification/", f))]

onlyfiles_exp = [f for f in listdir("Output/expe_data/") if isfile(join("Output/expe_data/", f))]


data_dict = {}
data_dict_exp_glc = {}
data_dict_exp_xyl = {}

for f in onlyfiles_exp:
	idx = int(f[-9]) - 1 # extract experiment index from filename
	with open("Output/expe_data/" + f) as tsv:
		data = np.array([line for line in csv.reader(tsv, dialect="excel-tab")],dtype=float)#You can also use delimiter="\t" rather than giving a dialect.
	if f.endswith("glc.txt"):
		data_dict_exp_glc[idx] = data
	else:
		data_dict_exp_xyl[idx] = data

for f in onlyfiles:
	idx = int(f[-5]) - 1 # extract experiment index from filename
	with open("Output/saccharification/" + f) as tsv:
		data = np.array([line for line in csv.reader(tsv, dialect="excel-tab")],dtype=float)#You can also use delimiter="\t" rather than giving a dialect.
	data_dict[idx] = data

fig, ax = plt.subplots(figsize=(10, 8))

max_time = 0
max_sacc_glc = 0
max_sacc_xyl = 0


for values in data_dict_exp_glc.values():
	t = max(values[:,0])
	s = max(values[:,1])
	max_time = max(max_time,t)
	max_sacc_glc = max(max_sacc_glc,s)
 
for values in data_dict_exp_xyl.values():
	t = max(values[:,0])
	s = max(values[:,1])
	max_time = max(max_time,t)
	max_sacc_xyl = max(max_sacc_xyl,s)

for key,value in data_dict_exp_glc.items():
	ax.plot(value[:,0],value[:,1],
         marker=markers[key],
         markersize=10,
         c=colors[key],
         label=labels[key], 
         clip_on=False)
 
for key,value in data_dict.items():
	ax.plot(value[:,0],value[:,1],
         "--",
         linewidth=2,
         c=colors[key],
         label="Simulation - " + labels[key])
 
 
ax.set_xlim((0,max_time + 5))
ax.set_ylim((0,max_sacc_glc))
ax.set_title("Saccharification Glucose", fontsize=15)
ax.set_ylabel("Conversion percentage", fontsize=15)
ax.set_xlabel("Time (in hours)", fontsize=15)
ax.legend()
ax.spines[['right', 'top']].set_visible(False)
fig.savefig("Figures/saccharification_glc_plot.svg",format="svg")

fig, ax = plt.subplots(figsize=(10, 8))

for key,value in data_dict_exp_xyl.items():
	ax.plot(value[:,0],value[:,1],
		 marker=markers[key],
         markersize=10,
         c=colors[key],
         label=labels[key], 
         clip_on=False)
 
for key,value in data_dict.items():
	ax.plot(value[:,0],value[:,1],
         "--",
         linewidth=2,
         c=colors[key],
         label="Simulation - " + labels[key])
 
ax.set_xlim((0,max_time + 5))
ax.set_ylim((0,max_sacc_xyl))
ax.set_title("Saccharification Xylose", fontsize=15)
ax.set_ylabel("Conversion percentage", fontsize=15)
ax.set_xlabel("Time (in hours)", fontsize=15)
ax.legend()
ax.spines[['right', 'top']].set_visible(False)
fig.savefig("Figures/saccharification_xyl_plot.svg",format="svg")