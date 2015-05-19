input {
    rabbitmq {
        host => "localhost"
        queue => "mrs.logging.queue"
        durable => true
        key => "Mrs.InStore"
        exchange => "mrs.logging.excg"
        prefetch_count =>  50
        threads => 2
    }

    rabbitmq {
        host => "localhost"
        queue => "instore.analytics.queue"
        durable => true
        prefetch_count =>  50
        threads => 2
    }
}

output{
    stdout {
        codec => rubydebug
    }

    if([_internalId]){
        elasticsearch {
            # job config
            workers => 1    
            host => "10.58.1.17"
            cluster => "elasticsearch"
            protocol => "http"
            document_id => "%{_internalId}"
            # indexing destination
            index => "instore"
        }
    }
    else{
        elasticsearch {
            # job config
            workers => 1
            host => "10.58.1.17"
            cluster => "elasticsearch"
            protocol => "http"
            # indexing destination
            index => "instore"
        }
    }
    
}