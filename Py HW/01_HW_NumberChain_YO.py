# -*- coding: utf-8 -*-
"""
Created on Sun Apr 12 10:04:58 2020

@author: 98483
"""

floor = 0
ans = 'y'


while ans == 'y':
    try:
        num = int(input('Enter a numner: \n Enter >'))
        limit = floor + num
    
        for n in range(floor,limit):
            print (n)
        
        ans = input('Want to play agian? \n (y/n) >')
        if ans == 'y':
            floor = limit
    except:
        print('\nYou did not enter a number.\nPleaes Try agian')
        continue 
        
            
     
