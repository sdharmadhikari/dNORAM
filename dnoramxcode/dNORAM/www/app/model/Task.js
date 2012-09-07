/*
 * File: app/model/Task.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.model.Task', {
    extend: 'Ext.data.Model',
    alias: 'model.task',

    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'title'
            },
            {
                name: 'duration',
                allowNull: false,
                type: 'int'
            },
            {
                name: 'category',
                defaultValue: 'SmartPick'
            },
            {
                name: 'addressType',
                allowNull: false,
                type: 'string'
            },
            {
                name: 'address'
            },
            {
                name: 'isCompleted',
                defaultValue: 0,
                type: 'boolean'
            },
            {
                name: 'drivingTime',
                type: 'int'
            },
            {
                name: 'drivingDistance'
            },
            {
                name: 'totalTaskTime'
            },
            {
                name: 'drivingDistanceText'
            },
            {
                name: 'drivingTimeText'
            }
        ],
        validations: [
            {
                type: 'length',
                field: 'title',
                min: 1
            },
            {
                type: 'length',
                field: 'addressType',
                min: 1
            },
            {
                type: 'presence',
                field: 'addressType'
            }
        ]
    }
});