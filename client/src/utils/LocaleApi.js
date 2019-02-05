import axios from "axios";
import { isArray } from "util";

const basePath = "/api/locale"

function locationToLocale(location) {
    const locale = {
        "query": location.query
    };
    if (location.city) {
        locale.city = location.city;
    }
    if (location.zip) {
        locale.postalCode = location.zip;
    }
    if (location.latitude && location.longitude) {
        locale.latitude = location.latitude;
        locale.longitude = location.longitude;
    }
    if (location.save) {
        locale._id = location.localeId;
    }

    return locale; 
}

function localeToLocation(locale) {
    const location = {
        "query": locale.query,
        "saved": true,
        "localeId": locale._id
    };
    if (locale.city) {
        location.city = locale.city;
    }
    if (locale.postalCode) {
        location.zip = locale.postalCode;
    }
    if (locale.latitude && locale.longitude) {
        location.latitude = locale.latitude;
        location.longitude = locale.longitude;
    }

    return location;
}

export default {
    save: function (location) {
        const locale = locationToLocale(location);
        
        if (location.saved) {
            return axios.put(`${basePath}/${location.localeId}`, locale);
        } else {
            return axios.post(basePath, locale);
        }
    },
    get: function() {
        return axios.get(basePath).then(locale => isArray(locale) ? localeToLocation(locale[0]) : localeToLocation(locale));
    }
}