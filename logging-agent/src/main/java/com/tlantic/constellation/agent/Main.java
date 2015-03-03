package com.tlantic.constellation.agent;

import com.tlantic.constellation.agent.commands.ShipperStartCommand;

public class Main {
	
	public static void main(String[] args) {
		ShipperStartCommand cmd = new ShipperStartCommand();
		cmd.execute();
	}
}
