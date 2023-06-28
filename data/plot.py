import csv

import matplotlib.pyplot as plt
import numpy as np

data = [] 

with open("Output/saccharification/saccharification_1.txt") as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
        data.append(line)

data = np.array(data,dtype=float)

fig, ax = plt.subplots(figsize=(10, 8))
ax.plot(data[:,0],data[:,1],"--",linewidth=2,label="released glucose %")
ax.plot(data[:,0],data[:,3],"--",linewidth=2,label="released xylose %")
ax.set_title("Saccharification time course", fontsize=15)
ax.set_ylabel("Amount of the initial number of monomers released (%)", fontsize=15)
ax.set_xlabel("Time (hours)", fontsize=15)
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
ax.legend()
ax.spines[['right', 'top']].set_visible(False)
fig.savefig("Figures/saccharification_plot.svg",format="svg")


data = []

with open("Output/enzyme_activity/enzyme_activity_1.txt") as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
        data.append(line)

data = np.array(data,dtype=float)

fig, ax = plt.subplots(figsize=(10, 8))
ax.plot(data[:,0],data[:,1],"--",linewidth=2,label="EG")
ax.plot(data[:,0],data[:,2],"--",linewidth=2,label="CBH")
ax.plot(data[:,0],data[:,3],"--",linewidth=2,label="BGL")
ax.plot(data[:,0],data[:,4],"--",linewidth=2,label="XYL")
ax.set_title("Simulated enzyme activity", fontsize=15)
ax.set_ylabel("Fraction of the reactions of a particular type", fontsize=15)
ax.set_xlabel("Time (hours)", fontsize=15)
ax.set_xlim(0, 100)
ax.set_ylim(0, 1)
ax.legend()
ax.spines[['right', 'top']].set_visible(False)
fig.savefig("Figures/enzyme_activity_plot.svg",format="svg")