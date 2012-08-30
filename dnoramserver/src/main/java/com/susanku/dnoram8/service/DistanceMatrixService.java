package com.susanku.dnoram8.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.susanku.dnoram8.domain.Task;

@Service
public class DistanceMatrixService {

	private static String BASE_URL = "http://maps.googleapis.com/maps/api/distancematrix/xml";
	
	public List<Task> getDistanceMatrix(String startLocation, Integer availableTime, List<Task> tasks) throws Exception {
		
		List<Task> tasksForLocationQuery = new ArrayList<Task>();
		List<Task> resultList = new ArrayList<Task>();
		for(Task task:tasks) {
			System.out.println("Task Address:"+task.getAddressType());
			if(task.getDuration() <= availableTime) {
				if("Anywhere".equalsIgnoreCase(task.getAddressType())) {
						task.setTotalTaskTime(task.getDuration());
						resultList.add(task);
				}else {
					tasksForLocationQuery.add(task);
				}
			} // ignore tasks out of available time boundary
		}
		
		StringBuffer urlBuffer = new StringBuffer(BASE_URL);
		//"?origins=Vancouver%20BC%7CSeattle&destinations=San%20Francisco%7CVictoria%20BC&mode=car&language=fr-FR&sensor=false";
		urlBuffer.append("?origins=");
		urlBuffer.append(URLEncoder.encode(startLocation));
		urlBuffer.append("&destinations=");
		
		
		for(Task dest:tasksForLocationQuery) {
				System.out.println(dest.getAddress());
				String address = (dest.getAddress() != null &&  dest.getAddress().trim().length()>0)? dest.getAddress(): "."; // just for fun left the . check
				urlBuffer.append(URLEncoder.encode(address));
				urlBuffer.append("|");
		}
		urlBuffer.append("&mode=driving&sensor=false&units=imperial");
		System.out.println(urlBuffer.toString());
		String response = getResponse(urlBuffer.toString());
		
		//System.out.println(response);

		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); 
		DocumentBuilder builder = factory.newDocumentBuilder(); 
		InputSource is = new InputSource(new StringReader(response)); 
		 
		Document doc = builder.parse(is);
		
		NodeList nodes = doc.getElementsByTagName("element");
 
		for (int i = 0; i < nodes.getLength(); i++) {
			Node node = nodes.item(i);
			if (node.getNodeType() == Node.ELEMENT_NODE) {
				Element element = (Element) node;
				String status = getValue("status", element);
				
				Task task = tasks.get(i);
							
				if("OK".equals(status)) {
						String dist = getNodeValue("distance", element);
						String distText = getNodeText("distance", element);
						task.setDrivingDistanceText(distText);
						
				        DecimalFormat twoDForm = new DecimalFormat ("#.#");
				        double formattedValue = Double.valueOf(twoDForm.format(Integer.parseInt(dist)/1609.34)); // Converting to Miles from meters
						task.setDrivingDistance(formattedValue); 
						String dur = getNodeValue("duration", element);
						String durText = getNodeText("duration", element);
						task.setDrivingTimeText(durText);
						
						task.setDrivingTime(Math.round(Integer.parseInt(dur)/60)); // Convert from seconds from minutes
						task.setDrivingDistanceText(distText);
						task.setDrivingTimeText(durText);
						task.setTotalTaskTime(task.getDuration() + task.getDrivingTime());
						if(task.getTotalTaskTime()<=availableTime) {
							resultList.add(task);
						}
				} // ignore status other than OK

			}
		}
		
		    
		Collections.sort(tasks, new Comparator<Task>() {
		    public int compare(Task o1, Task o2) {
		    	long d1 = o1.getDuration() + o1.getDrivingTime();
		    	long d2 = o2.getDuration() + o2.getDrivingTime();
		        return (int)(d1 - d2);
		    }} );

		return resultList;
	}
	
	private String getResponse(String URL) throws Exception { 
        InputStream stream = new URL(URL).openStream(); 
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        StringBuilder sb = new StringBuilder();
        String line = null;
        try {
            while ((line = reader.readLine()) != null) {
                sb.append((line + "\n"));
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
            	stream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return sb.toString();
	}
	
	private String getNodeValue(String tag, Element element) {
		
		Element innerElement = (Element) element.getElementsByTagName(tag).item(0);
		NodeList nodes = innerElement.getElementsByTagName("value").item(0).getChildNodes();
		 
		Node node = (Node) nodes.item(0);
		 
		return node.getNodeValue();
		 
	}

	private String getNodeText(String tag, Element element) {
		
		Element innerElement = (Element) element.getElementsByTagName(tag).item(0);
		NodeList nodes = innerElement.getElementsByTagName("text").item(0).getChildNodes();
		 
		Node node = (Node) nodes.item(0);
		 
		return node.getNodeValue();
		 
	}

	private String getValue(String tag, Element element) {
		 
		NodeList nodes = element.getElementsByTagName(tag).item(0).getChildNodes();
		 
		Node node = (Node) nodes.item(0);
		 
		return node.getNodeValue();
		 
		}

	
}