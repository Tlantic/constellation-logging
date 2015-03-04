package com.tlantic.constellation.agent.commands;

import com.tlantic.constellation.logging.commons.commands.BaseCommand;

public class ShipperStartCommand extends BaseCommand {
	
	@Override
	public String[] getCliParamsForWindows() {
		// initializing params
		String[] params = new String[4];
		
		// defining params
		params[0] = "\\core\\bin\\logstash";
		params[1] = "agent";
		params[2] = "-f";
		params[3] = "\\core\\shipper.js";
		
		// returning params
		return params;
	}

	@Override
	public String[] getCliParamsForUX() {
		// initializing params
		String[] params = new String[4];
		
		// defining params
		params[0] = "./core/bin/logstash";
		params[1] = "agent";
		params[2] = "-f";
		params[3] = "./core/shipper.js";
		
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