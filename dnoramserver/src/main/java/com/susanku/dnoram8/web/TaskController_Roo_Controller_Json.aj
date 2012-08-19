// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package com.susanku.dnoram8.web;

import com.susanku.dnoram8.domain.Duser;
import com.susanku.dnoram8.domain.Task;
import com.susanku.dnoram8.web.TaskController;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

privileged aspect TaskController_Roo_Controller_Json {
    
    @RequestMapping(value = "/{id_}", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.showJson(@PathVariable("id_") Long id_) {
        Task task = Task.findTask(id_);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (task == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(task.toJson(), headers, HttpStatus.OK);
    }
    
    @RequestMapping(headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.listJson() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        List<Task> result = Task.findAllTasks();
        return new ResponseEntity<String>(Task.toJsonArray(result), headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/jsonArray", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.createFromJsonArray(@RequestBody String json) {
        for (Task task: Task.fromJsonArrayToTasks(json)) {
            task.persist();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
    
    @RequestMapping(method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.updateFromJson(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        Task task = Task.fromJsonToTask(json);
        if (task.merge() == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/jsonArray", method = RequestMethod.PUT, headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.updateFromJsonArray(@RequestBody String json) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        for (Task task: Task.fromJsonArrayToTasks(json)) {
            if (task.merge() == null) {
                return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
            }
        }
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{id_}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> TaskController.deleteFromJson(@PathVariable("id_") Long id_) {
        Task task = Task.findTask(id_);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (task == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
        task.remove();
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
    
    @RequestMapping(params = "find=ByDuser_idAndIsCompletedNot", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.jsonFindTasksByDuser_idAndIsCompletedNot(@RequestParam("duser_id") Duser duser_id, @RequestParam(value = "isCompleted", required = false) Boolean isCompleted) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Task.toJsonArray(Task.findTasksByDuser_idAndIsCompletedNot(duser_id, isCompleted == null ? Boolean.FALSE : isCompleted).getResultList()), headers, HttpStatus.OK);
    }
    
    @RequestMapping(params = "find=ByIdEquals", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> TaskController.jsonFindTasksByIdEquals(@RequestParam("id") String id) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        return new ResponseEntity<String>(Task.toJsonArray(Task.findTasksByIdEquals(id).getResultList()), headers, HttpStatus.OK);
    }
    
}
