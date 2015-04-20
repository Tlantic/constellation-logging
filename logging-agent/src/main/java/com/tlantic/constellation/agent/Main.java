package com.tlantic.constellation.agent;

import com.tlantic.constellation.agent.commands.IndexerStartCommand;
import com.tlantic.constellation.agent.commands.ShipperStartCommand;

public class Main {
	
	public static void main(String[] args) {
		
		if(args.length>0){
			
			if(args[0].equals("0")){
				ShipperStartCommand cmd = new ShipperStartCommand();
				cmd.execute();
			}
			if(args[0].equals("1")){
				IndexerStartCommand cmd = new IndexerStartCommand();
				cmd.execute();
			}
			
		}else{
			System.out.println("No args");
		}
		
		
		
	}
}
