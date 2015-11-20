(function (global, angular, moment) {
    'use strict';

    angular.module('campus.app').factory('formatterService',
        function(
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

            this.format = function(datas) {
                return Object.keys(datas).reduce(function(obj, key) {
                    obj[key] = getFormattedValue(key, datas[key]);
                    return obj;
                }, {});
            };

            this.toDisplay = function(datas) {
                var formDatas = formDatasService.get();
                datas = this.format(datas);
                return Object.keys(datas).reduce(function(obj, key) {
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
                return Object.keys(datas).reduce(function(res, key) {
                    var objSettings = getListObject(LIST, key);
                    if (objSettings && objSettings.multipleChoice) {
                        res[key] = formatMultipleChoice(datas[key]);
                        console.log(key, res[key]);
                    }
                    return res;
                }, datas);
            };

            function formatMultipleChoice(obj) {
                return Object.keys(obj).reduce(function(res, key) {
                    if (obj[key]) {
                        res.push(key);
                    }
                    return res;
                }, []);
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

            function getFormattedValue(key, value) {
                var listItem = getItem(key);
                if (listItem) {
                    if (listItem.date) {
                        value = moment(value).format('DD/MM/YYYY');
                    }
                }
                return value;
            }

            function getItem(key) {
                return LIST.filter(function(item) {
                    return item.key === key;
                })[0];
            }

            return this;
        }
    );

}(window, window.angular, window.moment));

