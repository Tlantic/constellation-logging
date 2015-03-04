package com.tlantic.constellation.logging.commons.commands;

public interface ServiceCommand {
	public abstract String[] getCliParams();
	public abstract String[] getCliParamsForWindows();
	public abstract String[] getCliParamsForUX();
	public abstract String[] getCliParamsForMac();
	public abstract String[] getCliParamsForSolaris();
	
	public String toString();
	public int execute();
}