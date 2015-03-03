package com.tlantic.constellation.logging.commons;

import com.tlantic.constellation.logging.commons.commands.ServiceCommand;

public abstract class CommandExecutor {
	public int run (ServiceCommand command) {
		System.out.println("Do stuff!");
		return 0;
	}	
}