/*
 * File: app/view/MyContainer1.js
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

Ext.define('MyApp.view.MyContainer1', {
    extend: 'Ext.Container',
    alias: 'widget.welcomePage',

    config: {
        layout: {
            align: 'center',
            pack: 'center',
            type: 'vbox'
        },
        items: [
            {
                xtype: 'image',
                height: 114,
                id: 'whatCanIDoNowButton',
                width: 114,
                src: 'images/whatCanIDoNow.png'
            },
            {
                xtype: 'picker',
                hidden: true,
                id: 'availableTimePicker',
                useTitles: true,
                slots: [
                    {
                        xtype: 'pickerslot',
                        itemTpl: [
                            '<div>Data View Item {string}</div>'
                        ],
                        data: [
                            {
                                text: '0',
                                value: '0'
                            },
                            {
                                text: '1',
                                value: '1'
                            },
                            {
                                text: '2',
                                value: '2'
                            },
                            {
                                text: '3',
                                value: '3'
                            },
                            {
                                text: '4',
                                value: '4'
                            },
                            {
                                text: '5',
                                value: '5'
                            },
                            {
                                text: '6',
                                value: '6'
                            },
                            {
                                text: '7',
                                value: '7'
                            },
                            {
                                text: '8',
                                value: '8'
                            },
                            {
                                text: '9',
                                value: '9'
                            },
                            {
                                text: '10',
                                value: '10'
                            },
                            {
                                text: '11',
                                value: '11'
                            },
                            {
                                text: '12',
                                value: '12'
                            }
                        ],
                        name: 'HoursPickerSlot',
                        title: 'hours'
                    },
                    {
                        xtype: 'pickerslot',
                        itemTpl: [
                            '<div>Data View Item {string}</div>'
                        ],
                        data: [
                            {
                                text: '0',
                                value: '0'
                            },
                            {
                                text: '5',
                                value: '5'
                            },
                            {
                                text: '10',
                                value: '10'
                            },
                            {
                                text: '15',
                                value: '15'
                            },
                            {
                                text: '20',
                                value: '20'
                            },
                            {
                                text: '25',
                                value: '25'
                            },
                            {
                                text: '30',
                                value: '30'
                            },
                            {
                                text: '35',
                                value: '35'
                            },
                            {
                                text: '40',
                                value: '40'
                            },
                            {
                                text: '45',
                                value: '45'
                            },
                            {
                                text: '50',
                                value: '50'
                            },
                            {
                                text: '55',
                                value: '55'
                            }
                        ],
                        name: 'MinPickerSlot',
                        title: 'min.'
                    }
                ],
                toolbar: {
                    xtype: 'titlebar',
                    docked: 'top',
                    title: 'Available Time?'
                }
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        id: 'manageTasksButton',
                        ui: 'plain',
                        iconAlign: 'center',
                        iconCls: 'note3',
                        iconMask: true
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        name: 'infoButton',
                        itemId: 'mybutton5',
                        ui: 'plain',
                        iconCls: 'info',
                        iconMask: true
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onMybutton5Tap',
                event: 'tap',
                delegate: '#mybutton5'
            }
        ]
    },

    onMybutton5Tap: function(button, e, options) {

        button.up("mainApplicationView").animateActiveItem(2,{type:'flip',duration:800});
    }

});