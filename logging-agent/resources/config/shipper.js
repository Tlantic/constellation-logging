input {
	tcp {
		type => "log4j2"
		host => "localhost"
		mode => "server"
		port => "9500"
		codec => json {}
	}

	udp {
		type => "log4net"
		port => "9500"
		codec => plain {
			charset => "UTF-8"
		}
	}	
}


filter {
	
	if [type] == "log4net" {
			grok {
				match => ["message","%{LOGLEVEL:level} %{TIMESTAMP_ISO8601:sourceTimestamp} %{WORD:thread} %{WORD:widget} - %{GREEDYDATA:message}"]
				overwrite => ["message"]
			}
	}
}

output {
	stdout {
		codec => json {}
	} 
}