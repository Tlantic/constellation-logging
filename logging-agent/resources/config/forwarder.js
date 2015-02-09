input {
	# Input for all mrs applications
	tcp {
		type => "mrs-log"
		host => "localhost"
		mode => "server"
		port => "9600"
		codec => plain {
			charset => "UTF-8"
		}
	}
}

filter {
	
	# handling mrs log messages
	if ["type"] == "mrs-log" {
			
			
			# normalizing JSON object
			grok {
				match => ["message", "%{TIMESTAMP_ISO8601:agentTimestamp} %{IPORHOST:agentHost} %{WORD:origin} %{IPORHOST:eventHostname} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:eventTimestamp} %{DATA:thread} %{DATA:logger} - %{GREEDYDATA:message}"]
				overwrite => ["message"]				
			}
			
			
			# mark debug messages to be ignored
			if [level] == "DEBUG" {
				mutate {
					add_tag => ["TO_BE_IGNORED"]
				}					
			}
			
			
	} else {
		
		#  ignoring unknown messages
		mutate {
			add_tag => ["TO_BE_IGNORED"]
		}
		
	}
	
	
	
	# NO ONE CARES ABOUT IGNORED MESSAGES
	if "TO_BE_IGNORED" in [tags] {
		#drop {}
	}
}


output {
	stdout {
		codec => json {}
	}
}
