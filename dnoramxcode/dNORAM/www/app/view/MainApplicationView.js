/*
 * File: app/view/MainApplicationView.js
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

Ext.define('MyApp.view.MainApplicationView', {
    extend: 'Ext.Container',
    alias: 'widget.mainApplicationView',

    requires: [
        'MyApp.view.MyNavigationView'
    ],

    config: {
        layout: {
            animation: 'slide',
            type: 'card'
        },
        scrollable: false,
        items: [
            {
                xtype: 'panel',
                name: 'welcome',
                html: 'dNORAM',
                layout: {
                    type: 'fit'
                }
            },
            {
                xtype: 'mynavigationview',
                name: 'appcontainer'
            },
            {
                xtype: 'panel',
                name: 'info',
                html: '<div><img src="images/susanku-info.png" /></div><div> info goes here</div><div>&copy; 2012 Susanku Inc</div>',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        items: [
                            {
                                xtype: 'button',
                                handler: function(button, event) {

                                    button.up("mainApplicationView").animateActiveItem(1,{type:'flip',duration:800});
                                },
                                ui: 'plain',
                                iconCls: 'home',
                                iconMask: true
                            }
                        ]
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onContainerShow',
                event: 'show'
            }
        ]
    },

    onContainerShow: function(component, options) {


        //create the delayed task instance with our callback
        var task = Ext.create('Ext.util.DelayedTask', function() {
            console.log('callback!');
            component.animateActiveItem(1,{duration:800,type: 'fade', direction: 'left'});
            task.cancel(); 
        });

        task.delay(3000);
    }

});