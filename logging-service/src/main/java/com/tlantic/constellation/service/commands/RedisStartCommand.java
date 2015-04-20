package com.tlantic.constellation.service.commands;

import com.tlantic.constellation.logging.commons.commands.BaseCommand;

public class RedisStartCommand extends BaseCommand {
	
	@Override
	public String[] getCliParamsForWindows() {
		// initializing params
		String[] params = new String[1];
		
		// defining params
		params[0] = "queue\\win64\\redis-server.exe";
		
		// returning params
		return params;
	}

	@Override
	public String[] getCliParamsForUX() {
		// initializing params
		
		String[] params = new String[4];
		// returning params
		return params;
	}

	@Override
	public String[] getCliParamsForMac() {
		return this.getCliParamsForUX();
	}

	@Override
	public String[] getCliParamsForSolaris() {
		return this.getCliParamsForUX();
	}
}