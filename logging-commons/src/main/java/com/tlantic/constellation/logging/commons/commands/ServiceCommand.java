package com.tlantic.constellation.logging.commons.commands;

public interface ServiceCommand {
	public abstract String[] getCliParams();
	public String toString();
	public int execute();
}