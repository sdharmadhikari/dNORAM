package com.susanku.dnoram8.web;

import java.util.List;
import java.util.Set;

import org.springframework.dao.EmptyResultDataAccessException;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.susanku.dnoram8.domain.Duser;
import com.susanku.dnoram8.domain.Task;

@RequestMapping("/dusers")
@Controller
@RooWebScaffold(path = "dusers", formBackingObject = Duser.class)
@RooWebJson(jsonObject = Duser.class)
public class DuserController {
	
	private static final String SUCCESS_FALSE = "{success : false}";
	
    @RequestMapping(value = "/{id}", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String> showJson(@PathVariable("id") String userid) {
        List<Duser> duserList = Duser.findDusersByUseridEquals(userid).getResultList();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        if (duserList.size() == 0) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }else{
        	return new ResponseEntity<String>(duserList.get(0).toJson(), headers, HttpStatus.OK);
        }
    }
    
	// Following method is redundant for now, but its left here to display good example of REST api for one-to-many relation.
	@RequestMapping(value = "/{id}/tasks",headers = "Accept=application/json")
    public ResponseEntity<String> listTasksFromJson(@PathVariable("id") String userid, @RequestBody String json) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        Duser duser = null;
        try {
        	duser = Duser.findDusersByUseridEquals(userid).getSingleResult();       	
        }catch (EmptyResultDataAccessException e) {
        	duser = new Duser();
        	duser.setUserid(userid);
        	duser.persist();       	
        }catch(Exception e){
        	return new ResponseEntity<String>(SUCCESS_FALSE, headers, HttpStatus.NOT_FOUND);
        }
		Set<Task> result = duser.getTasks();
		
		return new ResponseEntity<String>(Task.toJsonArray(result), headers, HttpStatus.OK);
    }  
	
	// Following method is redundant for now, but its left here to display good example of REST api for one-to-many relation.
	@RequestMapping(value = "/{id}/tasks/{taskId}", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> createTaskFromJson(@PathVariable("id") String userid, @RequestBody String json,@PathVariable("taskId") Long taskId) {
		// taskId is not used in this method, added id to match with client call, but taskId is also sent in json object
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        
        Task task = Task.fromJsonToTask(json);

        List<Task> list = Task.findTasksByIdEquals(task.getId()).getResultList();
        if (list.size() == 0) {
        	System.out.println("creating task for user id : " + userid);
			Duser duser_id = Duser.findDusersByUseridEquals(userid).getSingleResult();
			duser_id.getTasks().add(task);
			task.setDuser_id(duser_id);
			task.persist();
	        duser_id.persist();
	        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
        }else {
        
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
	
    @RequestMapping(value = "/{id}/tasks/{taskId}", method = RequestMethod.DELETE, headers = "Accept=application/json")
    public ResponseEntity<String> deleteFromJson(@PathVariable("id") String id, @PathVariable("taskId") String taskId) {
        HttpHeaders headers = new HttpHeaders();
    	Duser duser = Duser.findDusersByUseridEquals(id).getSingleResult();
        if (duser == null) {
            return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
        }
    	Set<Task> tasks = duser.getTasks();
    	for(Task task : tasks){
    		if(task.getId().equals(taskId)) {
    			
    			tasks.remove(task);
    			task.remove();
    			break;
    		}
    	}
    	
        headers.add("Content-Type", "application/json");
        
        return new ResponseEntity<String>(headers, HttpStatus.OK);
    }
 
   
}
