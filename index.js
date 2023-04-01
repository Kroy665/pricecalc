const citydata = require('./datas/citydata.json');
const calcdata = require('./datas/calcdata.json');


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


const getPriceByCity = (lead) => {
    return 285;
}

function calculatePrice(lead) {
    var price = 0;
    var offers = 0;
    price = getPriceByCity(lead);

    // reason_for_sale
    const reason_for_sale_value = getReason_for_saleValue(lead);
    offers = offers + price * reason_for_sale_value / 100;
    console.log("reason_for_sale", reason_for_sale_value);
    // repairs_and_maintenance
    const repairs_and_maintenance_value = getRepairs_and_maintenanceValue(lead);
    offers = offers + price * repairs_and_maintenance_value / 100;
    console.log("repairs_and_maintenance", repairs_and_maintenance_value);
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
        if (value) {
            offers = offers + price * value / 100;
            console.log(fields[i], value);
        }
    }
    return price + offers;
}

module.exports = calculatePrice;


