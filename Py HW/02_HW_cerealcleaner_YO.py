# -*- coding: utf-8 -*-
"""
Created on Sun Apr 12 12:06:49 2020

@author: 98483
"""
import os, csv

# Finding the path to the cereal.csv file 
fpath = os.path.join('..','..','gwu-arl-data-pt-03-2020-u-c','02-Homework',
                    '03-Python','Part-1-Mini-Assignment',
                    '02-HW_CerealCleaner','Resources','cereal.csv')

# Return the file handle.  
with open (fpath) as fhandle:
# skip the first line
    next (fhandle, None) 
    for row in fhandle:
        rsplit = row.split(',')
        if float(rsplit[7]) >= 5:
            print (rsplit)
            
            



         
   
        