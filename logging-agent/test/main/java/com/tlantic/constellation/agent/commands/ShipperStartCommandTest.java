package com.tlantic.constellation.agent.commands;
import static org.junit.Assert.*;
import com.tlantic.constellation.agent.commands.ShipperStartCommand;
import org.junit.Test;



public class ShipperStartCommandTest {

	@Test
	public void getCliParamsForWindows_Test() {
		ShipperStartCommand parm = new ShipperStartCommand(); 
		String[] p = parm.getCliParamsForWindows();

		boolean error = false;

		for(String result: p) {
			for(char output: result.toCharArray()) {
				if (output == '/') {
					error = true; 
				}
			}
		}

		assertEquals(false, error);
	}







}


