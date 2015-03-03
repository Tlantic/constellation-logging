package com.tlantic.constellation.logging.commons.commands;

import com.tlantic.constellation.logging.commons.CommandExecutor;

public abstract class BaseCommand extends CommandExecutor implements
		ServiceCommand {
	
	public abstract String[] getCliParams();
	
	
	@Override
	public String toString() {
		String [] params  = getCliParams();
		StringBuilder converted = new StringBuilder();
		
		// building command line
		for (int i=0; i < params.length; i++) {
			
			// appending parameter
			converted.append(params[i]);
			
			// appending space
			if ( (i+1) < params.length ) {
				converted.append(" ");
			}
		}
		return converted.toString();
	}


	public int execute() {
		// TODO Need to get CLI params and pass to an executor.
		return 0;
	}
	
	
}
