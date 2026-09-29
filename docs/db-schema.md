## DATABASE DESIGN

* USER:
    - name [string, required]
    - email [string, required, unique, lowercase]
    - password [string, required]
    - phone [string, required]
    - age [number, required, 18 <= age <= 60]

* NOTES:
    - title [string, required]
    - content [string, required]
    - userId [ObjectId, ref to User, required]
    - createdAt [timestamp]
    - updatedAt [timestamp]
* OTP:
  - code [string, required , length 6 ]
  - email [string, required, lowercase]
  - expiresAt [date, required, after 5min]