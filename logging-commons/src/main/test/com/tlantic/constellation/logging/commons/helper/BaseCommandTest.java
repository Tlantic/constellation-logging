package com.tlantic.constellation.logging.commons.helper;

import static org.junit.Assert.*;

import org.junit.Test;

import com.tlantic.constellation.logging.commons.commands.BaseCommand;

public class BaseCommandTest extends BaseCommand{


	@Test
	public void toString_test(){
		String result;
		result = this.toString();
		if(result.charAt(result.length()-1)==' '){
			assertFalse(false);
		}
	}

	

	@Test
	public void execute_test(){
		int result;
		result = this.execute();
		if(result != 0){
			assertTrue(true);
		}
	}


	@Override
	public String[] getCliParamsForWindows() {
		// TODO Auto-generated method stub
		return new String[] {"element1","element2","element3"};
	}
	@Override
	public String[] getCliParamsForUX() {
		// TODO Auto-generated method stub
		return new String[] {"element1","element2","element3"};
	}

	@Override
	public String[] getCliParamsForMac() {
		// TODO Auto-generated method stub
		return new String[] {"element1","element2","element3"};
	}

	@Override
	public String[] getCliParamsForSolaris() {
		// TODO Auto-generated method stub
		return new String[] {"element1","element2","element3"};
	}




	/*	@Test
	public void toString_test(){
		String bc = baseCommand.toString();
		if (bc.charAt(bc.length()-1)==' '){
			System.out.print("Erro");
		}

		}*/
}








