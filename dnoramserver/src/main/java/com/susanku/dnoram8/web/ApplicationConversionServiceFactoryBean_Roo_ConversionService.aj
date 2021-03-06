// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.susanku.dnoram8.web;

import com.susanku.dnoram8.domain.Duser;
import com.susanku.dnoram8.domain.Task;
import com.susanku.dnoram8.web.ApplicationConversionServiceFactoryBean;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;

privileged aspect ApplicationConversionServiceFactoryBean_Roo_ConversionService {
    
    declare @type: ApplicationConversionServiceFactoryBean: @Configurable;
    
    public Converter<Duser, String> ApplicationConversionServiceFactoryBean.getDuserToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.susanku.dnoram8.domain.Duser, java.lang.String>() {
            public String convert(Duser duser) {
                return new StringBuilder().append(duser.getUserid()).toString();
            }
        };
    }
    
    public Converter<Long, Duser> ApplicationConversionServiceFactoryBean.getIdToDuserConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.susanku.dnoram8.domain.Duser>() {
            public com.susanku.dnoram8.domain.Duser convert(java.lang.Long id) {
                return Duser.findDuser(id);
            }
        };
    }
    
    public Converter<String, Duser> ApplicationConversionServiceFactoryBean.getStringToDuserConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.susanku.dnoram8.domain.Duser>() {
            public com.susanku.dnoram8.domain.Duser convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), Duser.class);
            }
        };
    }
    
    public Converter<Task, String> ApplicationConversionServiceFactoryBean.getTaskToStringConverter() {
        return new org.springframework.core.convert.converter.Converter<com.susanku.dnoram8.domain.Task, java.lang.String>() {
            public String convert(Task task) {
                return new StringBuilder().append(task.getId()).append(' ').append(task.getTitle()).append(' ').append(task.getDuration()).append(' ').append(task.getCategory()).toString();
            }
        };
    }
    
    public Converter<Long, Task> ApplicationConversionServiceFactoryBean.getIdToTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.Long, com.susanku.dnoram8.domain.Task>() {
            public com.susanku.dnoram8.domain.Task convert(java.lang.Long id) {
                return Task.findTask(id);
            }
        };
    }
    
    public Converter<String, Task> ApplicationConversionServiceFactoryBean.getStringToTaskConverter() {
        return new org.springframework.core.convert.converter.Converter<java.lang.String, com.susanku.dnoram8.domain.Task>() {
            public com.susanku.dnoram8.domain.Task convert(String id) {
                return getObject().convert(getObject().convert(id, Long.class), Task.class);
            }
        };
    }
    
    public void ApplicationConversionServiceFactoryBean.installLabelConverters(FormatterRegistry registry) {
        registry.addConverter(getDuserToStringConverter());
        registry.addConverter(getIdToDuserConverter());
        registry.addConverter(getStringToDuserConverter());
        registry.addConverter(getTaskToStringConverter());
        registry.addConverter(getIdToTaskConverter());
        registry.addConverter(getStringToTaskConverter());
    }
    
    public void ApplicationConversionServiceFactoryBean.afterPropertiesSet() {
        super.afterPropertiesSet();
        installLabelConverters(getObject());
    }
    
}
