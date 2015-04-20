package com.tlantic.constellation.service;

import com.tlantic.constellation.service.commands.RedisStartCommand;

public class Main {

	public static void main(String[] args) {
		RedisStartCommand cmd = new RedisStartCommand();
		cmd.execute();

	}

}
