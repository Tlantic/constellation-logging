input {
	redis {
		key => "mrslog"
		data_type => "list"
	}
}

output {
	stdout {}
}



# normalize JSON structure/format
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


filter {
	
	# handling mrs log messages
	if [type] == "mrs" {
			
			
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
				
			} else {
				
				# normalize json object
				mutate {
					remove_field => ["@version"]
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
		drop {}
	}
}
