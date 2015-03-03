package com.tlantic.constellation.logging.commons.executors;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.tlantic.constellation.logging.commons.commands.ServiceCommand;

public abstract class CommandExecutor {
	
	public static int run (ServiceCommand command) throws IOException, InterruptedException {
		Process proc = new ProcessBuilder(command.getCliParams()).start();
		
		InputStream is = proc.getInputStream();
		InputStreamReader isr = new InputStreamReader(is);
		BufferedReader br = new BufferedReader(isr);
		String line;

		while ((line = br.readLine()) != null) {
		  System.out.println(line);
		}		
		
		return proc.waitFor();
	}
	
}