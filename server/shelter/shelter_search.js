var _ = require('underscore');

var is_missing = function (client, property) {
    var prop = client[property];
    return (prop == null || prop.trim().length == 0 
        || prop == 'Unspecified');
};

var add_missing_attributes = function (shelter) {
    shelter['missing_requirements'] = [];
    var has_gender_requirement = ((shelter['single_men_18+'] != 'yes') 
        || (shelter['single_women_18+'] != 'yes'));

    if (is_missing(shelter['client'], 'gender') && 
            has_gender_requirement){
        shelter['missing_requirements'] = ['gender'];
    }
    return shelter;
};

var visible_keys = function (shelter) {
    return _.pick(shelter, ['name', 'missing_requirements',
        'latitude', 'longitude', 'address', 'capacity',
        'capacity_available']);
};

var add_available_space = function(shelter){
    caps = shelter['bed capacity']
    capacity_available = caps['anyone']['empty'];
    if(shelter['client']['gender'] !== 'Male'){
        capacity_available += caps['ladies']['empty'];
    };
    if(shelter['client']['veteran'] !== 'No'){        
        capacity_available += caps['vets']['empty'];
    };
    shelter['capacity_available']  = capacity_available;
    return shelter;
};

exports.evaluate_capacity = function(shelters, applicant, callback){
        var add_applicant = (shelter) => {
        shelter['client'] = applicant;
        return shelter;
    };

    callback(_.chain(shelters)
        .map(add_applicant)
        .map(add_missing_attributes)
        .map(add_available_space)
        .map(visible_keys)
        .value());
};
