angular.module('campus.app').factory('formatterService', function(
    formDatasService
) {
    var LIST = [{
            label: 'Dispositif',
            key: 'dispositif'
        }, {
            label: 'Client',
            key: 'client'
        }, {
            label: 'Durée',
            key: 'duree'
        }, {
            label: 'Activité',
            key: 'activite'
        }, {
            label: 'Produit',
            key: 'produit'
        }, {
            label: 'Entités',
            key: 'entites',
            multipleChoice: true
        }, {
            label: 'Date de début',
            key: 'from',
            date: true
        }, {
            label: 'Date de fin',
            key: 'to',
            date: true
        }, {
            label: 'Date de début',
            key: 'dateDebut',
            date: true
        }, {
            label: 'Date de fin',
            key: 'dateFin',
            date: true
        }, {
            label: 'Date de création',
            key: 'dateCreation',
            date: true
        }, {
            label: 'Date butoir',
            key: 'dateButoir',
            date: true
        }, {
            label: 'Date avis employeur',
            key: 'dateAvisEmployeur',
            date: true
        }, {
            label: 'Date avis Fongecif',
            key: 'dateAvisFongecif',
            date: true
        }, {
            label: 'Date de la demande',
            key: 'dateDemande',
            date: true
        }];

    this.toDisplay = function(datas) {
        var formDatas = formDatasService.get();

        return Object.keys(datas).reduce(function(obj, key) {
            // format from LIST
            obj[key] = getFormattedValueToDisplay(key, datas[key]);

            // format from FORMDATAS constant
            if (formDatas[key]) {
                if (angular.isArray(obj[key])) {
                    obj[key] = obj[key].map(function(_obj) {
                        return getValue(formDatas[key], _obj);
                    }).join(', ');
                } else {
                    obj[key] = getValue(formDatas[key], datas[key])
                }
            }
            return obj;
        }, datas);
    };

    this.toForm = function(datas) {
        angular.forEach(datas, function(value, key) {
            if (angular.isArray(value)) {
                datas[key] = value.reduce(function(obj, val) {
                    obj[val] = true;
                    return obj;
                }, {});
            }
        });
        return datas;
    };

    this.toParams = function(datas) {
        var params = {},
            keys = Object.keys(datas);

        keys.forEach(function(key) {
            var value = datas[key],
                objSettings = getListObject(LIST, key);

            // keep not empty params only
            if (String(value).length) {

                if (objSettings) {
                    params[key] = getFormattedValueToParams(value, objSettings);
                } else {
                    params[key] = datas[key];
                }
            }

        });
        return params;
    };

    // return datas filtered by filters keys
    this.filters = function(datas, filters) {
        if (filters) {
            return filters.reduce(function(obj, key) {
                if (angular.isDefined(datas[key])) {
                    obj[key] = datas[key];
                }
                return obj;
            }, {});
        } else {
            return datas;
        }
    };

    function getFormattedValueToParams(value, settings) {
        if (settings.multipleChoice) {
            value = multipleChoiceToParams(value);
        }
        if (settings.date) {
            value = new Date(value).getTime();
        }
        return value;
    }

    function multipleChoiceToParams(obj) {
        return Object.keys(obj).reduce(function(res, key) {
            if (obj[key]) {
                res.push(key);
            }
            return res;
        }, []);
    }

    function getFormattedValueToDisplay(key, value) {
        var listItem = getListObject(LIST, key);
        if (listItem) {
            if (listItem.date) {
                value = moment(value).format('DD/MM/YYYY');
            }
        }
        return value;
    }

    function getValue(list, obj) {
        var listObj = getListObject(list, obj);
        return listObj ? listObj.label: obj;
    }

    function getListObject(list, value) {
        return list.filter(function(obj) {
            return obj.key === value || obj.value === value || obj.id === value;
        })[0];
    }

    return this;
});
