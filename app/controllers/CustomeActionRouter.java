/**
 * 
 */
package controllers;

import java.io.PrintWriter;
import java.io.StringWriter;

import play.Logger;
import play.libs.F.Promise;
import play.mvc.Action;
import play.mvc.Http.Context;
import play.mvc.Result;

/**
 * @author 212451659
 *
 */
public class CustomeActionRouter  extends Action.Simple {

	
	
	@Override
	public Promise<Result> call(Context arg0) throws Throwable {
		Logger.debug(" Before Interceptior  ");
		Promise<Result> result = null;
		try {
			result = delegate.call(arg0);
		} catch (Exception ex) {
			StringWriter errors = new StringWriter();
			ex.printStackTrace(new PrintWriter(errors));
			Logger.error("  Exception occurred" + errors.toString());
		}
		Logger.debug(" After Interceptior  ");
		
		return result;
	}
	
}


