# -*- coding: utf-8 -*-
"""
Created on Mon Apr 13 17:30:32 2020

@author: 98483
"""
import os, csv

fpath = os.path.join('resources','budget_data.csv')
foutput = open ('pybankoutput.txt','w')

count = 0
net = 0
totalchng = 0
lrginc = 0
lrgdec = 0

with open (fpath) as fhandle:
    next(fhandle, None)
   
    for row in fhandle:
        rsplit = row.split(',')
        if count == 0:
            value1 = int(rsplit[1])
            count +=1   
            print(f'first value: {value1}')
        else:
            value2 = int(rsplit[1])
            mnthchng =  value2 - value1
            if mnthchng > lrginc:
                lrginc = mnthchng
                incdate = rsplit[0]
            if mnthchng < lrgdec:
                lrgdec = mnthchng
                decdate = rsplit[0]
            
            totalchng = totalchng + mnthchng
            count += 1
            value1 = int(rsplit[1])
            avgchng = totalchng/(count - 1)
            
        net = net + value1
        
    print(f'\nFinancial Analysis\n----------\n'
          f'Total Month: {count}\n'
          f'Total: ${net}\n'
          f'Average Change: ${avgchng:.2f}\n'
          f'Greatest Increase in Profits: {incdate}  $({lrginc})\n'
          f'Greatest Decrease in Profits: {decdate}  $({lrgdec})')
    
 
output = str(f'\nFinancial Analysis\n----------\n'
          f'Total Month: {count}\n'
          f'Total: ${net}\n'
          f'Average Change: ${avgchng:.2f}\n'
          f'Greatest Increase in Profits: {incdate}  $({lrginc})\n'
          f'Greatest Decrease in Profits: {decdate}  $({lrgdec})')

foutput.write(output)    
foutput.close()
        
                
            
        