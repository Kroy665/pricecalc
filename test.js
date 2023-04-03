const calculatePrice = require('./index.js');

leadData = [
    {
        "reason_for_sale": "Preforeclosure||Moving closer to family",
        "current_condition": "Terrible",
        "interested_in_seller_financing": "Yes",
        "repairs_and_maintenance": "Electrical||Structural problems",
        "your_role": "Yes, I own this property",
        "is_property_listed": "No it's not listed",
        "listing_expires": "",
        "type_of_property": "Multifamily",
        "years_of_ownership": "0-1",
        "mortgage": "Yes and I am up to date on my mortgage",
        "inhabitant": "No its Vacant",
        "how_fast": "ASAP",
        "no_of_bedrooms": "1 Bedroom",
        "no_of_bathrooms": "1 Bathroom",
        "garages": "3 Car Detached",
        "square_footage": "5000-8000",
        "yearOfConstruction": "1900-1901",
        "dealer_name": "test",
        "dealer_last": "test",
        "state": "Arizona",
        "city": "Tucson",
        "address": "address",
        "zip_code": "30030",
        "dealer_phone_no": "+445555551234",
        "dealer_email": "uddhab13@gmail.com"
    },
    {
        "reason_for_sale": "Preforeclosure||Moving closer to family",
        "current_condition": "Terrible",
        "interested_in_seller_financing": "Yes",
        "repairs_and_maintenance": "Electrical||Structural problems",
        "your_role": "Yes, I own this property",
        "is_property_listed": "No it's not listed",
        "listing_expires": "",
        "type_of_property": "Multifamily",
        "years_of_ownership": "0-1",
        "mortgage": "Yes and I am up to date on my mortgage",
        "inhabitant": "No its Vacant",
        "how_fast": "ASAP",
        "no_of_bedrooms": "1 Bedroom",
        "no_of_bathrooms": "1 Bathroom",
        "garages": "3 Car Detached",
        "square_footage": "5000-8000",
        "yearOfConstruction": "1900-1901",
        "dealer_name": "test",
        "dealer_last": "test",
        "state": "Arizona",
        "city": "Tucson",
        "address": "address",
        "zip_code": "30030",
        "dealer_phone_no": "+445555551234",
        "dealer_email": "uddhab13@gmail.com"
    }
]

leadData.forEach(async lead => {
    console.log(await calculatePrice(lead));
});

