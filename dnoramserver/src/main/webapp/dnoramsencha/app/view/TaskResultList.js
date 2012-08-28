/*
 * File: app/view/TaskResultList.js
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

Ext.define('MyApp.view.TaskResultList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.taskResultListAlias',

    config: {
        emptyText: 'No tasks found.',
        loadingText: 'Finding the best tasks for you ..',
        store: 'resultStore',
        grouped: true,
        onItemDisclosure: true,
        itemTpl: [
            '<div>',
            '    <div style="width:10%;float:left;padding:7px 0 0 0">',
            '            <img src="resources/images/dNORAM-LOGO-26.png" />',
            '    </div>',
            '        <div style="width:68%;float:left;">',
            '        <div style="font-weight:bold;clear:both;">',
            '            {title}',
            '        </div>',
            '            <div style="font-size:80%;font-style:italic;clear:both;">',
            '            <tpl if="drivingTime &gt;= 0.1">',
            '                <img src="resources/images/speedometer1.png" width="12px" height="12px" /> {drivingDistanceText} &nbsp;&nbsp;&nbsp;',
            '                <img src="resources/images/time.png" width="12px" height="12px" /> {drivingTimeText}',
            '            <tpl else>',
            '                Current location',
            '            </tpl>',
            '         </div>',
            '    </div>',
            '    <div style="width:22%;float:left;">',
            '        <div style="font-size:80%; color:blue;margin-top:15px; text-align:right;padding-right:31px;">',
            '            {totalTaskTime}m',
            '            </div>',
            '    </div> ',
            '        <div style="clear:both;" > </div>',
            '</div>'
        ]
    }

});