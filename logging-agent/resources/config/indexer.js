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