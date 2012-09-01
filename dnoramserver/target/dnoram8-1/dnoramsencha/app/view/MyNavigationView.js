/*
 * File: app/view/MyNavigationView.js
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

Ext.define('MyApp.view.MyNavigationView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mynavigationview',

    requires: [
        'MyApp.view.MyContainer1'
    ],

    config: {
        id: 'viewId',
        navigationBar: {
            id: 'navigationBar',
            items: [
                {
                    xtype: 'button',
                    align: 'right',
                    hidden: true,
                    id: 'saveTaskNavButton',
                    iconMask: true,
                    text: 'Done'
                },
                {
                    xtype: 'button',
                    align: 'right',
                    hidden: true,
                    iconCls: 'refresh',
                    iconMask: true
                },
                {
                    xtype: 'button',
                    align: 'right',
                    hidden: true,
                    id: 'addTaskButton',
                    ui: 'plain',
                    iconCls: 'add',
                    iconMask: true
                }
            ]
        },
        items: [
            {
                xtype: 'welcomePage',
                title: 'dNORAM'
            }
        ]
    }

});