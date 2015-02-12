input {
	
	# This channel is available for .Net applications configured to use log4net.
	# Log4net does not provide SocketAppender as log4j, making this solution incompatible with tcp channel.
	# To support 4.x servers, an udp port channel was created. 
	udp {
		# protocol config
		workers => 10
		port => "9500"
		codec => plain {
			charset => "UTF-8"
		}
		
		# classifying message
		type => "mrslog"
		tags => ["mrs","server","v4","mrs-server-v4"]		
		
		# completing message information based on channel convention
		add_field => ["application_name", "mrs-server"]
		add_field => ["application_version", "v4"]
		add_field => ["widget", "monolithic"]	
	}	
}


# send data to log service centralized (queue)
output {
	
	# handling messages per type
	redis {
		workers => 10
		key => "%{type}"
		data_type => ["list"]
	}
}