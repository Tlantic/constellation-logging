input {
	# Log4j2 input format expected. JSON Layout is not being used because log4j2 message arrives "splitted".
	# TCP protocol is the default, but is not being used to avoid network dependency when logging (log4j does not handle reconnect well).
	# This channel is used by server => 5.x and other java solutions.
	# log4j input doesn't work for v2 logging lib.
	udp {
		type => "log4j2"
		port => "9500"
		codec => plain {
			charset => "UTF-8"
		}
	}

	# This channel is available for .Net applications configured to use log4net.
	# Log4net does not provide SocketAppender as log4j, making this solution incompatible with tcp channel.
	# To support 4.x servers, an udp port channel was created. 
	udp {
		type => "log4net"
		port => "9501"
		codec => plain {
			charset => "UTF-8"
		}
	}	
}

# add type to message to be forwarded
filter {
	mutate {
		update => ["message", "%{type} %{message}"]
	}
}


# send data to log service centralized (forwarder)
output {
	tcp {
		mode => "client"
		host => "localhost"
		port => "9600"
		reconnect_interval => "10"
		codec => plain {
			charset => "UTF-8"
		}
	}
}