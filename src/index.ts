import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import multipart from '@fastify/multipart';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.register(multipart);

fastify.register(import('@fastify/static').then(module => module.default), {
  root: path.join(__dirname, '../uploads'),
  prefix: '/files/',
});

fastify.post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await request.file();
    
    if (!data) {
      return reply.status(400).send('No file uploaded');
    }
  
    const ext = path.extname(data.filename);
    const fileId = uuidv4();
    const filePath = path.join(__dirname, '../uploads', `${fileId}${ext}`);
  
    const clientIp = request.ip;
  
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      data.file.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  
    const fileRecord = await prisma.file.create({
      data: {
        filename: data.filename,
        mimetype: data.mimetype,
        size: data.file.bytesRead,
        url: `http://localhost:3000/files/${fileId}${ext}`,
        ip: clientIp,
        fileId: fileId,
      },
    });
  
    return fileRecord;
});

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.type('text/html').send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>File Upload API Documentation</title>
      </head>
      <body>
        <h1>File Upload API Documentation</h1>
        <p>Welcome to the File Upload API. Below you will find information on how to use the endpoints.</p>
        
        <h2>Upload a File</h2>
        <p>To upload a file, use the following endpoint:</p>
        <pre><code>POST /upload</code></pre>
        <p>Send a <code>multipart/form-data</code> request with the file included in the <code>file</code> field.</p>
        <p>Example using <code>curl</code>:</p>
        <pre><code>curl -F "file=@/path/to/your/file" https://files.andrepaiva.dev/upload</code></pre>
  
        <h2>List Files</h2>
        <p>To list all uploaded files, use the following endpoint:</p>
        <pre><code>GET /files</code></pre>
        
        <h2>File Access</h2>
        <p>Files can be accessed directly using the URL provided in the response of the upload endpoint.</p>
        <p>Example URL:</p>
        <pre><code>https://files.andrepaiva.dev/files/your-file-id.ext</code></pre>
      </body>
      </html>
    `);
});

fastify.listen({ port: 80, host: '0.0.0.0' }).then(() => {
    console.log('Server is running on http://localhost:80');
})
