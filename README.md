## Definitions

| Term         | Example                      | Definition                                                         |
| ------------ | ---------------------------- | ------------------------------------------------------------------ |
| Method       | GET, POST, PATCH, DELETE     | HTTP action to be performed on a resource                          |
| Route        | /api/ShippingBay/:Id         | URL template with placeholders describing how to locate a resource |
| API Endpoint | [GET] /api/ShippingBay/:Id   | combination of method + route, describing an API operation         |
| Endpoint     | [GET] /api/ShippingBay/1     | specific callable path + method that performs an operation         |
| Path         | /api/ShippingBay/1           | literal that points to an actual resource                          |
| Resource     | /api/**ShippingBay**/15      | identifies the subject of a request                                |
| Action       | /api/ShippingBay/15/**ship** | a non-CRUD operation that invokes business logic in the backend    |
