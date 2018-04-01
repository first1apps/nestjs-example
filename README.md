# NestJS Example Project

## TODO

```md

# Authentication
[ ] Signin Endpoint
[x] JWT Token generation and validation
[x] Session validation

# Database
[x] Code-First DB Sync 
[ ] Migrations
[ ] Transactions (using ZoneJS / RequestContext)
[ ] Record-level authorization
[ ] Created/Modified By/At audit columns
[ ] Use new Date objects that ignore timezone
[ ] Bugs to lookout for
    [ ] Tables with the same name but in different schemas may be a problem due to the tokens the @nestjs/typeorm uses

# Swagger
[x] UI
[x] Simple Spec
[ ] Data Models

# RequestContext
[x] Zones proof of concept
[ ] Store typeOrm transaction

# Authentication
[x] Proof of concept
[x] Works with Swagger UI
[x] Write to database
[x] Reads from database
[x] Is it's own module
[ ] Create new JWT token after every request to update expiresIn
[ ] Require password to start session

# Error logging
[ ] Filtering by module
[ ] Filtering by level
[ ] LogStash Friendly
[ ] Reporting o 

# Input Validation
[ ] ClassTransfomer
[ ] ClassValidator

```

## Swagger

You can access it here after starting:
http://localhost:3000/.swagger/ui
