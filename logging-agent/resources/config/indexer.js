input {
	
	# monitor mrs logs
	redis {
		key => "mrslog"
		data_type => ["list"]
	}
}

# normalize JSON structure/format
filter {
	
	# handling mrs logs
	if "mrs" in [tags] {
		
		# parsing info
		grok {
			match => ["message","%{IPORHOST:agentHost} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:agentTimestamp} %{DATA:thread} %{DATA:logger} - %{GREEDYDATA:message}"]
			overwrite => ["message"]
		}
		
		# IMPORTANT: MRS does not care about debug messages!!
		if [level] == "DEBUG" {
				drop {}
		}
			
	} else {
		
		# setting as unknown message
		mutate {
			add_tag => ["unknown"]
		}
	}
	
	
	# HANDLING EXCEPTIONS
	if "unknown" in [tags] {
		
		# handling unknown messages
		mutate {
			add_tag => ["%{type}"]
			update => ["type","unknown"]
		}
		
	} else if "_grokparsefailure" in [tags] {
		
		# handling parse failures
		mutate {
			add_tag => ["%{type}"]
			update => ["type","failures"]
		}		
	} 
}


# dispatch to elasticsearch
output {		
	# dispatch to an embedded elasticsearch (logstash).
	# works for standalone messages only.
	# NEED to think about multi STORE/BRAND and so on...
	elasticsearch {
		
		# job config
		workers => 1
		host => ["10.58.1.86"]
		cluster => "elasticsearchTlt"
		
		# indexing destination
		index => "standalone-%{type}"
	}
}