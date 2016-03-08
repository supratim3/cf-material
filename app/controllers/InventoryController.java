package controllers;

import static utils.Constants.CONF_RESTSERVICE_BASEURI;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CloudSolrClient;
import org.apache.solr.client.solrj.impl.HttpSolrClient.RemoteSolrException;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import play.Logger;
import play.Play;
import play.i18n.Lang;
import play.i18n.Messages;
import play.mvc.Controller;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.With;

@With(CustomeActionRouter.class)
public class InventoryController extends Controller {

	public  Result getMaterialsDtlsBySearchString(String itemNumber){

		Logger.debug("Inside InventoryController");

		//String itemNumber = form().bindFromRequest().get("itemNumber_t"); //requestData.get("searchString");

		String organizationId = request().getHeader("organization_id");
		String locale = request().getHeader("locale");

		Logger.debug("searchString " + itemNumber + " organization_id "
				+ organizationId + " locale " + locale);



		/*Logger.debug("cookie :"+request().cookie("PLAY_LANG"));
		Logger.debug("Header Language :"+request().getHeader(ACCEPT_LANGUAGE));
		Context ctx = new Context(request());
		Logger.debug(" Current Lang "+ ctx.lang());
		String title = Messages.get("home.title");
		Logger.debug(" Title "+title);
		ctx.setTransientLang(locale);
		ctx.changeLang(locale);
		Logger.debug(" Title "+title);
		title = Messages.get(new Lang(Lang.forCode("fre")), "home.title");
		Logger.debug(" Updated Lang "+ ctx.lang());
		title = Messages.get("home.title");

		Logger.debug(" Title "+title);*/

		String jsonDocuments = null;
		try {
			jsonDocuments = this.getInventoryDtls(itemNumber, new Long(
					organizationId));
			return ok(jsonDocuments);

		}catch (SolrServerException ex) {
			StringWriter errors = new StringWriter();
			ex.printStackTrace(new PrintWriter(errors));
			Logger.error("  SolrServerException occurred: Solr Server is not responding " + errors.toString());
		}
		catch (NumberFormatException ex) {
			StringWriter errors = new StringWriter();
			ex.printStackTrace(new PrintWriter(errors));
			Logger.error("  NumberFormatException occurred" + errors.toString());
		} catch (IOException ex) {
			StringWriter errors = new StringWriter();
			ex.printStackTrace(new PrintWriter(errors));
			Logger.error("  IOException occurred" + errors.toString());
		}catch(RemoteSolrException ex){
			StringWriter errors = new StringWriter();
			ex.printStackTrace(new PrintWriter(errors));
			Logger.error("  Exception occurred" + errors.toString());
		}
		catch(Exception ex) {
			StringWriter errors = new StringWriter();
			ex.printStackTrace(new PrintWriter(errors));
			Logger.error("  Exception occurred" + errors.toString());
		}

		Logger.debug("Exiting InventoryController ");

		return badRequest();

	}


	public String getInventoryDtls(String itemNumber, long organizationId)
			throws SolrServerException, IOException {

		StringBuilder url = new StringBuilder(getBaseUri());
		CloudSolrClient solrClient = new CloudSolrClient(url.toString());
		solrClient.setDefaultCollection(getMaterialsSearchUri());
		SolrQuery solrQuery = new SolrQuery();
		solrQuery.setQuery(url.toString());
		solrQuery.set("q", "organizationId:" + organizationId);
	//	solrQuery.setFilterQueries("itemNumber_t:*" + itemNumber
	//			+ "* OR spdescription_txt:*" + itemNumber + "*");
		itemNumber = itemNumber.replaceAll("(?=[]\\[+&|!(){}^\"~?:\\\\-])", "\\\\");
		Logger.debug("Item Number to search"+itemNumber);
		solrQuery = prepareSolrQuery("Eng", solrQuery, itemNumber);
		Logger.debug("solrQuery"+solrQuery.toQueryString());
		solrQuery.set("wt", "json");
		solrQuery.set("indent", "true");

		QueryResponse response = solrClient.query(solrQuery);
		SolrDocumentList documentList = response.getResults();

		// String jsonDocuments = JSONArray.toJSONString(documentList);

		JSONArray docsArray = new JSONArray();

		for (SolrDocument solrDoc : documentList) {
			JSONObject jsonObject = new JSONObject();
			for (Iterator<Map.Entry<String, Object>> docIterator = solrDoc
					.iterator(); docIterator.hasNext();) {
				Map.Entry<String, Object> eachDoc = docIterator.next();
				if (eachDoc.getKey().equals("last_Updated_Date_dt")) {
					jsonObject.put(eachDoc.getKey(),
							transformDate((Date) eachDoc.getValue()));
				} else {
					jsonObject.put(eachDoc.getKey(), eachDoc.getValue());
				}
			}
			docsArray.add(jsonObject);
		}
		String jsonDocuments = docsArray.toJSONString();
		documentList.clear();
		long numFound = response.getResults().getNumFound();
		int qTime = response.getQTime();
		Logger.debug("Query " + solrQuery.toQueryString() + " Found "
				+ numFound + " in " + qTime + "ms.");
		solrClient.close();

		return jsonDocuments;

	}

	public String transformDate(Date solrDate) {
		SimpleDateFormat shortDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String transformedDate = null;
		transformedDate = shortDateFormat.format(solrDate).toString();

		return transformedDate;
	}



	private  String getBaseUri() {
		String uri = Play.application().configuration()
				.getString(Play.application().configuration().getString(CONF_RESTSERVICE_BASEURI));
        Logger.debug("Using Base URI: " + uri);
        return uri;
	}

	private  String getMaterialsSearchUri() {
		String uri = Play.application().configuration().getString("solrCollection");
		Logger.debug("Using MaterialsSearch URI: " + uri);
		return uri;
	}


/*	private  void setHeaders(WSRequestHolder request, Map<String,String> headers) {
		request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
		request.setHeader(HttpHeaders.ACCEPT, "application/json");
		request.setHeader(HttpHeaders.CONTENT_LANGUAGE, "en-US");
		request.setHeader(HttpHeaders.ACCEPT_LANGUAGE, "en-US");
		setSessionKeyToHeader(request, headers);
	}

	private  void setSessionKeyToHeader(WSRequestHolder request,
			Map<String,String> headers){
		// repopulate everything from session to request
		Set<String> reqHeaders = Http.Context.current().session().keySet();
		for (String headerKey : reqHeaders) {
			request.setHeader(headerKey, Http.Context.current().session().get(headerKey));
		}

		for (Map.Entry<String,String> e: headers.entrySet()) {
			if (e.getKey() != null && e.getValue() != null) {
				request.setHeader(e.getKey(), e.getValue());
			}
		}
	}


	private  void setQueryParams(WSRequestHolder request, Map<String,String[]> params) {
		for (Map.Entry<String,String[]> e: params.entrySet()) {
			if (e.getKey() != null && e.getValue() != null) {
				request.setQueryParameter(e.getKey(), e.getValue()[0]);
			}
		}
	}

	private  long getHttpTimeout() {
		return Play.application().configuration().getLong(CONF_HTTP_TIMEOUT_MSEC);
	}

	private  boolean isOK(int status) {
		return status >= HttpStatus.SC_OK && status < HttpStatus.SC_MULTIPLE_CHOICES;
	}
*/
	  public  String unicodeEscaped(char ch) {
	      if (ch < 0x10) {
	          return "\\u000" + Integer.toHexString(ch);
	      } else if (ch < 0x100) {
	          return "\\u00" + Integer.toHexString(ch);
	      } else if (ch < 0x1000) {
	          return "\\u0" + Integer.toHexString(ch);
	      }
	      return "\\u" + Integer.toHexString(ch);
	  }
	  private static SolrQuery prepareSolrQuery(String language, SolrQuery query,
	  			String data) {

	  		if (language.equalsIgnoreCase("Spa")) {
	  			return query.setFilterQueries("itemNumber:*"
	  					+ data.replaceAll("\\s+", "") + "* OR itemSpaDescription:*"
	  					+ data.replaceAll("\\s+", "") + "*");
	  		} else if (language.equalsIgnoreCase("Chn")) {
	  			return query.setFilterQueries("itemNumber:*"
	  					+ data.replaceAll("\\s+", "") + "* OR itemChnDescription:*"
	  					+ data.replaceAll("\\s+", "") + "*");
	  		} else if (language.equalsIgnoreCase("Por")) {
	  			return query.setFilterQueries("itemNumber:*"
	  					+ data.replaceAll("\\s+", "") + "* OR itemPorDescription:*"
	  					+ data.replaceAll("\\s+", "") + "*");
	  		} else if (language.equalsIgnoreCase("Rus")) {
	  			return query.setFilterQueries("itemNumber:*"
	  					+ data.replaceAll("\\s+", "") + "* OR itemRusDescription:*"
	  					+ data.replaceAll("\\s+", "") + "*");
	  		} else if (language.equalsIgnoreCase("Eng")) {
	  			return query.setFilterQueries("itemNumber:*"
	  					+ data.replaceAll("\\s+", "") + "* OR description:*"
	  					+ data.replaceAll("\\s+", "") + "*");
	  		} else {
	  			return query.setFilterQueries("itemNumber:*"
	  					+ data.replaceAll("\\s+", "") + "* OR description:*"
	  					+ data.replaceAll("\\s+", "") + "*");
	  		}

	  	}

}
