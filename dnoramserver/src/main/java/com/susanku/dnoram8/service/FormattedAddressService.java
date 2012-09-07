package com.susanku.dnoram8.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;

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
public class FormattedAddressService {
	
	private static String BASE_URL = "http://maps.google.com/maps/api/geocode/xml?sensor=false";
	
	public String getFormattedAddress(String userEnteredString) throws Exception{
		
		StringBuffer urlBuffer = new StringBuffer(BASE_URL);
		urlBuffer.append("&address=");
		urlBuffer.append(URLEncoder.encode(userEnteredString));
		System.out.println("Getting formatted address using " + urlBuffer.toString());
		String response = getResponse(urlBuffer.toString());
		
		//System.out.println("Response returned : \n" + response);
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance(); 
		DocumentBuilder builder = factory.newDocumentBuilder(); 
		InputSource is = new InputSource(new StringReader(response)); 
		 
		Document doc = builder.parse(is);

		NodeList nodes = doc.getElementsByTagName("status");
		
		String status = nodes.item(0).getTextContent();
		System.out.println("status in formatted service :" + status);
		
		if("OK".equals(status)) {
			
			String formattedAddress = doc.getElementsByTagName("formatted_address").item(0).getTextContent();	
			System.out.println("formatted address in formatted service :" + formattedAddress);
			return formattedAddress;
		}
		
		return null;
		 

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


}
