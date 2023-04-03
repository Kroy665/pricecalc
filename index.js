const citydata = require('./datas/citydata.json');
const calcdata = require('./datas/calcdata.json');

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

const getGeoCoordinates = async (address) => {
    // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=` + process.env.GOOGLE_MAPS_API_KEY;
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=` +'AIzaSyBpBj_A-8gB2PDHVGaelmShT7GN_s-fgog';


    try {
        const response = await axios.get(apiUrl);
        console.log("getGeoCoordinates response.data:", response.data);
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
    } catch (error) {
        console.error(`Error getting coordinates for address "${address}":`, error.message);
        return null;
    }

};

function distanceInMiles(lat1, lng1, lat2, lng2) {
    const earthRadiusMiles = 3958.8; // Earth's radius in miles

    // Convert latitudes and lnggitudes from degrees to radians
    lat1 = degreesToRadians(lat1);
    lng1 = degreesToRadians(lng1);
    lat2 = degreesToRadians(lat2);
    lng2 = degreesToRadians(lng2);

    // Calculate differences
    const dLat = lat2 - lat1;
    const dlng = lng2 - lng1;

    // Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlng / 2) * Math.sin(dlng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusMiles * c;
}



const getCalcData = (field) => {
    for (let i = 0; i < calcdata.length; i++) {
        if (calcdata[i][field]) {
            return calcdata[i][field];
        }
    }
}

const getValueForSingleField = (lead, field) => {
    var temp = getCalcData(field);
    if (temp == undefined) return false;
    var data = temp.filter((item) => {
        return item.type == lead[field];
    });
    if (data.length > 0) {
        return data[0].value;
    }
    return false;
}

const getReason_for_saleValue = (lead) => {
    const reason_for_sale = lead.reason_for_sale.split('||');
    var max_reason_for_sale_value = 0;
    for (let i = 0; i < reason_for_sale.length; i++) {
        var temp = getCalcData("reason_for_sale");
        if (temp == undefined) return false;
        var data = temp.filter((item) => {
            return item.type == reason_for_sale[i];
        });
        if (data.length > 0) {
            if (data[0].value > max_reason_for_sale_value) {
                max_reason_for_sale_value = data[0].value;
            }
        }
    }
    return max_reason_for_sale_value;
}

const getRepairs_and_maintenanceValue = (lead) => {
    const repairs_and_maintenance = lead.repairs_and_maintenance.split('||');
    var max_repairs_and_maintenance_values = 0;
    for (let i = 0; i < repairs_and_maintenance.length; i++) {
        var temp = getCalcData("repairs_and_maintenance");
        if (temp == undefined) return false;
        var data = temp.filter((item) => {
            return item.type == repairs_and_maintenance[i];
        });
        if (data.length > 0) {
            if (data[0].value > max_repairs_and_maintenance_values) {
                max_repairs_and_maintenance_values = data[0].value;
            }
        }
    }
    return max_repairs_and_maintenance_values;
}


const getPriceByCity = async (lead) => {
    const city = citydata.filter((item) => {
        return item.city == lead.city;
    });
    if (city.length > 0) {
        var price = city[0].Price;
        // remove $ from price
        price = price.replace("$", "");
        // make price to number 
        price = Number(price);
        return price;
    } else {
        var coordinate = await getGeoCoordinates(bodyData?.address + ', ' + bodyData?.city + ', ' + bodyData?.state + ', ' + bodyData?.zip_code + ', ' + bodyData?.country);

        if (!coordinate) {
            return ctx.badRequest(null, 'Please enter valid address');
        }

        var lat = coordinate.lat;
        var lng = coordinate.lng;


        var allDistances = [];
        for (let i = 0; i < citydata.length; i++) {
            const distance = distanceInMiles(lat, lng, citydata[i].lat, citydata[i].lng);
            var discount = null;
            if (distance < 50) {
                discount = 10;
            } else if (distance < 100) {
                discount = 20;
            } else if (distance < 250) {
                discount = 30;
            }

            var price = citydata[i].Price;
            // remove $ from price
            price = price.replace("$", "");
            // make price to number
            price = Number(price);

            allDistances.push({
                discount: discount,
                distance: distance,
                price: price * (100 - discount) / 100
            });
        }
        allDistances.sort((a, b) => {
            return a.distance - b.distance;
        });

        var minDisCountFound = 100;
        var sortedDistances = [];
        for (let i = 0; i < allDistances.length; i++) {
            if (allDistances[i].discount && allDistances[i].discount <= minDisCountFound) {
                minDisCountFound = allDistances[i].discount;
                sortedDistances.push(allDistances[i]);
            }
        }

        console.log(sortedDistances);

        // get max price
        var maxPrice = 0;
        for (let i = 0; i < sortedDistances.length; i++) {
            if (sortedDistances[i].price > maxPrice) {
                maxPrice = sortedDistances[i].price;
            }
        }
        console.log(maxPrice);
        return maxPrice;
    }




}

async function calculatePrice(lead) {
    var price = 0;
    var offers = 0;
    price = await getPriceByCity(lead);

    // reason_for_sale
    const reason_for_sale_value = getReason_for_saleValue(lead);
    offers = offers + price * reason_for_sale_value / 100;
    console.log("reason_for_sale","v:", reason_for_sale_value, "of:",price * reason_for_sale_value / 100, "--->",lead.reason_for_sale );
    // repairs_and_maintenance
    const repairs_and_maintenance_value = getRepairs_and_maintenanceValue(lead);
    offers = offers + price * repairs_and_maintenance_value / 100;
    console.log("repairs_and_maintenance","v:", repairs_and_maintenance_value, "of:",price * repairs_and_maintenance_value / 100, "--->",lead.repairs_and_maintenance);

    // single field
    const fields = [
        "current_condition",
        "interested_in_seller_financing",
        "your_role",
        "is_property_listed",
        "listing_expires",
        "type_of_property",
        "years_of_ownership",
        "mortgage",
        "inhabitant",
        "how_fast",
        "no_of_bedrooms",
        "no_of_bathrooms",
        "garages",
        "square_footage",
        "yearOfConstruction"
    ];

    for (let i = 0; i < fields.length; i++) {
        const value = getValueForSingleField(lead, fields[i]);
        // if (value) {
            offers = offers + price * value / 100;
            console.log(fields[i],"v:", value, "of:",price * value / 100, "--->",lead[fields[i]]);
        // }
    }
    console.log("-----------------------------");
    return {
        price: price + offers,
        offers: offers,
        city: lead.city,

    };
}

module.exports = calculatePrice;


