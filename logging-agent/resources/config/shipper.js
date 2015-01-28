input {
	log4j {
		add_field => ["application_name", "mrs_server"],
	}
}
output {
	stdout { 
		debug => true
		workers => 1
	} 
}