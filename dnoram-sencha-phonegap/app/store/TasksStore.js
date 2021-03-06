/*
 * File: app/store/TasksStore.js
 *
 * This file was generated by Sencha Architect version 3.0.3.
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

Ext.define('MyApp.store.TasksStore', {
    extend: 'Ext.data.Store',
    alias: 'store.tasksStore',

    requires: [
        'MyApp.model.Task',
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json',
        'Ext.util.Sorter'
    ],

    config: {
        autoLoad: false,
        model: 'MyApp.model.Task',
        storeId: 'tasksStore',
        proxy: {
            type: 'rest',
            actionMethods: {
                create: 'POST',
                read: 'GET',
                update: 'POST',
                destroy: 'DELETE'
            },
            url: 'http://ec2-54-200-65-103.us-west-2.compute.amazonaws.com/dnoram8-1/dusers',
            reader: {
                type: 'json'
            },
            writer: {
                type: 'json'
            }
        },
        sorters: {
            direction: 'DESC',
            property: 'id'
        }
    }
});