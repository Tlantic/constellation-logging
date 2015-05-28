POST /instore/_mapping/task/
{
 "task":{
             "properties":{
               "@timestamp":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "@version":{
                  "type":"string"
               },
               "_internalId":{
                  "type":"string"
               },
               "actionId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "actionText":{
                  "type":"string"
               },
               "agentHost":{
                  "type":"string"
               },
               "agentTimestamp":{
                  "type":"string"
               },
               "application_version":{
                  "type":"string"
               },
               "chainId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "chainName":{
                  "type":"string"
               },
               "companyId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "companyName":{
                  "type":"string"
               },
               "createDate":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "createUser":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "description":{
                  "type":"string"
               },
               "expectedFinishDate":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "finishDate":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "host":{
                  "type":"string"
               },
               "isItemGroupOriented":{
                  "type":"boolean"
               },
               "lastUpdateDate":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "level":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "message":{
                  "type":"string"
               },
               "metric":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "numOfDecreases":{
                  "type":"long"
               },
               "numOfIncreases":{
                  "type":"long"
               },
               "owner":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "ownerName":{
                  "type":"string"
               },
               "product":{
                  "type":"string"
               },
               "profileId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "profileName":{
                  "type":"string"
               },
               "retailGroupId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "retailGroupName":{
                  "type":"string"
               },
               "retailStoreId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "retailStoreName":{
                  "type":"string"
               },
               "scheduledDate":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "startDate":{
                  "type":"date",
                  "format":"dateOptionalTime"
               },
               "status":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "statusDescriptionKey":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "tags":{
                  "type":"string"
               },
               "taskId":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "thread":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "type":{
                  "type":"string",
                  "index":"not_analyzed"
               },
                "cycleCountDesc":{
                  "type":"string"
               },
                "countZone":{
                  "type":"string",
                  "index":"not_analyzed"
               },
               "countZoneDesc":{
                  "type":"string"
               },
                "alertId":{
                  "type":"long"
               },
                "cycleCount":{
                  "type":"long"
               },
                "spentTime":{
                  "type":"long"
               },
                "taskItemsCount":{
                  "type":"long"
               }
            }
         }
}