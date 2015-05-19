input{
	tcp {
		
			mode => "server"
			port => "9500"
			codec => plain {
				charset => "UTF-8"
			}
				
			type => "logging"
			tags => ["mrs","server","v4"]		
			
			add_field => ["application_version", "v4"]
			add_field => ["product", "InStore"]
		}

	tcp {
		
			mode => "server"
			port => "9600"
			codec => plain {
				charset => "UTF-8"
			}
				
			type => "analytics"
			tags => ["mrs","server","v4"]		
			
			add_field => ["application_version", "v4"]
			add_field => ["product", "InStore"]
		}

	file{

		path => ["/vagrant/analytics/*.log"]
		type => "analytics"
		
	}

	file{

		path => ["/vagrant/logging/*.log"]
		type => "logging"
		
	}

}

filter{
	if([type]=="logging"){
		grok {
			match => ["message","%{IPORHOST:agentHost} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:agentTimestamp} %{DATA:thread} %{DATA:logger} - %{GREEDYDATA:message}"]
			overwrite => ["message"]
			
		}
	}
	else if([type]=="analytics"){
		grok{
			match => ["message", "%{IPORHOST:agentHost} %{LOGLEVEL:level} %{TIMESTAMP_ISO8601:agentTimestamp} %{DATA:thread} %{DATA:metric} - %{GREEDYDATA:message}"]
			overwrite => ["message"]
		}
		if([metric]=="task"){
			grok {
				match => ["message", "%{DATA:companyId}\|%{DATA:companyName}\|%{DATA:chainId}\|%{DATA:chainName}\|%{DATA:retailGroupId}\|%{DATA:retailGroupName}\|%{DATA:retailStoreId}\|%{DATA:retailStoreName}\|%{NUMBER:actionId:int}\|%{DATA:actionText}\|%{DATA:taskId}\|%{DATA:description}\|%{DATA:status}\|%{DATA:statusDescriptionKey}\|%{NUMBER:numOfIncreases:int}\|%{NUMBER:numOfDecreases:int}\|%{DATA:isItemGroupOriented}\|%{NUMBER:alertId:int}\|%{NUMBER:cycleCount:int}\|%{DATA:countZoneDesc}\|%{DATA:countZone}\|%{DATA:cycleCountDesc}\|%{DATA:profileId}\|%{DATA:profileName}\|%{DATA:owner}\|%{DATA:ownerName}\|%{DATA:createUser}\|%{DATA:createDate}\|%{DATA:scheduledDate}\|%{DATA:expectedFinishDate}\|%{DATA:startDate}\|%{DATA:lastUpdateDate}\|%{DATA:finishDate}\|%{NUMBER:spentTime:int}\|%{NUMBER:taskItemsCount:int}\|"]
			}

			 mutate {
			    update => ["type","%{metric}"]
			    add_field => ["_internalId", "%{taskId}"]
			  }

		}else if([metric]=="taskitem"){
			grok {
				match => ["message", "%{DATA:companyId}\|%{DATA:companyName}\|%{DATA:chainId}\|%{DATA:chainName}\|%{DATA:retailGroupId}\|%{DATA:retailGroupName}\|%{DATA:retailStoreId}\|%{DATA:retailStoreName}\|%{NUMBER:actionId:int}\|%{DATA:actionText}\|%{NUMBER:taskId:int}\|%{DATA:taskName}\|%{DATA:taskStatus}\|%{DATA:taskStatusDescriptionKey}\|%{NUMBER:taskItemId:int}\|%{DATA:status}\|%{DATA:taskItemStatusKey}\|%{DATA:taskItemStatusDescriptionKey}\|%{DATA:itemId}\|%{DATA:itemName}\|%{NUMBER:oldERPPrice:float}\|%{NUMBER:eRPPrice:float}\|%{NUMBER:isIncrease:int}\|%{NUMBER:quantity:float}\|%{NUMBER:expectedQuantity:float}\|%{DATA:stockDescriptionKey}\|%{DATA:priceOwner}\|%{NUMBER:pOSPrice:float}\|%{NUMBER:labelPrice:float}\|%{DATA:isPriceDivergence}\|%{DATA:priceDivergenceDescriptionKey}\|%{DATA:isItemGroupOriented}\|%{DATA:hierarchicalId}\|%{DATA:hierarchicalName}\|%{DATA:hierarchicalDPTName}\|%{DATA:createDate}\|%{DATA:lastUpdateUser}\|%{DATA:lastUpdateUserName}\|%{DATA:lastUpdateDate}\|%{NUMBER:alertId:int}\|%{NUMBER:cycleCount:int}\|%{DATA:countZoneDesc}\|%{DATA:countZone}\|%{DATA:cycleCountDesc}\|"]
			}
			mutate {
				update => ["type","%{metric}"]
				add_field => ["_internalId", "%{taskItemId}"]
			}	
		}else{
			mutate {
				update => ["type","failures"]
			}	
		}

		
		
	}
	else {
		
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

output{

	if([type]=="logging"){
		rabbitmq {
	    exchange => "mrs.logging.excg"
	    host => "localhost"
	    exchange_type => "topic"
	    key => "Mrs.InStore"
	    durable => true 
	    persistent => false 
	  }
	}

	else{
		rabbitmq {
	    exchange => "mrs.analytics.excg"
	    host => "localhost"
	    exchange_type => "topic"
	    key => "Mrs.InStore"
	    durable => true 
	    persistent => false
	    workers => 1 
	  }
	}

	stdout {
    codec => rubydebug
  }
	

}
