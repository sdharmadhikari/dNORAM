/*
 * File: app/controller/MainController.js
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

Ext.define('MyApp.controller.MainController', {
    extend: 'Ext.app.Controller',

    config: {
        stores: [
            'TasksStore'
        ],

        refs: {
            mynavigationview: 'mynavigationview',
            addtaskbutton: '#addTaskButton',
            savetasknavbutton: '#saveTaskNavButton',
            availableTimePicker: '#availableTimePicker',
            homePageContainer: '#homePageContainer',
            currentDuser: 'duser',
            addtaskform: 'addTaskFormAlias',
            addressfieldset: {
                selector: '.fieldset[name="addressFieldFieldSet"]',
                xtype: 'fieldset'
            },
            addresstextareafield: 'textareafield[name="address"]',
            addressFieldSelect: 'selectfield[name="addressType"]',
            refreshbutton: 'button[iconCls="refresh"]',
            deletetaskbutton: 'button[name="delete"]',
            mapItButton: 'button[name="mapIt"]',
            mapPanel: {
                autoCreate: true,
                selector: 'mapPanel',
                xtype: 'mapPanel'
            }
        },

        control: {
            "#manageTasksButton": {
                tap: 'onManageTaskButtonTap'
            },
            "#addTaskButton": {
                tap: 'onAddTaskButton'
            },
            "#saveTaskNavButton": {
                tap: 'onSaveTaskNavButtonTap'
            },
            "#whatCanIDoNowButton": {
                tap: 'onWhatCanIDoNowButtonTap'
            },
            "#availableTimePicker": {
                change: 'onAvailableTimePickerChange'
            },
            "navigationview": {
                push: 'onNavigationviewPush',
                back: 'onNavigationviewBack',
                activeitemchange: 'onNavigationviewActiveItemChange'
            },
            "manageTaskListAlias": {
                itemtap: 'onManageTasksListIItemTap'
            },
            "taskResultListAlias": {
                itemtap: 'onResultListItemTap'
            },
            "addressFieldSelect": {
                change: 'onSelectfieldChange'
            },
            "button[iconCls='refresh']": {
                tap: 'onRefreshButtonTap'
            },
            "button[name='delete']": {
                tap: 'onDeleteButtonTap'
            },
            "list": {
                itemswipe: 'onTaskListItemSwipe'
            },
            "button[name='mapIt']": {
                tap: 'onMapItButtonTap'
            }
        }
    },

    onManageTaskButtonTap: function(button, e, options) {
        console.log('1');

        /// Above code goes back to launch method of controller

        details = Ext.create('MyApp.view.ManageTaskList', {
            title: 'My Tasks'
        });
        console.log('test');
        Ext.getStore('tasksStore').load();
        this.getMynavigationview().push(details);



    },

    onAddTaskButton: function(button, e, options) {
        console.log('2');
        var now = new Date();
        var taskId = (now.getTime()).toString();

        var newTask = Ext.create('MyApp.model.Task', {
            id : taskId,
            duration : 15
        });


        var addTaskForm = Ext.create('MyApp.view.AddTaskForm', { 
            title : 'New Task'
        });

        console.log('addTaskForm xtype when new object ' ,addTaskForm.xtype);



        addTaskForm.setRecord(newTask);

        this.getMynavigationview().push(addTaskForm);


    },

    onSaveTaskNavButtonTap: function(button, e, options) {
        console.log('3');

        console.log('got addTaskForm xtype using controller ref:', this.getAddtaskform().xtype);
        var newValues =  this.getAddtaskform().getValues();

        //alert(newValues.address);
        //alert(newValues.streetaddress);

        var task = this.getAddtaskform().getRecord();
        task.set('title', newValues.title);
        task.set('duration', newValues.duration);
        task.set('category', 'SmartPick');
        task.set('addressType', newValues.addressType);
        task.set('address', newValues.address);
        if(newValues.isCompleted === 0){
            task.set('isCompleted', false);
        }else{
            task.set('isCompleted', true);
        }

        var mainController = MyApp.app.getController('MainController');
        console.log('main controller : ' + mainController);
        if(newValues.addressType == 'Current') {
            console.log('going in current location');
            this.getGeoLocation2( function(position) {             
                task.set('address', position.coords.latitude + ',' + position.coords.longitude);
                task.set('addressType','Task Location');
                mainController.addOrUpdateTask(task);
            });

        }else if(newValues.addressType == 'Custom'){
            if(newValues.address === ''){
                Ext.Msg.alert('Need address with this address option', '', Ext.emptyFn);
                task.reject();
                return;
            }
            //task.set('address', newValues.streetaddress);
            mainController.addOrUpdateTask(task);

        }else if(newValues.addressType == 'Anywhere') {
            //task.set('address', newValues.address);
            mainController.addOrUpdateTask(task);
        } else if(newValues.addressType == 'Task Location') {
            mainController.addOrUpdateTask(task);
        }
    },

    onWhatCanIDoNowButtonTap: function(img, e, options) {
        console.log('4');
        console.log('clicked whatcanidonow');
        this.getAvailableTimePicker().setHidden(false);
    },

    onAvailableTimePickerChange: function(picker, value, options) {
        console.log('5');
        var min = parseInt(value.MinPickerSlot);
        var hours = parseInt(value.HoursPickerSlot);
        console.log('picked hour value : ',hours);
        console.log('picked Min value : ',min);
        resultList = Ext.create('MyApp.view.TaskResultList');
        var resultStore = Ext.getStore('resultStore');
        var proxy = resultStore.getProxy();
        var proxyUrlPrefix = proxy.getUrl();
        //var location = this.getGeoLocation2();
        var location = this.getGeoLocation2(function (location) {
            proxyUrlPrefix = proxyUrlPrefix.split('&minutes=')[0];
            proxy.setUrl(proxyUrlPrefix + '&minutes=' + (hours*60+min) +'&address=' + location.coords.latitude + ',' + location.coords.longitude);
            resultStore.load();
            //proxy.setUrl(proxyUrlPrefix);
            var mainController = MyApp.app.getController('MainController');
            mainController.getMynavigationview().push(resultList);
        });





    },

    onNavigationviewPush: function(navigationView, view, options) {
        /*console.log('6');
        console.log('navigation push ' + view.xtype);
        var viewXtype = view.xtype;

        if(viewXtype == 'manageTaskListAlias' || viewXtype == 'taskResultListAlias') {

        this.getAddtaskbutton().show();
        this.getSavetasknavbutton().hide();

        }
        if(viewXtype == 'addTaskFormAlias') {

        this.getSavetasknavbutton().show();
        this.getAddtaskbutton().hide();

        }*/
    },

    onNavigationviewBack: function(navigationView, eOpts) {
        /*console.log('7');
        console.log('back event ' + navigationView.getActiveItem().xtype);
        var activeViewXtype  = navigationView.getActiveItem().xtype;

        if(activeViewXtype == 'manageTaskListAlias' || activeViewXtype == 'taskResultListAlias') {
        this.getSavetasknavbutton().hide();
        this.getAddtaskbutton().show();
        }

        if(navigationView.getActiveItem().id == 'homePageContainer') {
        this.getAddtaskbutton().hide();
        }*/
    },

    onManageTasksListIItemTap: function(dataview, index, target, record, e, options) {
        console.log('8');

        var addTaskForm = Ext.create('MyApp.view.AddTaskForm', { 
            title : 'Edit Task'
        });



        if ( record.get('addressType') == 'Task Location') {
            //this.getGoogleMap().show();
            addressTypeStore = Ext.getStore('addressTypeStore');
            addressTypeStore.add({text: 'Task Location',  value: 'Task Location'});
            this.getAddresstextareafield().show();
        }

        addTaskForm.setRecord(record);

        this.getMynavigationview().push(addTaskForm);
    },

    onResultListItemTap: function(dataview, index, target, record, e, options) {
        console.log('9');
        var addTaskForm = Ext.create('MyApp.view.AddTaskForm', { 
            title : 'Edit Task'
        });

        if (record.get('addressType') == 'Current'){
            this.getAddresstextareafield().show();
        } else if ( record.get('addressType') == 'Task Location') {
            addressTypeStore = Ext.getStore('addressTypeStore');
            addressTypeStore.add({text: 'Task Location',  value: 'Task Location'});
            this.getAddresstextareafield().show();
        }

        addTaskForm.setRecord(record);

        this.getMynavigationview().push(addTaskForm);
    },

    onNavigationviewActiveItemChange: function(container, value, oldValue, options) {
        console.log('10');
        console.log('old view xtype ' + oldValue.xtype);
        console.log('new view xtype ' + value.xtype);

        if(value.xtype=='taskResultListAlias' && oldValue.xtype == 'addTaskFormAlias') {
            var resultStore = Ext.getStore('resultStore');
            resultStore.load();
        }

        // Nav showHide logic
        if(value.xtype=='welcomePage') {
            this.getAddtaskbutton().hide();
            this.getRefreshbutton().hide();
            this.getSavetasknavbutton().hide();
        }

        if(value.xtype=='taskResultListAlias' ) {
            this.getAddtaskbutton().show();
            this.getRefreshbutton().show();
            this.getSavetasknavbutton().hide();
        }

        if(value.xtype=='manageTaskListAlias') {
            this.getAddtaskbutton().show();
            this.getRefreshbutton().hide();
            this.getSavetasknavbutton().hide();    
        }


        if(value.xtype=='addTaskFormAlias' ) {
            this.getAddtaskbutton().hide();
            this.getSavetasknavbutton().show();
            this.getRefreshbutton().hide();
            if(value.config.title == 'Edit Task') {
                this.getDeletetaskbutton().show();
            } else {
                this.getDeletetaskbutton().hide();
            }
        }

        if(value.xtype=='mapPanel') {
            this.getAddtaskbutton().hide();
            this.getRefreshbutton().hide();
            this.getSavetasknavbutton().hide();
        }

        // remove 'Task location" entry from store which was added during edit mode when address type is 'Current Address'
        if (oldValue.xtype=='addTaskFormAlias' && value.xtype !== 'mapPanel'){
            addressTypeStore = Ext.getStore("addressTypeStore");
            selectOptionTaskLocationRecord = addressTypeStore.findRecord('text','Task Location');
            if(selectOptionTaskLocationRecord !== null) {
                addressTypeStore.remove(selectOptionTaskLocationRecord);
            }
        }
    },

    onSelectfieldChange: function(selectfield, newValue, oldValue, options) {
        console.log('onSelectfieldChange');
        var addressTextAreaField = this.getAddresstextareafield();
        /*if(newValue.data.value == 'Custom') {
        var theTextAreaField =  {
        xtype: 'textareafield',
        label: 'Street Address',
        maxRows: 3,
        name: 'streetaddress',
        showAnimation : 'fadeIn',
        id : 'addressTextAreaField',
        labelWidth : '50%'
        };

        addressFieldSet.add(theTextAreaField);
        }else{
        var customAddress = this.getAddresstextareafield();
        if(customAddress != undefined){ 
        console.log('custom address is not undefined');
        addressFieldSet.remove(customAddress);
        }
        }*/

        if(newValue.data.value == 'Custom' ) {
            addressTextAreaField.show();
        } else {
            addressTextAreaField.hide();
        }

        if(newValue.data.value === 'Anywhere') {
            this.getMapItButton().hide();
        } else {
            this.getMapItButton().show();
        }
    },

    onRefreshButtonTap: function(button, e, options) {
        //alert('clicked refresh');

        var picker = this.getAvailableTimePicker();
        //alert(picker.getValue().MyPickerSlot);

        var min = parseInt(picker.getValue()['MinPickerSlot']);
        var hours = parseInt(picker.getValue()['HoursPickerSlot']);
        console.log('picked hour value : ',hours);
        console.log('picked Min value : ',min);

        var value = picker.getValue();

        resultList = Ext.create('MyApp.view.TaskResultList');
        var resultStore = Ext.getStore('resultStore');
        var proxy = resultStore.getProxy();
        var proxyUrlPrefix = proxy.getUrl();
        proxyUrlPrefix = proxyUrlPrefix.split('&minutes=')[0];
        //var location = this.getGeoLocation2();
        var location = this.getGeoLocation2(function (location) {
            proxy.setUrl(proxyUrlPrefix + '&minutes=' + (hours*60+min) +'&address=' + location.coords.latitude + ',' + location.coords.longitude);
            resultStore.load();
            //proxy.setUrl(proxyUrlPrefix);
        });
    },

    onDeleteButtonTap: function(button, e, options) {

        var task = this.getAddtaskform().getRecord();

        console.log("deleting task:"+task.get('title'));

        //var store = task.stores[0];
        var store = Ext.getStore("tasksStore");
        store.remove(task);
        store.sync();

        this.getMynavigationview().pop();
    },

    onTaskListItemSwipe: function(dataview, index, target, record, e, options) {
        console.log("swipe on:"+record.data.title);

        var del = Ext.create("Ext.Button", {
            ui: "decline",
            text: "Delete",
            style: "position:absolute;right:2.58em;bottom: 0.44em;",
            handler: function() {
                var recordId = record.data.id;
                var store = record.stores[0];
                store.remove(record);
                if(store.getStoreId() !== 'tasksStore') {
                    var tasksStore = Ext.getStore("tasksStore");
                    var taskFromTaskStore = tasksStore.findRecord('id', recordId);
                    tasksStore.remove(taskFromTaskStore);
                    tasksStore.sync();
                } else {
                    store.sync();
                }
            }
        });
        var removeDeleteButton = function() {
            Ext.Anim.run(del, 'fade', {
                after: function() {
                    del.destroy();
                },
                out: true
            });
        };
        del.renderTo(Ext.DomQuery.selectNode(".deleteplaceholder", target.dom));
        dataview.on({
            single: true,
            buffer: 250,
            itemtouchstart: removeDeleteButton
        });
        dataview.element.on({
            single: true,
            buffer: 250,
            touchstart: removeDeleteButton
        });

    },

    onMapItButtonTap: function(button, e, options) {

        mapPanel = this.getMapPanel();//Ext.create("MyApp.view.MapPanel");
        var addressType = this.getAddressFieldSelect().getValue();
        if(addressType == 'Current') {
            this.getMynavigationview().push(mapPanel);
        }else if(addressType == 'Custom' || addressType == 'Task Location'){
            var address = this.getAddresstextareafield().getValue();
            if(address !== ''){
                mapPanel.address = address;
                this.getMynavigationview().push(mapPanel);
            }
        }






    },

    getGeoLocation2: function(callback) {

        console.log('getLoc');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                callback(position);
            }, function(error) {
                Ext.Msg.alert('Please turn ON the location services for dNORAM under settings.', error.message, Ext.emptyFn);
            });
        } else {
            Ext.Msg.alert('ERROR', 'Geo location is disabled', Ext.emptyFn);
        }
    },

    launch: function() {
        var LOCAL_USER_ID = 1;    

        MyApp.model.LocalUser.load(LOCAL_USER_ID, {
            success: function(localUser) {
                userid = localUser.get('userid');
                console.log('local user userid : ' + userid);

                // I have to duplicate this code in failure config also
                // because if I make this as method like below commented
                // does not work !
                //setUsersProxyUrlLoadStore(userid);            
                var tasksStore = Ext.getStore('tasksStore');
                var proxy = tasksStore.getProxy();
                var proxyUrlPrefix = proxy.getUrl();
                //comment #1: following line added for debug purpose if launch method is invoked more than once
                proxyUrlPrefix = proxyUrlPrefix.split('/'+userid)[0];
                // end of comment #1
                proxy.setUrl(proxyUrlPrefix + '/' + userid + '/tasks');
                //console.log("loading taskStore..");
                //tasksStore.load({ callback:function(records, operation, success) {
                //    console.log("taskStore load done:"+success);
                //}, scope:this}); 
                var resultStore = Ext.getStore('resultStore');
                var proxyResult = resultStore.getProxy();
                var proxyResultUrlPrefix = proxyResult.getUrl();
                proxyResultUrlPrefix = proxyResultUrlPrefix.split('?userid=')[0];
                proxyResult.setUrl(proxyResultUrlPrefix + '?userid=' + userid);       

            },

            failure: function(localUser, operation) {  
                //alert('locally saved user not found');
                var now = new Date();
                var userid = (now.getTime()).toString()+ '-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                    return v.toString(16);
                });
                //alert(userid);
                //Ext.Msg.prompt('Login', 'Surely you have unique name:', function(buttonName,userid) {});// end of prompt

                localUser = Ext.create('MyApp.model.LocalUser');
                localUser.set('id', LOCAL_USER_ID);
                localUser.set('userid',userid);
                localUser.save(); 

                //alert('remote user NOT found in database');
                var duser = Ext.create('MyApp.model.Duser',{});
                duser.set('userid',userid);
                duser.set('id',null);

                duser.save({
                    success: function() {
                        console.log('The user was created:'+localUser.get('userid'));
                        var tasksStore = Ext.getStore('tasksStore');
                        var proxy = tasksStore.getProxy();
                        var proxyUrlPrefix = proxy.getUrl();
                        //comment #2: following line added for debug purpose if launch method is invoked more than once
                        proxyUrlPrefix = proxyUrlPrefix.split('/'+userid)[0];
                        // end of comment #2
                        proxy.setUrl(proxyUrlPrefix + '/' + userid + '/tasks');
                        //tasksStore.load(); // don't need this as user is just created so task store is going to be empty
                        var resultStore = Ext.getStore('resultStore');
                        var proxyResult = resultStore.getProxy();
                        var proxyResultUrlPrefix = proxyResult.getUrl(); 
                        proxyResultUrlPrefix = proxyResultUrlPrefix.split('?userid=')[0];
                        proxyResult.setUrl(proxyResultUrlPrefix + '?userid=' + userid); 

                    }
                });

            } // end of failure function
        });

    },

    setUsersProxyUrlLoadStore: function(userid) {
        var tasksStore = Ext.getStore('tasksStore');
        var proxy = tasksStore.getProxy();
        var proxyUrlPrefix = proxy.getUrl();        
        proxy.setUrl(proxyUrlPrefix + '/' + userid + '/tasks');
        tasksStore.load();
    },

    addOrUpdateTask: function(task, newValues) {
        console.log('later alert : ' + task.get('address'));

        var errors = task.validate();
        if (!errors.isValid()) {
            Ext.Msg.alert('Enter all mandatory fields', '', Ext.emptyFn);
            task.reject();
            return;
        }
        if (task.duration < 1) {
            Ext.Msg.alert('Duration should be positive value', '', Ext.emptyFn);
            task.reject();
            return;
        }

        var tasksStore = Ext.getStore("tasksStore");
        //var tasksStore = this.getTasksstore();
        console.log('auto sync', tasksStore.getAutoSync());
        console.log('record id ' + task.data.id);

        var taskFromTaskStore = tasksStore.findRecord('id', task.data.id);
        if(null === taskFromTaskStore) {
            tasksStore.add(task);
            tasksStore.sync();
        }else {
            taskFromTaskStore.set('title',task.get('title'));
            taskFromTaskStore.set('duration',task.get('duration'));
            taskFromTaskStore.set('category',task.get('category'));
            taskFromTaskStore.set('address',task.get('address'));
            taskFromTaskStore.set('isCompleted',task.get('isCompleted'));
            taskFromTaskStore.dirty = true;
            tasksStore.sync();
        }


        this.getMynavigationview().pop();
    }

});