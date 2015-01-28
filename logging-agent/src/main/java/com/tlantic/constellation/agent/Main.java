package com.tlantic.constellation.agent;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main {
	
	static Logger log = LogManager.getLogger( Main.class.getName() );
	
	public static void main(String[] args) {
		log.info("Testando 1... 2... 3...");
		log.debug("Debugging 1,2,3");
		log.warn("Warning 1,2,3");
		log.error("Ihhhhhhhh....");
		log.fatal("Fuuuuuu....");
		log.trace("Tracing 1,2,3");
		
		try {
			throw new Exception("blowing up!");
		} catch (Exception e) {
			log.catching(e);
		}
		
	}
}
