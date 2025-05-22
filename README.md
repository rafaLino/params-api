
# Parameters API Documentation

This documentation provides a comprehensive guide to using the Parameters API.

## Overview

Welcome to the Custom Parameters API. This API is designed to manage custom parameters, each identified by an ID, name, type, and value. You can interact with this API via two main endpoints:

- `/parameters`: Manages individual parameters.
- `/version`: Handles versioning of the entire system.

### Parameter Structure
Each parameter consists of:
- **name**: The name of the parameter, must be provided by the client to retrieve or update the parameter value.
- **type**: Indicates the data type expected for the value (e.g., string, number, JSON).
- **value**: The stored value (as string) of the parameter.

### Versioning
The API provides version tracking through two methods:
1. GET /version: Returns the current version of the system as a string.
2. POST /version: Increments the version number.

### Returns
The API returns the followings structure: 

Return Type : `Array<Parameter>` | `Parameter` | `number` | `Array<string>` | `Error`
```typescript
 {
    data: `Array<Parameter>` | `Parameter` | `number` | `Array<string>` | `Error`
 }
```


## Authentication

Authentication is handled automatically using JWT tokens in two header fields:

- **x-api-key**: A JWT token provided by your client to authenticate requests.
- **x-proj-key**: The name of the project associated with this request.

Ensure that each request includes both headers for proper authorization and access control.


## API Reference

### **Endpoint:** `/parameters`

- **Method**: POST
- **body**:
  - `name`: String, required. The name of the parameter.
  - `type`: String, required. The type expected for the value (e.g., "string", "number").
  - `value`: String, required. The current value.

  ```json
    POST /parameters {
        name: "my_parameter",
        type: "string",
        value: "default_string"
    }
  ```

---

- **Method**: GET
- **Parameters**: 
    - `id_or_name`: String, optional. The name or id of the parameter.
- **Return**: 
    - The parameter list
    - The found item
   

    ```json
    //get list
    GET /parameters
    
    //get one 
    GET /parameters/my_parameter
    ```

---
- **Method**: PUT
- **Parameters**: 
    - `id`: Number, required. The id of the parameter.
    
  ```json
    PUT /parameters/1 {
        name: "my_parameter",
        type: "string",
        value: "another_string"
    }
  ```
---
- **Method**: DELETE
- **Parameters**: 
    - `id`: Number, required. The id of the parameter.
- **body**:
  - `name`: String, required. The name of the parameter.
  - `type`: String, required. The type expected for the value (e.g., "string", "number").
  - `value`: String, required. The current value.

  ```json
    DELETE /parameters/1
  ```

---
---
### **Endpoint:** `/version`
- **Methods**: GET, POST

### GET /version
Returns the current version of the system as a number. Example:
```bash
GET http://localhost:8000/version
```

### POST /version
Increments the new version number.
```bash
POST http://localhost:8000/version
```

---

By following this documentation, you can effectively integrate and use our Custom Parameters API within your applications.