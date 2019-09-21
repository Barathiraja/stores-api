export const storequeries = {

    customercount: [
        {
            "$lookup": {
                "from": "customers",
                "localField": "Id",
                "foreignField": "StoreId",
                "as": "customers"
            }
        },
        {
            "$project": {
                "Name": 1,
                "Id": 1,
                "customerCount": { "$size": "$customers" }
            }
        }
    ]

}



