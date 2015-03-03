package com.tlantic.constellation.logging.commons.commands;

import java.io.IOException;

import com.tlantic.constellation.logging.commons.executors.CommandExecutor;


public abstract class BaseCommand implements ServiceCommand {
	
	public abstract String[] getCliParams();
	
	
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
		int result = 0;
		
		try {
			result = CommandExecutor.run(this);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	
}