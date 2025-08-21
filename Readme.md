do npm i swagger-jsdoc@latest --save
    npm i swagger-ui-express --save

import both above packages in index js

const options = {
    definition: {
        openapi: '3.0',
        info: {
            title: 'Node js api project',
            version: "1.2.0"

        },
        servers: [
            {
                'api': 'http://localhost:8080 '
            }
        ]
    },
    apis: ['./index.js']
}

const swaggerSpec = SwaggerDoc(options);
app.use('api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

run application


In controller file:
-------
/**
* @Swagger
* /:
*   get:
*       summary: summary of api
*       description: description of api
*       responses:
*               200:
*                   description: description of api
*/

-------