# # read csv data from docs folder

import csv
import os
import sys

import json 

# # read csv data from docs folder
def read_csv_data(file_name):
    data = []
    with open("docs/"+file_name, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            data.append(row)
    return data


# # print(read_csv_data('MSL Pro Algo - Inputs.csv'))


alldata = read_csv_data('MSL Pro Algo - Inputs.csv')

# headers = data[0]

# allData = []
# for row in data[1:]:
#     print(row)


# data = [
#     ['Preforeclosure', 'Good', 'None', 'Ranch', '1', 'None', '0-500', '1800-1900', 'None', 'Yes, I own this property', '0-1', "No it's not listed", 'Yes and I am up to date on my mortgage', "No it's vacant", 'Yes', 'ASAP'],
#     ['Sell and rent instead', 'Fair', 'Flood/storm/fire', '2-story', '2', '1', '500-1000', '1900-1950', '1 Car Attached', 'Agent/wholesaler', '2-5', "Yes it's listed", 'Yes and I am behind on my mortgage', 'Tenant occupied', 'No', '1 Month'],
#     ['Tired of being a landlord', 'Poor', 'Foundation', 'Mobile home owned land', '3', '1.5', '1000-2000', '1950-1970', '2 Car Attached', '', '6-9', '', 'There is no mortgage', 'Owner occupied', '', '2-3 Months'],
#     ['Emergency reasons', 'Terrible', 'Paint inside', 'Mobile home rented land', '4', '2', '2000-3000', '1970-1980', '1 Car Detatched', '', '10-14', 'When does your listing expire?', '', '', '', '4-5 Months'],
#     ['Death in the family', '', 'Landscaping', 'Multifamily', '5', '2.5', '3000-4000', '1980-2000', '2 Car Detatched', '', '15-19', 'Less than 1 week', '', '', '', ''],
#     ['Moving closer to family', '', 'Kitchen cabinets', 'Bungalow', 'More than 5', '3', '4000-5000', '2000-2015', 'Carport', '', '20-29', '1 to 3 weeks', '', '', '', ''],
#     ['Financial reasons', '', 'Paint outside', 'Cottage', '', 'More than 3', '5000+', '2015+', 'Other', '', '30-50', '1 to 2 months', '', '', '', ''],
#     ['Sell without showings', '', 'Structural problems', 'Townhouse', '', '', '', '', '', '', '50+', '3 to 6 months', '', '', '', ''],
#     ['Retirement', '', 'Roof needs replacement', 'Condo', '', '', '', '', '', '', '', 'Over 6 months', '', '', '', ''],
#     ['Selling a vacant/non-occupied house', '', 'Bathroom(s) need work', 'Duplex', '', '', '', '', '', '', '', '', '', '', '', ''],
#     ['Inherited property/probate', '', 'Boiler/water heater', 'Farmhouse', '', '', '', '', '', '', '', '', '', '', '', ''],
#     ['Relocating', '', 'Electrical', 'Split-level home', '', '', '', '', '', '', '', '', '', '', '', ''],
#     ['', '', 'Kitchen appliances', 'Land', '', '', '', '', '', '', '', '', '', '', '', ''],
#     ['', '', 'Air Conditioning', '', '', '', '', '', '', '', '', '', '', '', '', '']
# ]

titles = alldata[0]
data = alldata[1:]

def count_values(column_index):
    counter = {}
    for row in data:
        value = row[column_index]
        if value not in counter:
            counter[value] = 0
        counter[value] = 0
    return counter

def convert_to_list(counter):
    result = []
    for key, value in counter.items():
        result.append({"type": key, "value": value})
    return result

result = []
for i, title in enumerate(titles):
    counter = count_values(i)
    result.append({title: convert_to_list(counter)})

print(result)

with open("docs/"+'data.json', 'w') as f:
    json.dump(result, f)



