// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.susanku.dnoram8.domain;

import com.susanku.dnoram8.domain.Duser;
import com.susanku.dnoram8.domain.Task;
import java.util.Set;

privileged aspect Duser_Roo_JavaBean {
    
    public String Duser.getUserid() {
        return this.userid;
    }
    
    public void Duser.setUserid(String userid) {
        this.userid = userid;
    }
    
    public Set<Task> Duser.getTasks() {
        return this.tasks;
    }
    
    public void Duser.setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }
    
}
