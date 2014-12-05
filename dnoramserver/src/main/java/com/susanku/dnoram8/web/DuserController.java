package com.susanku.dnoram8.web;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.susanku.dnoram8.service.FormattedAddressService;

@RequestMapping("/dusers")
@Controller
@RooWebScaffold(path = "dusers", formBackingObject = Duser.class)
@RooWebJson(jsonObject = Duser.class)
public class DuserController {
	
	private static final String SUCCESS_FALSE = "{success : false}";
	@Autowired
	private FormattedAddressService formattedAddressService;
	
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
	
	@RequestMapping(value = "/{id}/tasks/{taskId}", method = RequestMethod.POST, headers = "Accept=application/json")
    public ResponseEntity<String> createTaskFromJson(@PathVariable("id") String userid, @RequestBody String json,@PathVariable("taskId") Long taskId) throws Exception {
		// taskId is not used in this method, added id to match with client call, but taskId is also sent in json object
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        System.out.println("task operation at :" + new Date() + "-----------------------------");
        Task task = Task.fromJsonToTask(json);

        System.out.println("task id from sencha:" + task.getId());
        List<Task> list = Task.findTasksByIdEquals(task.getId()).getResultList();
        if (list.size() == 0) {
        	System.out.println("creating task for user id : " + userid);
        	task.setCreatedOn(new Date());
        	task.setUpdatedOn(new Date());
        	task.setUpdated(true);
			Duser duser_id = Duser.findDusersByUseridEquals(userid).getSingleResult();
			// Getting formattedAddress in case of Current or Enter Address
			if("Anywhere".equals(task.getAddressType())){
				System.out.println("Creating Anywhere task");
				task.setFormattedAddress("With this option, you need to type address here !");
			}else if ("Task Location".equals(task.getAddressType())){
				System.out.println("Creating Current Location task");
				String formattedAddress = task.getAddress(); // formattedAddressService.getFormattedAddress(task.getAddress());
				task.setFormattedAddress(formattedAddress);
			}else{
				
				System.out.println("Creating Custom Address task.. raw address received from client : " + task.getFormattedAddress());
				System.out.println("Saving raw data into address field..");
				task.setAddress(task.getFormattedAddress());
				String formattedAddress = formattedAddressService.getFormattedAddress(task.getFormattedAddress());
				if(formattedAddress == null){
					task.setAddress("."); // Setting raw address to blank(dot) if address not found by Google api
					task.setFormattedAddress("Address could not be found..Please enter valid address");
				}else {
					task.setAddress(task.getFormattedAddress()); // Keeping raw address intact 
					task.setFormattedAddress(formattedAddress); // Using formatted data for display
				}
			}
			duser_id.getTasks().add(task);
			task.setDuser_id(duser_id);
			task.persist();
	        duser_id.persist();
	        return new ResponseEntity<String>(task.toJson(),headers, HttpStatus.CREATED);
        }else {
        
	        System.out.println("updating task ");
	        Task oldTask = list.get(0);
	        oldTask.setTitle(task.getTitle());
	        oldTask.setDuration(task.getDuration());
	        oldTask.setCategory(task.getCategory());
	        oldTask.setAddressType(task.getAddressType());
	        oldTask.setUpdatedOn(new Date());
	        oldTask.setNotes(task.getNotes());
	        oldTask.setUpdated(true);
	        if ("Anywhere".equals(task.getAddressType())){
	        	System.out.println("Updating task to Anywhere task.. setting address to blank, retaining old formatted value if any");
	        	oldTask.setAddress("");
	        	oldTask.setFormattedAddress("With this option, you need to type address here !");
	        }else if("Task Location".equals(task.getAddressType())){
	        	System.out.println("Updating task with Task Location..");
	        	System.out.println("it might or might not be different current location.. checking");
	        	if(task.getAddress().equals(oldTask.getAddress())){
	        		System.out.println("Current location is not different..so no need of new formattedAddress");     
	        		
	        	}else {
	        		System.out.println("Current location IS different..so getting new formattedAddress");
	        		String formattedAddress = task.getAddress(); //formattedAddressService.getFormattedAddress(task.getAddress());
		        	oldTask.setFormattedAddress(formattedAddress);
		        	oldTask.setAddress(task.getAddress()); // Important, raw data should be saved in "address"
	        	}
	        }else{
	        	System.out.println("Updating task to Custom address task");
		        if(! oldTask.getFormattedAddress().equals(task.getFormattedAddress())){
		        	System.out.println("New custom address is different than old formatted address.. getting new formatted address");
		        	String formattedAddress = task.getFormattedAddress(); //formattedAddressService.getFormattedAddress(task.getFormattedAddress());
		        	oldTask.setFormattedAddress(formattedAddress);
		        	oldTask.setAddress(task.getFormattedAddress()); // This is important. raw data needs to be saved in "address"
		        }		        	
	        }
	        
	        oldTask.setIsCompleted(task.getIsCompleted());
	        oldTask.flush();
	        return new ResponseEntity<String>(oldTask.toJson(),headers, HttpStatus.OK);
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
