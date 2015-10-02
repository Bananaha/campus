(function (global, angular) {
    'use strict';

    angular.module('campus.app').factory('formatterService',
        function(

        ) {

            var list = [{
                    label: 'Type',
                    key: 'type'
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
                }];

            this.formatAsList = function(datas) {
                return Object.keys(datas).map(function(key) {
                    var listItem = getItem(key);
                    return {
                        label: listItem.label,
                        value: getFormattedValue(key, datas[key])
                    };
                });
            };

            this.format = function(datas) {
                return Object.keys(datas).reduce(function(obj, key) {
                    obj[key] = getFormattedValue(key, datas[key]);
                    return obj;
                }, {});
            }

            function getFormattedValue(key, value) {
                var listItem = getItem(key);
                if (listItem) {
                    if (listItem.date) {
                        value = moment(value).format('DD/MM/YYYY');
                    }
                }
                return value;
            };

            function getItem(key) {
                return list.filter(function(item) {
                    return item.key === key;
                })[0];
            }

            return this;
        }
    );

}(window, window.angular));

