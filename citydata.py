import csv
import os
import sys

import json 

# # read csv data from docs folder
def read_csv_data(file_name):
    data = []
    with open('docs/'+file_name, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            data.append(row)
    return data

data = read_csv_data('MSL Pro Algo - City Pricing.csv')



def convert_data(data):
    result = []
    headers = data[0]
    for row in data[1:]:
        result.append(dict(zip(headers, row)))
    return result

print(convert_data(data))
# save data to json file as citydata.json
with open('docs/citydata.json', 'w') as f:
    json.dump(convert_data(data), f)
    

