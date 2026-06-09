const { app } = require('@azure/functions');

app.http('HttpTriggerStaticWebApp', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const body = await request.json();
        const variabletexto = body.elemento;

        return { status: 200, body: `Este es un texto que viene de tu Azure Function, en el body vino: ${variabletexto}` };
    }
});
