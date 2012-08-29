package com.susanku.dnoram8.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.susanku.dnoram8.domain.Duser;
import com.susanku.dnoram8.domain.Task;
import com.susanku.dnoram8.service.DistanceMatrixService;

@RequestMapping("/getbesttask")
@Controller
@RooWebJson(jsonObject = Task.class)
public class GetBestTaskController {

	@Autowired
	private DistanceMatrixService dmService;
	
	private static final String SUCCESS_FALSE = "{success : false}";
	
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody	
    public ResponseEntity<String> listJson(@RequestParam(value = "userid") String userid,
    		@RequestParam(value = "minutes") Integer minutes, 
    		@RequestParam(value = "address") String address,
    		@RequestParam(value = "_dc", required = false) String _dc) {
    	System.out.println("inside GetBestTaskController listJson with minutes :" + minutes + "and address : " + address);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        Duser duser = null;
        List<Task> result = null;
        
        try {
        	
        	duser = Duser.findDusersByUseridEquals(userid).getSingleResult();    
            result = Task.findTasksByDuser_idAndIsCompletedNot(duser, true).getResultList();
    		result = dmService.getDistanceMatrix(address, result);
    		
        }catch (EmptyResultDataAccessException e) {
        	
        	duser = new Duser();
        	duser.setUserid(userid);
        	duser.persist();    
        	result = new ArrayList<Task>();
        	
        }catch(Exception e){
        	return new ResponseEntity<String>(SUCCESS_FALSE, headers, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<String>(Task.toJsonArray(result), headers, HttpStatus.OK);
    }
    
    
    @RequestMapping(method = RequestMethod.POST, value = "{id}")
    public void post(@PathVariable Long id, ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
    }

    // Temporarily disabled this method in order to not conflict with listJson. 
    // Need to find out how can I distinguish between two using headers.
//    @RequestMapping
//    public String index() {
//        return "getbesttask/index";
//    }
    
}
