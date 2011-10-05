# License                                
                                         
Copyright (c) 2011 Adcloud GmbH.         

# API Description for Adcloud GmbH
Version: 1.0

 * Host: api.adcloud.com (SSL only)
 * Format: JSON/REST  
 * Authentication: Oauth 2.0 (two-legged)

This describes the official Adcloud API. If you have any problems or requests please contact api@adcloud.com.

## How to authenticate your client

To use the API you need a client\_id and client\_secret provided by Adcloud. With this your client can generate an access token that is necessary for every request. At the moment access tokens do not expire. 

Send a POST request to the following url including your client\_id and client\_secret:  
[https://api.adcloud.com/v1/oauth/access\_token](https://api.adcloud.com/v1/oauth/access\_token)

    $> curl -X POST -d  "client_id=<CLIENT_ID>&client_secret=<CLIENT_SECRET>&grant_type=none"  "https://api.adcloud.com/v1/oauth/access_token"

The response will look like this:

    {"access_token":"<ACCESS_TOKEN>","scope":""}

## Fetch advertiser reports
Send a GET request to the following url, including your access\_token and a date filter:  
[https://api.adcloud.com/v1/reports/advertiser](https://api.adcloud.com/v1/reports/advertiser)

    $> curl "https://api.adcloud.com/v1/reports/advertiser?access_token=<ACCESS_TOKEN>&filter[date]=<FILTER_DATE>"

The response will look similar to this:

    {
        "collection" : {
            "first_url" : "https://api.adcloud.com/v1/reports/advertiser?access_token=<ACCESS_TOKEN>&filter%5Bdate%5D=<FILTER_DATE>&page=1",
                "last_url" : "https://api.adcloud.com/v1/reports/advertiser?access_token=<ACCESS_TOKEN>&filter%5Bdate%5D=<FILTER_DATE>&page=232",
                "next_url" : "https://api.adcloud.com/v1/reports/advertiser?access_token=<ACCESS_TOKEN>&filter%5Bdate%5D=<FILTER_DATE>&page=2",
                "prev_url" : null,
                "per_page" : 200,
                "size" : 11955
        },
            "result" : [ <report_data_item>, <report_data_item> ],
            "status" : 200
    }


The specification of the response format is published as a json-schema in our github repository:  
[https://github.com/adcloud/api-json-schema](https://github.com/adcloud/api-json-schema)

A report\_data\_item consists of the following attributes:

    date                                | date                 | Format "YYYY-MM-DD"
    website_id                          | int                  | Website identifier
    website                             | varchar(255)         | Website Name
    topic_id                            | int                  | Topic identifier
    topic                               | varchar(255)         | Topic Name (eg Politics, Finance, Gaming)
    ad_placement_id                     | int                  | Ad placement identifier
    position                            | varchar(255)         | Position within the website
    product_id                          | int                  | Product identifier
    product                             | varchar(255)         | Product Name
    ad_id                               | int                  | Ad identifier
    ad                                  | varchar(255)         | Ad Name
    booking_id                          | int                  | Booking identifier
    booking                             | varchar(255)         | Booking Name
    page_type                           | varchar(255)         | Page Type (eg. Editorial Content, Search Engine, etc)
    publisher                           | varchar(255)         | Name of the Publisher
    language                            | varchar(2)           | ISO 639-1
    country                             | varchar(2)           | ISO 3166-1 ALPHA-2
    currency                            | varchar(3)           | ISO 4217 ALPHA
    design_id                           | int                  | Design identifier
    design                              | varchar(255)         | Design Name (eg Medium Rectangle, Leaderboard)
    ad_position                         | int                  | Position within the ad (eg first, second ad)
    ad_count                            | int                  | Number of items within the ad
    ad_impressions                      | int                  | Summed up impressions
    ad_impressions_costs                | float                | Costs created by impressions
    clicks                              | int                  | Summed up clicks
    clicks_overdelivered                | int                  | Number of clicks that were overdelivered
    clicks_filtered                     | int                  | Number of clicks filterd (eg bot clicks)
    clicks_image                        | int                  | Number of clicks on images
    clicks_head                         | int                  | Number of clicks on headlines
    clicks_txt                          | int                  | Number of clicks on paragraphs
    clicks_link                         | int                  | Number of clicks on action links
    clicks_costs                        | float                | Costs created by clicks
    postclick_conversions               | int                  | Summed up post click conversions
    postclick_conversions_overdelivered | int                  | Number of overdelivered post click conversions
    postclick_conversions_filtered      | int                  | Number of filtered post click conversions (eg fraud)
    postclick_conversions_costs         | float                | Costs created by post clicks conversions
    postview_conversions                | int                  | Summed up post view conversions
    postview_conversions_overdelivered  | int                  | Number of overdelivered post view conversions
    postview_conversions_filtered       | int                  | Number of filtered post view conversions (eg fraud)
    postview_conversions_costs          | float                | Costs created by post view conversions
    cancellations                       | int                  | Cancelled post click conversions
    costs                               | float                | Overall Costs

Collections are always paginated. You can specify the amount of records in the collection with the per\_page parameter, for example "&per\_page=200". The default is 50 records and the the maximum is 200 records per page. Meta information about the collection is inside the collection attribute of the response. There are urls for navigation (first, last, next and previous pages) and the overall size of the collection.

The report data is grouped by the following tuple: 
 * ad\_placement\_id
 * topic\_id
 * booking\_id
 * ad\_id
 * ad\_count
 * ad\_position

## Status Codes

 * 200 OK
 * 400 Bad Request (Parameters missing or wrong)
 * 401 Unauthorized

