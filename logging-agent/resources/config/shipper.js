input {
	tcp {
		host => "localhost"
		mode => "server"
		port => "9500"
	}
}
output {
	stdout {} 
}