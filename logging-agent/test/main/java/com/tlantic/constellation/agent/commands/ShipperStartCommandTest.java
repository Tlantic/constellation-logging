package com.tlantic.constellation.agent.commands;
import static org.junit.Assert.*;

import java.util.Arrays;

import com.tlantic.constellation.agent.commands.ShipperStartCommand;

import org.junit.Assert;
import org.junit.Test;



public class ShipperStartCommandTest {
	
	@Test
	public void barra() {
		ShipperStartCommand parm = new ShipperStartCommand(); 
		String[] p = parm.getCliParamsForWindows();
		String[] params = new String[4];
		params[0] = "\\core\\bin\\logstash";
		params[1] = "agent";
		params[2] = "-f";
		params[3] = "\\core\\shipper.js";

		boolean error = false;

		for(String result: params) {
			for(char output: result.toCharArray()) {
				if (output == '/') {
					error = true; 
				}
			}
		}

		assertEquals(false, error);
	}







}


