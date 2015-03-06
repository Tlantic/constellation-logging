package com.tlantic.constellation.logging.commons.helper;
import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

import com.tlantic.constellation.logging.commons.helper.OperatingSystemHelper;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
public class OperatingSystemHelperTest extends OperatingSystemHelper{


	public boolean OperatingSystemHelper() {
		return true;  
	}

	@Test
	public void isWindows_test(){
		assertFalse( isWindows() == isUnix() && isWindows() == isMac() && isWindows() == isSolaris());
	}	


	@Test
	public void isUnix_Property_test(){
		System.setProperty("os.name", "Unix");
		assertTrue(isUnix());
	}


	@Test
	public void isWindows_Property_test(){
		System.setProperty("os.name", "Windows");
		assertTrue(isWindows());
	}

	@Test
	public void isMac_Property_test(){
		System.setProperty("os.name", "Mac");
		assertTrue(isMac());
	}


	@Test
	public void isSolaris_Property_test(){
		System.setProperty("os.name", "Solaris");
		assertTrue(isSolaris());
	}


}


