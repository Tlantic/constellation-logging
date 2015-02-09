input {
	
	# Log4j2 input format expected. JSON Layout is not being used because log4j2 message arrives "splitted".
	# TCP protocol is the default, but is not being used to avoid network dependency when logging.
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


filter {
	
	if [type] == "log4j2" {
			
			# Log4j2  handles thread and widget differently;
			grok {
				match => ["message","%{IPORHOST:hostname} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:sourceTimestamp} %{DATA:thread} %{DATA:widget} - %{GREEDYDATA:message}"]
				overwrite => ["message"]
			}

			
	} else if [type] == "log4net" {
			
			# Log4net message "normalization": receives a text message and performs a "sushi" to build a json message		
			grok {
				match => ["message","%{IPORHOST:hostname} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:sourceTimestamp} %{WORD:thread} %{WORD:widget} - %{GREEDYDATA:message}"]
				overwrite => ["message"]
			}
	}
	
	
	# NO ONE CARES ABOUT DEBUG MESSAGES
	if [level] == "DEBUG" {
			drop {}
	}
}

output {
	stdout {
		codec => json{}
	} 
}