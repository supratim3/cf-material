/*******************************************************************************
 *
 * C O P Y R I G H T    N O T I C E
 *    (c) 2013 General Electric Company  All Rights Reserved.
 *
 *  All Rights Reserved. No portions of this source code or the resulting compiled
 *  program may be used without express written consent and licensing by GE Global Research.
 *     
 ********************************************************************************/

package utils;

import java.util.Collections;
import java.util.Map;


/**
 * @author 212462885
 *
 */
public final class Constants {

	// Request Contents
		public static final String REQUEST_HEADER_SSO 			= "SM_SSOID";
		public static final String REQUEST_QUERY_WORKORDERID 	= "workorderid";
		public static final String REQUEST_QUERY_WORKORDERNUMBER= "woid";
		public static final String REQUEST_QUERY_SESSIONID 		= "sesid";
		public static final String REQUEST_TRANS_NAME  		    = "transName";
		public static final String REQUEST_TRANS_NAME_VALUE     = "Fleet View";
		public static final String REQUEST_QUERY_ROADNUMBER		= "roadnoindex";
		public static final String REQUEST_QUERY_MENUID		 	= "menuid";
		public static final String REQUEST_QUERY_DEFECT_MENUID	= "defectmenuid";
		public static final String REQUEST_QUERY_CLIENTURL	 	= "ClientURL";
		public static final String REQUEST_QUERY_FLAG		 	= "flag";
		public static final String REQUEST_QUERY_INFLAG	 		= "inflag";

		// Session Contents
		public static final String SESSION_SSO 					= "User-SSO";
		public static final String SESSION_USERID 				= "User-Id";
		public static final String SESSION_LOGINID 				= "User-LoginId";
		public static final String SESSION_LANGID				= "User-LangId";
		public static final String SESSION_USERPROFILE 			= "User-Profile";
		
		public static final String SESSION_ROADNUMBER			= "roadnumber";			//ESV_COEXIST.ESV_WORKORDER_V.ROAD_NUMBER
		public static final String SESSION_LOCOMOTIVEID			= "locomotiveid";		//ESV_COEXIST.ESV_ASSET_V.ASSET_ID
		public static final String SESSION_WORKORDERNUMBER		= "workordernumber";	//ESV_COEXIST.ESV_WORKORDER_V.WORKORDER_NUMBER
//		public static final String SESSION_SERVICEORGID			= "serviceorgid";		//ESV_COEXIST.ESV_WORKORDER_V.SERVICE_ORG_ID
		public static final String SESSION_ORGID				= "orgid";				//ESV_COEXIST.ESV_ASSET_V.ORG_ID
//		public static final String SESSION_CUSTOMERID			= "customerid";			//ESV_COEXIST.ESV_WORKORDER_V.CUSTOMER_ID
		public static final String SESSION_CUSTOMERPHONETIC		= "customerphonetic";	//ESV_COEXIST.ESV_WORKORDER_V.CUSTOMER_PHONETIC
		public static final String SESSION_POSITION				= "position";
		
		public static final String SESSION_SERVICEEMPLOYEEID	= "serviceemployeeid";
		public static final String SESSION_LANGCODE				= "User-LangCode";
		public static final String SESSION_RESPONSIBILITYID		= "responsibilityid";
		public static final String SESSION_USERROLE				= "userrole";
		public static final String SESSION_SERVICEORGID			= "serviceorgid";
		public static final String SESSION_CUSTOMERID			= "customerid";
		public static final String SESSION_TIMEZONE				= "User-TimeZone";
		public static final String SESSION_TIMECARDRIBBON		= "timecardribbon";
		public static final String SESSION_WORKSHIFT			= "workshift";
		public static final String SESSION_TOOLBOXLEVEL			= "toolboxlevel";
		
		public static final String SESSION_MENUID				= "menuid";
		
		public static final String SESSION_USERFIRSTNAME 		= "User-FirstName";
		public static final String SESSION_USERLASTNAME 		= "User-LastName";
		public static final String SESSION_USEREMAIL 			= "User-Email";
		
		// 1.0 Mandatory Request Contents
		public static final String[] REQUIRED_1_0_PARAMS = { 
				REQUEST_HEADER_SSO,
				REQUEST_QUERY_WORKORDERID, 
				REQUEST_QUERY_SESSIONID,
				REQUEST_QUERY_ROADNUMBER, 
				REQUEST_QUERY_CLIENTURL,
				REQUEST_QUERY_WORKORDERNUMBER,
				REQUEST_QUERY_FLAG,
				REQUEST_QUERY_INFLAG};
		
		public static final Map<String, String> NO_EXTRA_HEADERS = Collections.<String,String>emptyMap(); 
		public static final Map<String, String> NO_QUERY_PARAMS = NO_EXTRA_HEADERS;
		
		// Conf Keys
		public static final String CONF_ESERVICES_1_0_URL = "eservices.url";
		public static final String CONF_RESTSERVICE_BASEURI = "service.baseuri";
		public static final String CONF_HTTP_TIMEOUT_MSEC = "http.timeout.msec";	
}
