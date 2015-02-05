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
output {
	stdout {} 
}