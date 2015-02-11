input {
	redis {
		key => "mrslog"
		data_type => "list"
		type => ["mrslog"]
	}
}

# normalize JSON structure/format
filter {
	
	# handling mrs logs
	if "mrs" in [tags] {
		
		
		# breaking message
		grok {
			match => ["message", "%{IPORHOST:hostname} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:eventTimestamp} %{DATA:thread} %{DATA:logger} - %{GREEDYDATA:message}"]
			overwrite => ["message"]
		}
		
		# no one cares about DEBUG messages
		if [level] == "DEBUG" {
				drop{}
		}
		
	} else {
		# WARNING: UNHANDLED MESSAGES ARE BEING DROPPED!
		drop {}
	}
}


# dispatch to elasticsearch
output {
	
	# dispatch to an embedded elasticsearch (logstash).
	# works for standalone messages only.
	# NEED to think about multi STORE/BRAND and so on...
	elasticsearch {
		host => ["localhost"]
		index => "standalone-%{+YYYY.MM.dd}"
	}
}