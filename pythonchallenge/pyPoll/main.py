# -*- coding: utf-8 -*-
"""
Created on Mon Apr 13 17:30:32 2020

@author: 98483
"""

#The winner of the election based on popular vote.

import os, csv

count = 0
wvotcnt = 0

cndset = set()
valdict = {}

fpath = os.path.join('resources','election_data.csv')
foutput = open('pypolloutput.txt','w')

with open (fpath) as fhandle:
    next(fhandle, None)
    for row in fhandle:
        row = row.rstrip("\n")
        rsplit = row.split(',')
        cndset.add(rsplit[2])
        count +=1
        ttlvotcount = count
    
while len(cndset) > 0:
    scount = count
    candidate = cndset.pop() 
    votcount = 0
     
    with open(fpath) as fhandle:
        next(fhandle, None)
        for row in fhandle:
            row = row.rstrip("\n")
            rsplit = row.split(',')
            if candidate == rsplit[2] and count > 0:
                votcount += 1
                count -=1
                valdict[candidate] = votcount

print(f'\nElection Results\n----------\n'
       f'Total Votes: {ttlvotcount}\n----------')
output1 = str(f'\nElection Results\n----------\n'
              f'Total Votes: {ttlvotcount}\n----------')
foutput.write(output1)

for i in valdict:   
    print (f'{i}: {round((valdict[i]/ttlvotcount)*100,4)}% ({valdict[i]})')
    output2 = str(f'\n{i}: {round((valdict[i]/ttlvotcount)*100,4)}% ({valdict[i]})')
    foutput.write(output2)

    if wvotcnt >= valdict[i]:
        continue
    else:
        wvotcnt = valdict[i]
        winner = i
print (f'----------\nWinner: {winner}\n----------')     
output3 = str(f'\n----------\nWinner: {winner}\n----------')
foutput.write(output3)


foutput.close()  