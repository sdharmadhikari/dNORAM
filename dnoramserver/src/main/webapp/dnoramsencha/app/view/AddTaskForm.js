/*
 * File: app/view/AddTaskForm.js
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

Ext.define('MyApp.view.AddTaskForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.addTaskFormAlias',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Spinner',
        'Ext.field.Select',
        'Ext.field.TextArea',
        'Ext.field.Toggle',
        'Ext.MessageBox'
    ],

    config: {
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'title',
                        placeHolder: 'Task Title '
                    },
                    {
                        xtype: 'spinnerfield',
                        label: 'Duration',
                        labelWidth: '37%',
                        name: 'duration',
                        required: true,
                        minValue: 0,
                        increment: 5
                    }
                ]
            },
            {
                xtype: 'fieldset',
                name: 'addressFieldFieldSet',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Address',
                        labelWidth: '37%',
                        name: 'addressType',
                        required: true,
                        value: 'Current',
                        store: 'addressTypeStore'
                    },
                    {
                        xtype: 'textareafield',
                        height: 80,
                        hidden: true,
                        labelWidth: 0,
                        name: 'address',
                        placeHolder: 'Type address... ',
                        maxRows: 1
                    }
                ]
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'togglefield',
                        label: 'Completed',
                        labelWidth: '37%',
                        name: 'isCompleted'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        name: 'delete',
                        docked: 'right',
                        hidden: true,
                        ui: 'plain',
                        iconCls: 'trash',
                        iconMask: true
                    },
                    {
                        xtype: 'button',
                        name: 'mapIt',
                        docked: 'left',
                        ui: 'plain',
                        iconCls: 'locate',
                        iconMask: true
                    }
                ]
            }
        ]
    }

});