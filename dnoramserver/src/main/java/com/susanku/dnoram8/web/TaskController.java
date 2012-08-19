package com.susanku.dnoram8.web;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.roo.addon.web.mvc.controller.scaffold.RooWebScaffold;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.susanku.dnoram8.domain.Duser;
import com.susanku.dnoram8.domain.Task;

@RequestMapping("/tasks/{id}")
@Controller
@RooWebScaffold(path = "tasks", formBackingObject = Task.class)
@RooWebJson(jsonObject = Task.class)
public class TaskController {

    @RequestMapping(method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<java.lang.String> createFromJson(@RequestBody String json,@PathVariable("id") Long id) {
    	// Path Variable id is not used in this method
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        Task task = Task.fromJsonToTask(json);
        List<Task> list = Task.findTasksByIdEquals(task.getId()).getResultList();
        if (list.size() == 0) {
            System.out.println("creating new task");
            
            Duser duser = Duser.findDusersByUseridEquals(task.getDuser_id().getUserid()).getSingleResult();
            duser.getTasks().add(task);
    		task.setDuser_id(duser);
    		task.persist();
            duser.persist();

            return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        } else {
            System.out.println("updating task ");
            Task oldTask = list.get(0);
            oldTask.setTitle(task.getTitle());
            oldTask.setDuration(task.getDuration());
            oldTask.setCategory(task.getCategory());
            oldTask.setAddress(task.getAddress());
            oldTask.setIsCompleted(task.getIsCompleted());
            oldTask.flush();
            return new ResponseEntity<String>(headers, HttpStatus.OK);
        }
    }
}
